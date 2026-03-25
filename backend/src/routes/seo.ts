import { FastifyInstance } from 'fastify';
import { prisma } from '@applore/db';
import { authenticate } from '../middleware/auth';

export default async function seoRoutes(app: FastifyInstance) {
  // Get SEO for page
  app.get('/page/:pageId', async (request, reply) => {
    const { pageId } = request.params as { pageId: string };

    const seo = await prisma.sEO.findUnique({ where: { pageId } });

    return reply.send({ success: true, data: seo });
  });

  // Get SEO for post
  app.get('/post/:postId', async (request, reply) => {
    const { postId } = request.params as { postId: string };

    const seo = await prisma.sEO.findUnique({ where: { postId } });

    return reply.send({ success: true, data: seo });
  });

  // Upsert SEO for page (admin)
  app.put('/page/:pageId', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { pageId } = request.params as { pageId: string };
    const seoData = request.body as {
      metaTitle?: string;
      metaDescription?: string;
      ogTitle?: string;
      ogDescription?: string;
      ogImage?: string;
      twitterTitle?: string;
      twitterDescription?: string;
      twitterImage?: string;
      canonicalUrl?: string;
      robots?: string;
      jsonLd?: string;
    };

    const seo = await prisma.sEO.upsert({
      where: { pageId },
      update: seoData,
      create: { ...seoData, pageId },
    });

    return reply.send({ success: true, data: seo });
  });

  // Upsert SEO for post (admin)
  app.put('/post/:postId', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { postId } = request.params as { postId: string };
    const seoData = request.body as {
      metaTitle?: string;
      metaDescription?: string;
      ogTitle?: string;
      ogDescription?: string;
      ogImage?: string;
      twitterTitle?: string;
      twitterDescription?: string;
      twitterImage?: string;
      canonicalUrl?: string;
      robots?: string;
      jsonLd?: string;
    };

    const seo = await prisma.sEO.upsert({
      where: { postId },
      update: seoData,
      create: { ...seoData, postId },
    });

    return reply.send({ success: true, data: seo });
  });

  // Get sitemap data
  app.get('/sitemap', async (_request, reply) => {
    const [pages, posts] = await Promise.all([
      prisma.page.findMany({
        where: { status: 'PUBLISHED' },
        select: { slug: true, updatedAt: true },
      }),
      prisma.post.findMany({
        where: { status: 'PUBLISHED' },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    return reply.send({ success: true, data: { pages, posts } });
  });
}
