import { getPostBySlug } from '@/lib/api';
import type { Metadata } from 'next';
import type { Post, SEOData } from '@applore/types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug) as Post | null;
  if (!post) return {};

  const seo = post.seo as SEOData | undefined;

  return {
    title: seo?.metaTitle || post.title,
    description: seo?.metaDescription || post.excerpt || '',
    openGraph: {
      title: seo?.ogTitle || post.title,
      description: seo?.ogDescription || post.excerpt || '',
      images: seo?.ogImage ? [{ url: seo.ogImage }] : post.featuredImage ? [{ url: post.featuredImage }] : [],
      type: 'article',
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      authors: post.author ? [post.author.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.twitterTitle || post.title,
      description: seo?.twitterDescription || post.excerpt || '',
      images: seo?.twitterImage ? [seo.twitterImage] : [],
    },
    robots: seo?.robots || 'index,follow',
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug) as Post | null;

  if (!post) notFound();

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const seo = post.seo as SEOData | undefined;

  return (
    <article className="min-h-screen">
      {/* Hero */}
      {post.featuredImage && (
        <div className="relative h-72 md:h-96 w-full">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {' / '}
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          {' / '}
          <span className="text-foreground">{post.title}</span>
        </nav>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex gap-2 mb-4">
            {(post.categories as unknown as { category: { id: string; name: string; slug: string } }[]).map((pc) => (
              <Link
                key={pc.category.id}
                href={`/blog?category=${pc.category.id}`}
                className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium hover:bg-primary/20 transition-colors"
              >
                {pc.category.name}
              </Link>
            ))}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
          {post.author && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs">
                {post.author.name.charAt(0)}
              </div>
              <span className="font-medium text-foreground">{post.author.name}</span>
            </div>
          )}
          {formattedDate && <span>{formattedDate}</span>}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {(post.tags as unknown as { tag: { id: string; name: string } }[]).map((pt) => (
                <span key={pt.tag.id} className="text-xs border border-border px-2 py-0.5 rounded">
                  #{pt.tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* JSON-LD */}
        {seo?.jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: seo.jsonLd }}
          />
        )}

        {/* Back link */}
        <div className="mt-12 pt-8 border-t">
          <Link
            href="/blog"
            className="text-primary hover:underline font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
