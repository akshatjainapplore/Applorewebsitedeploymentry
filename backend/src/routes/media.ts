import { FastifyInstance } from 'fastify';
import { prisma } from '@applore/db';
import { authenticate } from '../middleware/auth';
import path from 'path';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
const API_URL = process.env.API_URL || 'http://localhost:4000';

export default async function mediaRoutes(app: FastifyInstance) {
  // Get all media files (admin)
  app.get('/', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { search, page = '1', limit = '20' } = request.query as {
      search?: string;
      page?: string;
      limit?: string;
    };

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { originalName: { contains: search, mode: 'insensitive' } },
        { altText: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [files, total] = await Promise.all([
      prisma.mediaFile.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.mediaFile.count({ where }),
    ]);

    return reply.send({
      success: true,
      data: files,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  });

  // Upload file (admin)
  app.post('/upload', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const data = await request.file();

    if (!data) {
      return reply.status(400).send({ success: false, message: 'No file provided' });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'application/pdf', 'application/msword', 'video/mp4', 'video/webm'];

    if (!allowedTypes.includes(data.mimetype)) {
      return reply.status(400).send({ success: false, message: 'File type not allowed' });
    }

    const ext = path.extname(data.filename);
    const filename = `${randomUUID()}${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    const buffer = await data.toBuffer();
    await fs.writeFile(filePath, buffer);

    let width: number | undefined;
    let height: number | undefined;

    // Get image dimensions if it's an image
    if (data.mimetype.startsWith('image/') && data.mimetype !== 'image/svg+xml') {
      try {
        const sharp = (await import('sharp')).default;
        const metadata = await sharp(buffer).metadata();
        width = metadata.width;
        height = metadata.height;
      } catch {
        // Sharp not available or error - skip dimensions
      }
    }

    const mediaFile = await prisma.mediaFile.create({
      data: {
        filename,
        originalName: data.filename,
        mimeType: data.mimetype,
        size: buffer.length,
        url: `${API_URL}/uploads/${filename}`,
        width,
        height,
      },
    });

    return reply.status(201).send({ success: true, data: mediaFile });
  });

  // Update media file (alt text)
  app.put('/:id', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { altText } = request.body as { altText?: string };

    const existing = await prisma.mediaFile.findUnique({ where: { id } });
    if (!existing) {
      return reply.status(404).send({ success: false, message: 'File not found' });
    }

    const updated = await prisma.mediaFile.update({
      where: { id },
      data: { altText },
    });

    return reply.send({ success: true, data: updated });
  });

  // Delete media file (admin)
  app.delete('/:id', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const file = await prisma.mediaFile.findUnique({ where: { id } });
    if (!file) {
      return reply.status(404).send({ success: false, message: 'File not found' });
    }

    // Delete from filesystem
    try {
      const filePath = path.join(UPLOAD_DIR, file.filename);
      await fs.unlink(filePath);
    } catch {
      // File might already be deleted
    }

    await prisma.mediaFile.delete({ where: { id } });

    return reply.send({ success: true, message: 'File deleted successfully' });
  });
}
