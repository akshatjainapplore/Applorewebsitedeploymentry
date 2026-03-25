import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { prisma } from '@applore/db';
import { authenticate } from '../middleware/auth';

export default async function authRoutes(app: FastifyInstance) {
  // Login
  app.post('/login', {
    schema: {
      tags: ['Auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 1 },
        },
      },
    },
  }, async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return reply.status(401).send({ success: false, message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return reply.status(401).send({ success: false, message: 'Invalid credentials' });
    }

    const token = app.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return reply.send({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        },
      },
    });
  });

  // Get current user
  app.get('/me', {
    preHandler: authenticate,
    schema: { tags: ['Auth'], security: [{ bearerAuth: [] }] },
  }, async (request, reply) => {
    const payload = request.user as { id: string };
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, name: true, role: true, avatar: true, bio: true, createdAt: true },
    });

    if (!user) {
      return reply.status(404).send({ success: false, message: 'User not found' });
    }

    return reply.send({ success: true, data: user });
  });

  // Change password
  app.post('/change-password', {
    preHandler: authenticate,
    schema: { tags: ['Auth'], security: [{ bearerAuth: [] }] },
  }, async (request, reply) => {
    const payload = request.user as { id: string };
    const { currentPassword, newPassword } = request.body as {
      currentPassword: string;
      newPassword: string;
    };

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) {
      return reply.status(404).send({ success: false, message: 'User not found' });
    }

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) {
      return reply.status(400).send({ success: false, message: 'Current password is incorrect' });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: payload.id },
      data: { password: hashed },
    });

    return reply.send({ success: true, message: 'Password changed successfully' });
  });

  // Update profile
  app.put('/profile', {
    preHandler: authenticate,
    schema: { tags: ['Auth'], security: [{ bearerAuth: [] }] },
  }, async (request, reply) => {
    const payload = request.user as { id: string };
    const { name, bio, avatar } = request.body as { name?: string; bio?: string; avatar?: string };

    const updated = await prisma.user.update({
      where: { id: payload.id },
      data: { name, bio, avatar },
      select: { id: true, email: true, name: true, role: true, avatar: true, bio: true },
    });

    return reply.send({ success: true, data: updated });
  });
}
