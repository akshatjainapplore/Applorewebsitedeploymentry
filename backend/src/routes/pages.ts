import { FastifyInstance } from 'fastify';
import { prisma } from '@applore/db';
import { authenticate } from '../middleware/auth';

export default async function pagesRoutes(app: FastifyInstance) {
  // Get all pages (public)
  app.get('/', async (request, reply) => {
    const { status, search } = request.query as { status?: string; search?: string };

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }

    const pages = await prisma.page.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: { seo: true },
    });

    return reply.send({ success: true, data: pages });
  });

  // Get page by slug (public)
  app.get('/slug/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };

    const page = await prisma.page.findUnique({
      where: { slug },
      include: { seo: true },
    });

    if (!page) {
      return reply.status(404).send({ success: false, message: 'Page not found' });
    }

    return reply.send({ success: true, data: page });
  });

  // Get page by ID
  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const page = await prisma.page.findUnique({
      where: { id },
      include: { seo: true },
    });

    if (!page) {
      return reply.status(404).send({ success: false, message: 'Page not found' });
    }

    return reply.send({ success: true, data: page });
  });

  // Create page (admin)
  app.post('/', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { title, slug, content, status, seo } = request.body as {
      title: string;
      slug: string;
      content: unknown[];
      status?: string;
      seo?: Record<string, string>;
    };

    // Check slug uniqueness
    const existing = await prisma.page.findUnique({ where: { slug } });
    if (existing) {
      return reply.status(400).send({ success: false, message: 'Slug already exists' });
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content: content || [],
        status: (status as 'DRAFT' | 'PUBLISHED') || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        seo: seo ? { create: seo } : undefined,
      },
      include: { seo: true },
    });

    return reply.status(201).send({ success: true, data: page });
  });

  // Update page (admin)
  app.put('/:id', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { title, slug, content, status, seo } = request.body as {
      title?: string;
      slug?: string;
      content?: unknown[];
      status?: string;
      seo?: Record<string, string>;
    };

    const existing = await prisma.page.findUnique({ where: { id } });
    if (!existing) {
      return reply.status(404).send({ success: false, message: 'Page not found' });
    }

    // Check slug uniqueness if changing
    if (slug && slug !== existing.slug) {
      const slugConflict = await prisma.page.findUnique({ where: { slug } });
      if (slugConflict) {
        return reply.status(400).send({ success: false, message: 'Slug already exists' });
      }
    }

    const wasPublished = existing.status === 'PUBLISHED';
    const nowPublished = status === 'PUBLISHED';

    const page = await prisma.page.update({
      where: { id },
      data: {
        title,
        slug,
        content: content as unknown[],
        status: status as 'DRAFT' | 'PUBLISHED' | undefined,
        publishedAt: !wasPublished && nowPublished ? new Date() : undefined,
        seo: seo
          ? {
              upsert: {
                create: seo,
                update: seo,
              },
            }
          : undefined,
      },
      include: { seo: true },
    });

    return reply.send({ success: true, data: page });
  });

  // Delete page (admin)
  app.delete('/:id', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const existing = await prisma.page.findUnique({ where: { id } });
    if (!existing) {
      return reply.status(404).send({ success: false, message: 'Page not found' });
    }

    await prisma.page.delete({ where: { id } });

    return reply.send({ success: true, message: 'Page deleted successfully' });
  });
}
