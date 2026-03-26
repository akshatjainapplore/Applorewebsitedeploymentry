import { getPosts, getCategories } from '@/lib/api';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { Post, Category } from '@applore/types';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and updates from the Applore team.',
};

const MOCK_POSTS = [
  {
    id: 'mp1',
    title: 'How we cut mobile onboarding drop-off by 52% in 8 weeks',
    slug: 'cut-mobile-onboarding-drop-off',
    excerpt: 'A detailed breakdown of the UX research, hypothesis testing, and design changes that transformed the FinFlow onboarding experience.',
    featuredImage: '',
    author: { id: 'a1', name: 'Priya Mehta', email: '', avatar: '' },
    categories: [{ id: 'c1', name: 'Product Design', slug: 'product-design' }],
    tags: [],
    status: 'PUBLISHED' as const,
    publishedAt: new Date('2025-01-15'),
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    authorId: 'a1',
  },
  {
    id: 'mp2',
    title: 'Building a multi-tenant SaaS on Next.js + Fastify: lessons learned',
    slug: 'multi-tenant-saas-nextjs-fastify',
    excerpt: 'We share the architecture decisions, tradeoffs, and hard-won lessons from building Orbit CMS — a headless multi-tenant content platform at scale.',
    featuredImage: '',
    author: { id: 'a2', name: 'Rahul Sharma', email: '', avatar: '' },
    categories: [{ id: 'c2', name: 'Engineering', slug: 'engineering' }],
    tags: [],
    status: 'PUBLISHED' as const,
    publishedAt: new Date('2025-02-03'),
    createdAt: new Date('2025-02-03'),
    updatedAt: new Date('2025-02-03'),
    authorId: 'a2',
  },
  {
    id: 'mp3',
    title: 'Why your AI feature is probably solving the wrong problem',
    slug: 'ai-feature-wrong-problem',
    excerpt: "Most teams rush to add AI features before understanding the job to be done. Here's our framework for deciding when AI is the right tool.",
    featuredImage: '',
    author: { id: 'a3', name: 'Ananya Krishnan', email: '', avatar: '' },
    categories: [{ id: 'c3', name: 'AI & Strategy', slug: 'ai-strategy' }],
    tags: [],
    status: 'PUBLISHED' as const,
    publishedAt: new Date('2025-02-20'),
    createdAt: new Date('2025-02-20'),
    updatedAt: new Date('2025-02-20'),
    authorId: 'a3',
  },
  {
    id: 'mp4',
    title: 'Design tokens in practice: how we scaled our design system to 30+ products',
    slug: 'design-tokens-design-system',
    excerpt: 'Tokens are more than colour variables. We walk through how we structure, version, and distribute design tokens across a large multi-brand system.',
    featuredImage: '',
    author: { id: 'a1', name: 'Priya Mehta', email: '', avatar: '' },
    categories: [{ id: 'c1', name: 'Product Design', slug: 'product-design' }],
    tags: [],
    status: 'PUBLISHED' as const,
    publishedAt: new Date('2025-03-01'),
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-03-01'),
    authorId: 'a1',
  },
  {
    id: 'mp5',
    title: 'From 0 to 10,000 users in 90 days: the SquadXP launch story',
    slug: 'squadxp-launch-story',
    excerpt: 'Behind the scenes on how we shipped a gamified engagement platform from kick-off to 10k users in one quarter.',
    featuredImage: '',
    author: { id: 'a2', name: 'Rahul Sharma', email: '', avatar: '' },
    categories: [{ id: 'c4', name: 'Case Studies', slug: 'case-studies' }],
    tags: [],
    status: 'PUBLISHED' as const,
    publishedAt: new Date('2025-03-10'),
    createdAt: new Date('2025-03-10'),
    updatedAt: new Date('2025-03-10'),
    authorId: 'a2',
  },
  {
    id: 'mp6',
    title: 'The real cost of technical debt: a framework for prioritisation',
    slug: 'technical-debt-prioritisation',
    excerpt: "Not all tech debt is equal. Here's how we quantify and prioritise debt alongside new feature work — without grinding product velocity to a halt.",
    featuredImage: '',
    author: { id: 'a3', name: 'Ananya Krishnan', email: '', avatar: '' },
    categories: [{ id: 'c2', name: 'Engineering', slug: 'engineering' }],
    tags: [],
    status: 'PUBLISHED' as const,
    publishedAt: new Date('2025-03-18'),
    createdAt: new Date('2025-03-18'),
    updatedAt: new Date('2025-03-18'),
    authorId: 'a3',
  },
];

