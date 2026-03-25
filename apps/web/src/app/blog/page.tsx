import { getPosts, getCategories } from '@/lib/api';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import type { Post, Category } from '@applore/types';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles from Applore',
};

interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
    search?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = parseInt(searchParams.page || '1');
  const [postsData, categories] = await Promise.all([
    getPosts({
      page: currentPage,
      limit: 9,
      categoryId: searchParams.category,
      search: searchParams.search,
    }),
    getCategories(),
  ]);

  const posts = postsData.data as Post[];
  const { totalPages } = postsData;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Insights, tutorials, and updates from the Applore team
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Search */}
            <form className="mb-8" method="GET">
              <div className="flex gap-2">
                <input
                  type="search"
                  name="search"
                  defaultValue={searchParams.search}
                  placeholder="Search articles..."
                  className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="submit"
                  className="h-10 px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90"
                >
                  Search
                </button>
              </div>
            </form>

            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No articles found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?page=${p}${searchParams.category ? `&category=${searchParams.category}` : ''}${searchParams.search ? `&search=${searchParams.search}` : ''}`}
                    className={`h-10 w-10 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                      p === currentPage
                        ? 'bg-primary text-white'
                        : 'border border-input hover:bg-accent'
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-4">
              <h2 className="font-semibold text-lg mb-4">Categories</h2>
              <div className="space-y-1">
                <Link
                  href="/blog"
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    !searchParams.category
                      ? 'bg-primary text-white'
                      : 'hover:bg-accent'
                  }`}
                >
                  All Posts
                </Link>
                {(categories as Category[]).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blog?category=${cat.id}`}
                    className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                      searchParams.category === cat.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow bg-card">
        {post.featuredImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-5">
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2 mb-3">
              {post.categories.slice(0, 2).map((pc: { category: Category }) => (
                <span
                  key={pc.category.id}
                  className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium"
                >
                  {pc.category.name}
                </span>
              ))}
            </div>
          )}
          <h2 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {post.author && (
              <span className="font-medium text-foreground">{post.author.name}</span>
            )}
            {formattedDate && <span>{formattedDate}</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}
