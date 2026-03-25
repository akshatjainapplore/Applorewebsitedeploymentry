import { MetadataRoute } from 'next';
import { getSitemapData } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pages, posts } = await getSitemapData() as {
    pages: Array<{ slug: string; updatedAt: string }>;
    posts: Array<{ slug: string; updatedAt: string }>;
  };

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const pageRoutes: MetadataRoute.Sitemap = pages
    .filter((p) => p.slug !== 'home')
    .map((page) => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...pageRoutes, ...postRoutes];
}
