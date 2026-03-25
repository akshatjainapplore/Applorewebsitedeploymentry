import { FastifyInstance } from 'fastify';
import { prisma } from '@applore/db';
import { authenticate } from '../middleware/auth';

export default async function categoriesRoutes(app: FastifyInstance) {
  app.get('/', async (_request, reply) => {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { posts: true } } },
    });
    return reply.send({ success: true, data: categories });
  });

  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const category = await prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { posts: true } } },
    });
    if (!category) return reply.status(404).send({ success: false, message: 'Category not found' });
    return reply.send({ success: true, data: category });
  });

  app.post('/', { preHandler: authenticate }, async (request, reply) => {
    const { name, slug, description } = request.body as {
      name: string;
      slug: string;
      description?: string;
    };

    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) return reply.status(400).send({ success: false, message: 'Slug already exists' });

    const category = await prisma.category.create({ data: { name, slug, description } });
    return reply.status(201).send({ success: true, data: category });
  });

  app.put('/:id', { preHandler: authenticate }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name, slug, description } = request.body as {
      name?: string;
      slug?: string;
      description?: string;
    };

    const category = await prisma.category.update({ where: { id }, data: { name, slug, description } });
    return reply.send({ success: true, data: category });
  });

  app.delete('/:id', { preHandler: authenticate }, async (request, reply) => {
    const { id } = request.params as { id: string };
    await prisma.category.delete({ where: { id } });
    return reply.send({ success: true, message: 'Category deleted' });
  });
}
