import { auth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';

export default async function DashboardPage() {
  const session = await auth();
  const token = (session as { accessToken?: string })?.accessToken;

  let stats = { pages: 0, posts: 0, media: 0 };

  try {
    const [pagesRes, postsRes, mediaRes] = await Promise.all([
      apiFetch<{ data: unknown[] }>('/pages', { token }),
      apiFetch<{ data: unknown[]; total: number }>('/posts', { token }),
      apiFetch<{ data: unknown[]; total: number }>('/media', { token }),
    ]);
    stats = {
      pages: pagesRes.data.length,
      posts: postsRes.total,
      media: mediaRes.total,
    };
  } catch {
    // Continue with defaults
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {session?.user?.name || 'Admin'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Pages" value={stats.pages} icon="📄" color="bg-blue-500" href="/pages" />
        <StatCard title="Blog Posts" value={stats.posts} icon="📝" color="bg-green-500" href="/posts" />
        <StatCard title="Media Files" value={stats.media} icon="🖼️" color="bg-purple-500" href="/media" />
        <StatCard title="Categories" value={0} icon="🏷️" color="bg-orange-500" href="/categories" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickAction href="/pages/new" icon="📄" label="New Page" />
            <QuickAction href="/posts/new" icon="✍️" label="New Post" />
            <QuickAction href="/media" icon="📁" label="Media Library" />
            <QuickAction href="/settings" icon="⚙️" label="Settings" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold text-lg mb-4">Getting Started</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</span>
              Configure your site settings
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">2</span>
              Set up navigation menus
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">3</span>
              Create your first page
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">4</span>
              Publish your first blog post
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
  href,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
  href: string;
}) {
  return (
    <a href={href} className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow block">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </a>
  );
}

function QuickAction({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-border hover:bg-accent transition-colors text-sm font-medium"
    >
      <span className="text-2xl">{icon}</span>
      {label}
    </a>
  );
}
