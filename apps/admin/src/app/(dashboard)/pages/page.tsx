import { auth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import type { Page } from '@applore/types';
import DeleteButton from '@/components/DeleteButton';

export const metadata = { title: 'Pages' };

export default async function PagesPage() {
  const session = await auth();
  const token = (session as { accessToken?: string })?.accessToken;

  let pages: Page[] = [];
  try {
    const res = await apiFetch<{ data: Page[] }>('/pages', { token, cache: 'no-store' });
    pages = res.data;
  } catch {
    //
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pages</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{pages.length} total pages</p>
        </div>
        <Link
          href="/pages/new"
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90"
        >
          <Plus size={16} />
          New Page
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {pages.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No pages yet</p>
            <Link href="/pages/new" className="text-primary hover:underline text-sm mt-2 inline-block">
              Create your first page →
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Slug</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Updated</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-medium">{page.title}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                    /{page.slug}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={page.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`http://localhost:3000/${page.slug === 'home' ? '' : page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                        title="Preview"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <Link
                        href={`/pages/${page.id}`}
                        className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </Link>
                      <DeleteButton
                        endpoint={`/pages/${page.id}`}
                        token={token || ''}
                        confirmMessage={`Delete "${page.title}"? This cannot be undone.`}
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
