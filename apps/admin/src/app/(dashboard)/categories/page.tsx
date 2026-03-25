import { auth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import CategoriesManager from './CategoriesManager';

export const metadata = { title: 'Categories' };

export default async function CategoriesPage() {
  const session = await auth();
  const token = (session as { accessToken?: string })?.accessToken;

  let categories: Array<{ id: string; name: string; slug: string; description?: string; _count?: { posts: number } }> = [];
  try {
    const res = await apiFetch<{ data: typeof categories }>('/categories', { token, cache: 'no-store' });
    categories = res.data;
  } catch { /* */ }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage blog post categories</p>
      </div>
      <CategoriesManager categories={categories} token={token || ''} />
    </div>
  );
}
