import { FastifyInstance } from 'fastify';
import { prisma } from '@applore/db';
import { authenticate } from '../middleware/auth';

export default async function settingsRoutes(app: FastifyInstance) {
  // Get site settings (public)
  app.get('/', async (_request, reply) => {
    let settings = await prisma.siteSettings.findUnique({ where: { id: 'default' } });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: 'default',
          siteTitle: 'Applore',
          socialLinks: {},
        },
      });
    }

    return reply.send({ success: true, data: settings });
  });

  // Update site settings (admin)
  app.put('/', {
    preHandler: authenticate,
  }, async (request, reply) => {
    const {
      siteTitle,
      tagline,
      logoUrl,
      faviconUrl,
      socialLinks,
      analyticsId,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass,
      smtpSecure,
    } = request.body as {
      siteTitle?: string;
      tagline?: string;
      logoUrl?: string;
      faviconUrl?: string;
      socialLinks?: Record<string, string>;
      analyticsId?: string;
      smtpHost?: string;
      smtpPort?: number;
      smtpUser?: string;
      smtpPass?: string;
      smtpSecure?: boolean;
    };

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: {
        siteTitle,
        tagline,
        logoUrl,
        faviconUrl,
        socialLinks,
        analyticsId,
        smtpHost,
        smtpPort,
        smtpUser,
        smtpPass,
        smtpSecure,
      },
      create: {
        id: 'default',
        siteTitle: siteTitle || 'Applore',
        tagline,
        logoUrl,
        faviconUrl,
        socialLinks: socialLinks || {},
        analyticsId,
        smtpHost,
        smtpPort,
        smtpUser,
        smtpPass,
        smtpSecure: smtpSecure || false,
      },
    });

    return reply.send({ success: true, data: settings });
  });
}