const MOCK_CATEGORIES = [
  { id: 'c1', name: 'Product Design', slug: 'product-design', description: '' },
  { id: 'c2', name: 'Engineering', slug: 'engineering', description: '' },
  { id: 'c3', name: 'AI & Strategy', slug: 'ai-strategy', description: '' },
  { id: 'c4', name: 'Case Studies', slug: 'case-studies', description: '' },
];

interface BlogPageProps {
  searchParams: { page?: string; category?: string; search?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const [postsData, categoriesData] = await Promise.all([
    getPosts({ page: parseInt(searchParams.page || '1'), limit: 9, categoryId: searchParams.category, search: searchParams.search }),
    getCategories(),
  ]);

  const livePosts = postsData.data as Post[];
  const liveCategories = categoriesData as Category[];

  const posts = livePosts.length > 0 ? livePosts : MOCK_POSTS;
  const categories = liveCategories.length > 0 ? liveCategories : MOCK_CATEGORIES;

  return (
    <div>
      <PageHero
        label="Blog"
        title="Insights from the Applore team."
        description="Product thinking, engineering deep-dives, and case studies from our team of builders."
      />

      {/* Content */}
      <section className="py-8 pb-24" style={{ backgroundColor: '#f8f6f1' }}>
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Posts */}
            <div className="flex-1">
              {posts.length === 0 ? (
                <div className="rounded-2xl p-20 text-center" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <p style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '16px', color: '#4b4c4c' }}>No articles found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post as unknown as typeof MOCK_POSTS[0]} />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-24">
                <h3 className="mb-4" style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 600, fontSize: '15px', color: '#000000' }}>
                  Categories
                </h3>
                <div className="space-y-1.5">
                  <Link
                    href="/blog"
                    className="block px-4 py-2.5 rounded-xl text-sm transition-all"
                    style={{
                      fontFamily: 'Manrope, system-ui, sans-serif',
                      background: !searchParams.category ? 'linear-gradient(135deg, #10A4F2 0%, #8B4EFD 100%)' : '#ffffff',
                      color: !searchParams.category ? '#ffffff' : '#000000',
                      textDecoration: 'none',
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    All Posts
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/blog?category=${cat.id}`}
                      className="block px-4 py-2.5 rounded-xl text-sm transition-all"
                      style={{
                        fontFamily: 'Manrope, system-ui, sans-serif',
                        background: searchParams.category === cat.id ? 'linear-gradient(135deg, #10A4F2 0%, #8B4EFD 100%)' : '#ffffff',
                        color: searchParams.category === cat.id ? '#ffffff' : '#000000',
                        textDecoration: 'none',
                        border: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

// Gradient colours for post cards (cycle through)
const CARD_GRADIENTS = [
  ['#10A4F2', '#8B4EFD'],
  ['#2DCFC2', '#5E6EF9'],
  ['#16A1F3', '#A356F7'],
];

function PostCard({ post, index = 0 }: { post: typeof MOCK_POSTS[0]; index?: number }) {
  const [gFrom, gTo] = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

  const category = Array.isArray(post.categories) && post.categories.length > 0
    ? (post.categories[0] as { name?: string; category?: { name: string } })
    : null;
  const catName = category ? ('name' in category ? category.name : category.category?.name) : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article
        className="rounded-2xl overflow-hidden flex flex-col h-full transition-shadow duration-200 hover:shadow-lg"
        style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)' }}
      >
        {/* Gradient accent bar */}
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${gFrom} 0%, ${gTo} 100%)` }} />

        {/* Gradient image placeholder */}
        <div
          className="h-40 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${gFrom}18 0%, ${gTo}18 100%)` }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${gFrom}40, ${gTo}40)` }}
          >
            <span style={{ display: 'inline-block', width: '16px', height: '16px', borderRadius: '50%', background: `linear-gradient(135deg, ${gFrom}, ${gTo})` }} />
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          {catName && (
            <span
              className="inline-block mb-3 text-xs px-3 py-1 rounded-full"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500, fontSize: '11px', background: `linear-gradient(135deg, ${gFrom}15, ${gTo}15)`, color: gFrom, border: `1px solid ${gFrom}25` }}
            >
              {catName}
            </span>
          )}

          <h2
            className="mb-2 flex-1 group-hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 600, fontSize: '17px', lineHeight: '25px', color: '#000000', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {post.title}
          </h2>

          {post.excerpt && (
            <p
              className="mb-5"
              style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '21px', color: '#4b4c4c', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500, fontSize: '12px', color: '#000000' }}>
              {post.author?.name}
            </div>
            {formattedDate && (
              <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: '#9ca3af' }}>
                {formattedDate}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
