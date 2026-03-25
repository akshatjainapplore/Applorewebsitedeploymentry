import { getPageBySlug } from '@/lib/api';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import type { Metadata } from 'next';
import type { Page, SEOData } from '@applore/types';
import { notFound } from 'next/navigation';

interface DynamicPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const page = await getPageBySlug(params.slug) as Page | null;
  if (!page) return {};

  const seo = page.seo as SEOData | undefined;

  return {
    title: seo?.metaTitle || page.title,
    description: seo?.metaDescription || '',
    openGraph: {
      title: seo?.ogTitle || page.title,
      description: seo?.ogDescription || '',
      images: seo?.ogImage ? [{ url: seo.ogImage }] : [],
    },
    twitter: {
      title: seo?.twitterTitle || page.title,
      description: seo?.twitterDescription || '',
    },
    robots: seo?.robots || 'index,follow',
  };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const page = await getPageBySlug(params.slug) as Page | null;

  if (!page || page.status !== 'PUBLISHED') notFound();

  const seo = page.seo as SEOData | undefined;

  return (
    <>
      <BlockRenderer blocks={page.content} />
      {seo?.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seo.jsonLd }}
        />
      )}
    </>
  );
}
