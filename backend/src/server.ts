import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import staticFiles from '@fastify/static';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import path from 'path';
import fs from 'fs';

// Routes
import authRoutes from './routes/auth';
import pagesRoutes from './routes/pages';
import postsRoutes from './routes/posts';
import mediaRoutes from './routes/media';
import menusRoutes from './routes/menus';
import settingsRoutes from './routes/settings';
import seoRoutes from './routes/seo';
import categoriesRoutes from './routes/categories';
import tagsRoutes from './routes/tags';

const PORT = parseInt(process.env.PORT || '4000');
const CORS_ORIGINS = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:3001').split(',');
const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads'));

// Ensure uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const app = Fastify({
  logger: true,
});

async function start() {
  // CORS
  await app.register(cors, {
    origin: CORS_ORIGINS,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // JWT
  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
    sign: { expiresIn: '7d' },
  });

  // Multipart (file uploads)
  await app.register(multipart, {
    limits: {
      fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB
    },
  });

  // Static files (uploads)
  await app.register(staticFiles, {
    root: UPLOAD_DIR,
    prefix: '/uploads/',
  });

  // Swagger
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Applore CMS API',
        description: 'REST API for Applore CMS',
        version: '1.0.0',
      },
      servers: [{ url: `http://localhost:${PORT}` }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
  });

  // Health check
  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  // API Routes
  await app.register(authRoutes, { prefix: '/api/v1/auth' });
  await app.register(pagesRoutes, { prefix: '/api/v1/pages' });
  await app.register(postsRoutes, { prefix: '/api/v1/posts' });
  await app.register(mediaRoutes, { prefix: '/api/v1/media' });
  await app.register(menusRoutes, { prefix: '/api/v1/menus' });
  await app.register(settingsRoutes, { prefix: '/api/v1/settings' });
  await app.register(seoRoutes, { prefix: '/api/v1/seo' });
  await app.register(categoriesRoutes, { prefix: '/api/v1/categories' });
  await app.register(tagsRoutes, { prefix: '/api/v1/tags' });

  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
    console.log(`📚 API Docs at http://localhost:${PORT}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
