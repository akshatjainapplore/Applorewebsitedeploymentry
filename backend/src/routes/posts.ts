import { FastifyInstance } from 'fastify';
import { prisma } from '@applore/db';
import { authenticate } from '../middleware/auth';

export default async function postsRoutes(app: FastifyInstance) {
  // Get all posts (public)
  app.get('/', async (request, reply) => {
    const { status, search, categoryId, tagId, page = '1', limit = '10' } = request.query as {
      status?: string;
      search?: string;
      categoryId?: string;
      tagId?: string;
      page?: string;
      limit?: string;
    };

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (categoryId) {
      where.categories = { some: { categoryId } };
    }
    if (tagId) {
      where.tags = { some: { tagId } };
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { publishedAt: 'desc' },
        include: {
          author: { select: { id: true, name: true, email: true, avatar: true, bio: true } },
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
          seo: true,
        },
      }),
      prisma.post.count({ where }),
    ]);

    return reply.send({
      success: true,
      data: posts,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  });

  // Get post by slug (public)
  app.get('/slug/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, name: true, email: true, avatar: true, bio: true } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        seo: true,
      },
    });

    if (!post) {
      return reply.status(404).send({ success: false, message: 'Post not found' });
    }

    return reply.send({ success: true, data: post });
  });

  // Get post by ID
  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true, email: true, avatar: true, bio: true } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        seo: true,
      },
    });

    if (!post) {
      return reply.status(404).send({ success: false, message: 'Post not found' });
    }

    return reply.send({ success: true, data: post });
  });

  // Create post (admin)
  app.post('/', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const payload = request.user as { id: string };
    const { title, slug, excerpt, content, featuredImage, status, categoryIds, tagIds, seo, scheduledAt } =
      request.body as {
        title: string;
        slug: string;
        excerpt?: string;
        content: string;
        featuredImage?: string;
        status?: string;
        categoryIds?: string[];
        tagIds?: string[];
        seo?: Record<string, string>;
        scheduledAt?: string;
      };

    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      return reply.status(400).send({ success: false, message: 'Slug already exists' });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        status: (status as 'DRAFT' | 'PUBLISHED' | 'SCHEDULED') || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        authorId: payload.id,
        categories: categoryIds
          ? { create: categoryIds.map((categoryId) => ({ categoryId })) }
          : undefined,
        tags: tagIds ? { create: tagIds.map((tagId) => ({ tagId })) } : undefined,
        seo: seo ? { create: seo } : undefined,
      },
      include: {
        author: { select: { id: true, name: true, email: true, avatar: true } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        seo: true,
      },
    });

    return reply.status(201).send({ success: true, data: post });
  });

  // Update post (admin)
  app.put('/:id', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { title, slug, excerpt, content, featuredImage, status, categoryIds, tagIds, seo, scheduledAt } =
      request.body as {
        title?: string;
        slug?: string;
        excerpt?: string;
        content?: string;
        featuredImage?: string;
        status?: string;
        categoryIds?: string[];
        tagIds?: string[];
        seo?: Record<string, string>;
        scheduledAt?: string;
      };

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return reply.status(404).send({ success: false, message: 'Post not found' });
    }

    if (slug && slug !== existing.slug) {
      const slugConflict = await prisma.post.findUnique({ where: { slug } });
      if (slugConflict) {
        return reply.status(400).send({ success: false, message: 'Slug already exists' });
      }
    }

    // Delete existing relations if updating
    if (categoryIds !== undefined) {
      await prisma.postCategory.deleteMany({ where: { postId: id } });
    }
    if (tagIds !== undefined) {
      await prisma.postTag.deleteMany({ where: { postId: id } });
    }

    const wasPublished = existing.status === 'PUBLISHED';
    const nowPublished = status === 'PUBLISHED';

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        status: status as 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | undefined,
        publishedAt: !wasPublished && nowPublished ? new Date() : undefined,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
        categories: categoryIds
          ? { create: categoryIds.map((categoryId) => ({ categoryId })) }
          : undefined,
        tags: tagIds ? { create: tagIds.map((tagId) => ({ tagId })) } : undefined,
        seo: seo
          ? {
              upsert: {
                create: seo,
                update: seo,
              },
            }
          : undefined,
      },
      include: {
        author: { select: { id: true, name: true, email: true, avatar: true } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        seo: true,
      },
    });

    return reply.send({ success: true, data: post });
  });

  // Delete post (admin)
  app.delete('/:id', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return reply.status(404).send({ success: false, message: 'Post not found' });
    }

    await prisma.post.delete({ where: { id } });

    return reply.send({ success: true, message: 'Post deleted successfully' });
  });
}
