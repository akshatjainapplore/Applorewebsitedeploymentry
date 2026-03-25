import { auth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export const metadata = { title: 'SEO Overview' };

export default async function SEOPage() {
  const session = await auth();
  const token = (session as { accessToken?: string })?.accessToken;

  let sitemapData: { pages: Array<{ slug: string; updatedAt: string }>; posts: Array<{ slug: string; updatedAt: string }> } = { pages: [], posts: [] };
  try {
    const res = await apiFetch<{ data: typeof sitemapData }>('/seo/sitemap', { token, cache: 'no-store' });
    sitemapData = res.data;
  } catch { /* */ }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">SEO Overview</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Search engine optimization settings</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-2">Sitemap</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {sitemapData.pages.length} pages + {sitemapData.posts.length} posts indexed
          </p>
          <a
            href="http://localhost:3000/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            View sitemap.xml →
          </a>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-2">Robots.txt</h3>
          <p className="text-sm text-muted-foreground mb-3">Controls how search engines crawl your site</p>
          <a
            href="http://localhost:3000/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            View robots.txt →
          </a>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Pages SEO */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Pages SEO</h3>
          </div>
          <div className="divide-y divide-border">
            {sitemapData.pages.map((page) => (
              <div key={page.slug} className="flex items-center justify-between p-3">
                <span className="text-sm font-mono">/{page.slug}</span>
                <Link
                  href={`/pages?slug=${page.slug}`}
                  className="text-xs text-primary hover:underline"
                >
                  Edit SEO →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Posts SEO */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Posts SEO</h3>
          </div>
          <div className="divide-y divide-border">
            {sitemapData.posts.map((post) => (
              <div key={post.slug} className="flex items-center justify-between p-3">
                <span className="text-sm font-mono">/blog/{post.slug}</span>
                <Link
                  href={`/posts?slug=${post.slug}`}
                  className="text-xs text-primary hover:underline"
                >
                  Edit SEO →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
