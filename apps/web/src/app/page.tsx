import { getPageBySlug } from '@/lib/api';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import type { Metadata } from 'next';
import type { Page, SEOData } from '@applore/types';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home') as Page | null;
  const seo = page?.seo as SEOData | undefined;

  return {
    title: seo?.metaTitle || 'Home',
    description: seo?.metaDescription || '',
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || 'Home',
      description: seo?.ogDescription || seo?.metaDescription || '',
      images: seo?.ogImage ? [{ url: seo.ogImage }] : [],
    },
    robots: seo?.robots || 'index,follow',
  };
}

export default async function HomePage() {
  const page = await getPageBySlug('home') as Page | null;

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Applore</h1>
        <p className="text-muted-foreground">
          Content is being set up. Please check back soon.
        </p>
      </div>
    );
  }

  return <BlockRenderer blocks={page.content} />;
}
