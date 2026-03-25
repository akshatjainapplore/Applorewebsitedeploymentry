import { FastifyInstance } from 'fastify';
import { prisma } from '@applore/db';
import { authenticate } from '../middleware/auth';

export default async function tagsRoutes(app: FastifyInstance) {
  app.get('/', async (_request, reply) => {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { posts: true } } },
    });
    return reply.send({ success: true, data: tags });
  });

  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const tag = await prisma.tag.findUnique({ where: { id } });
    if (!tag) return reply.status(404).send({ success: false, message: 'Tag not found' });
    return reply.send({ success: true, data: tag });
  });

  app.post('/', { preHandler: authenticate }, async (request, reply) => {
    const { name, slug } = request.body as { name: string; slug: string };

    const existing = await prisma.tag.findUnique({ where: { slug } });
    if (existing) return reply.status(400).send({ success: false, message: 'Slug already exists' });

    const tag = await prisma.tag.create({ data: { name, slug } });
    return reply.status(201).send({ success: true, data: tag });
  });

  app.put('/:id', { preHandler: authenticate }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name, slug } = request.body as { name?: string; slug?: string };

    const tag = await prisma.tag.update({ where: { id }, data: { name, slug } });
    return reply.send({ success: true, data: tag });
  });

  app.delete('/:id', { preHandler: authenticate }, async (request, reply) => {
    const { id } = request.params as { id: string };
    await prisma.tag.delete({ where: { id } });
    return reply.send({ success: true, message: 'Tag deleted' });
  });
}
