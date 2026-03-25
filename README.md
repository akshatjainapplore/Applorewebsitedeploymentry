# Applore Website — Full-Stack CMS Monorepo

A production-ready CMS-powered website built with Next.js 14, Fastify, Prisma, and Turborepo.

## Architecture

```
applore-website/
├── apps/
│   ├── web/          → Public website (Next.js 14, port 3000)
│   └── admin/        → CMS Admin Panel (Next.js 14, port 3001)
├── backend/          → REST API (Fastify, port 4000)
├── packages/
│   ├── db/           → Prisma schema + client + seed
│   ├── ui/           → Shared React components
│   └── types/        → Shared TypeScript types
├── docker-compose.yml
└── .env.example
```

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker + Docker Compose

## Setup

### 1. Clone and install dependencies

```bash
git clone <repo>
cd applore-website
cp .env.example .env
pnpm install
```

### 2. Start Docker services (PostgreSQL + pgAdmin + Backend)

```bash
docker-compose up -d
```

Services:
- PostgreSQL: `localhost:5432`
- pgAdmin: `http://localhost:5050` (admin@applore.com / admin123)
- Backend: `http://localhost:4000`

### 3. Run database migrations and seed

```bash
pnpm db:migrate
pnpm db:seed
```

This creates:
- Admin user: `admin@applore.com` / `Admin@123`
- Homepage with content blocks
- About page
- Sample blog post
- Header and footer navigation menus
- Default SEO settings

### 4. Start development servers

```bash
pnpm dev
```

This starts all apps simultaneously:
- **Web**: http://localhost:3000
- **Admin**: http://localhost:3001
- **Backend API**: http://localhost:4000
- **API Docs**: http://localhost:4000/docs
- **pgAdmin**: http://localhost:5050

## CMS Features

### Content Management
- **Pages** — Create/edit pages with drag-and-drop block editor
- **Block Editor** — Hero, Text, Image, CTA, Grid, Cards, Testimonials, FAQ
- **Blog/Posts** — Full CRUD with Tiptap rich text editor
- **Media Library** — Upload, manage, alt text editor
- **Navigation Menus** — Header and Footer menus with ordering

### SEO
- Meta title/description per page and post
- Open Graph + Twitter Card fields
- Canonical URL + Robots meta
- JSON-LD structured data
- Dynamic sitemap.xml at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- SEO score preview

### Authentication
- Email/password login via NextAuth v5
- JWT sessions
- Protected admin routes via middleware

## API Endpoints

```
GET    /api/v1/pages
POST   /api/v1/pages
GET    /api/v1/pages/:id
PUT    /api/v1/pages/:id
DELETE /api/v1/pages/:id

GET    /api/v1/posts
POST   /api/v1/posts
GET    /api/v1/posts/:id
PUT    /api/v1/posts/:id
DELETE /api/v1/posts/:id

POST   /api/v1/media/upload
GET    /api/v1/media
DELETE /api/v1/media/:id

GET    /api/v1/menus
POST   /api/v1/menus
PUT    /api/v1/menus/:id

GET    /api/v1/settings
PUT    /api/v1/settings

POST   /api/v1/auth/login
GET    /api/v1/auth/me
```

## Environment Variables

See `.env.example` for all required variables.

Key variables:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/applore_db
JWT_SECRET=your-secret
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Scripts

```bash
pnpm dev            # Start all apps
pnpm build          # Build all apps
pnpm lint           # Lint all apps
pnpm db:migrate     # Run Prisma migrations
pnpm db:seed        # Seed database
pnpm db:studio      # Open Prisma Studio
```

## Docker Production

```bash
docker-compose up --build
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Admin | Next.js 14, NextAuth v5, Tiptap |
| Backend | Fastify, TypeScript |
| Database | PostgreSQL 16, Prisma ORM |
| Auth | JWT, NextAuth v5 |
| Monorepo | Turborepo, pnpm workspaces |
| Deployment | Vercel (web/admin), Docker (backend) |
