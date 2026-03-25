import { auth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import type { Post } from '@applore/types';
import DeleteButton from '@/components/DeleteButton';

export const metadata = { title: 'Blog Posts' };

export default async function PostsPage() {
  const session = await auth();
  const token = (session as { accessToken?: string })?.accessToken;

  let posts: Post[] = [];
  let total = 0;
  try {
    const res = await apiFetch<{ data: Post[]; total: number }>('/posts?limit=50', {
      token,
      cache: 'no-store',
    });
    posts = res.data;
    total = res.total;
  } catch { /* */ }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{total} total posts</p>
        </div>
        <Link
          href="/posts/new"
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No posts yet</p>
            <Link href="/posts/new" className="text-primary hover:underline text-sm mt-2 inline-block">
              Write your first post →
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Author</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">Categories</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Date</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <span className="font-medium">{post.title}</span>
                      {post.excerpt && (
                        <p className="text-xs text-muted-foreground truncate max-w-xs mt-0.5">{post.excerpt}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                    {post.author?.name}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {post.categories?.slice(0, 2).map((pc: { category: { id: string; name: string } }) => (
                        <span key={pc.category.id} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                          {pc.category.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/posts/${post.id}`}
                        className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Pencil size={14} />
                      </Link>
                      <DeleteButton
                        endpoint={`/posts/${post.id}`}
                        token={token || ''}
                        confirmMessage={`Delete "${post.title}"?`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    PUBLISHED: 'bg-green-100 text-green-700',
    DRAFT: 'bg-yellow-100 text-yellow-700',
    SCHEDULED: 'bg-blue-100 text-blue-700',
    ARCHIVED: 'bg-gray-100 text-gray-700',
  }[status] || 'bg-gray-100 text-gray-700';

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
