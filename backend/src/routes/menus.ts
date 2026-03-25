import { FastifyInstance } from 'fastify';
import { prisma } from '@applore/db';
import { authenticate } from '../middleware/auth';

export default async function menusRoutes(app: FastifyInstance) {
  // Get all menus (public)
  app.get('/', async (_request, reply) => {
    const menus = await prisma.menu.findMany({
      include: {
        items: {
          orderBy: { order: 'asc' },
          where: { parentId: null },
          include: {
            children: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    return reply.send({ success: true, data: menus });
  });

  // Get menu by location (public)
  app.get('/location/:location', async (request, reply) => {
    const { location } = request.params as { location: string };

    const menu = await prisma.menu.findFirst({
      where: { location: location as 'HEADER' | 'FOOTER' | 'SIDEBAR' },
      include: {
        items: {
          orderBy: { order: 'asc' },
          where: { parentId: null },
          include: {
            children: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!menu) {
      return reply.status(404).send({ success: false, message: 'Menu not found' });
    }

    return reply.send({ success: true, data: menu });
  });

  // Get menu by ID
  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const menu = await prisma.menu.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: { order: 'asc' },
          include: {
            children: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!menu) {
      return reply.status(404).send({ success: false, message: 'Menu not found' });
    }

    return reply.send({ success: true, data: menu });
  });

  // Create menu (admin)
  app.post('/', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { name, location, items } = request.body as {
      name: string;
      location: 'HEADER' | 'FOOTER' | 'SIDEBAR';
      items?: Array<{
        label: string;
        url?: string;
        target?: string;
        order?: number;
        pageId?: string;
        postId?: string;
        children?: Array<{
          label: string;
          url?: string;
          target?: string;
          order?: number;
        }>;
      }>;
    };

    const menu = await prisma.menu.create({
      data: {
        name,
        location,
        items: items
          ? {
              create: items.map((item, i) => ({
                label: item.label,
                url: item.url,
                target: item.target || '_self',
                order: item.order ?? i,
                pageId: item.pageId,
                postId: item.postId,
              })),
            }
          : undefined,
      },
      include: { items: { orderBy: { order: 'asc' } } },
    });

    return reply.status(201).send({ success: true, data: menu });
  });

  // Update menu (admin)
  app.put('/:id', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name, location, items } = request.body as {
      name?: string;
      location?: 'HEADER' | 'FOOTER' | 'SIDEBAR';
      items?: Array<{
        id?: string;
        label: string;
        url?: string;
        target?: string;
        order?: number;
        parentId?: string;
        pageId?: string;
        postId?: string;
      }>;
    };

    const existing = await prisma.menu.findUnique({ where: { id } });
    if (!existing) {
      return reply.status(404).send({ success: false, message: 'Menu not found' });
    }

    // Replace all items if provided
    if (items !== undefined) {
      await prisma.menuItem.deleteMany({ where: { menuId: id } });
    }

    const menu = await prisma.menu.update({
      where: { id },
      data: {
        name,
        location,
        items: items
          ? {
              create: items.map((item, i) => ({
                label: item.label,
                url: item.url,
                target: item.target || '_self',
                order: item.order ?? i,
                parentId: item.parentId,
                pageId: item.pageId,
                postId: item.postId,
              })),
            }
          : undefined,
      },
      include: {
        items: {
          orderBy: { order: 'asc' },
          where: { parentId: null },
          include: { children: { orderBy: { order: 'asc' } } },
        },
      },
    });

    return reply.send({ success: true, data: menu });
  });

  // Delete menu (admin)
  app.delete('/:id', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const existing = await prisma.menu.findUnique({ where: { id } });
    if (!existing) {
      return reply.status(404).send({ success: false, message: 'Menu not found' });
    }

    await prisma.menu.delete({ where: { id } });

    return reply.send({ success: true, message: 'Menu deleted successfully' });
  });
}
