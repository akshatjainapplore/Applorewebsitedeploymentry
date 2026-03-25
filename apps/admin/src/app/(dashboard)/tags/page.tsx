import { auth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import TagsManager from './TagsManager';

export const metadata = { title: 'Tags' };

export default async function TagsPage() {
  const session = await auth();
  const token = (session as { accessToken?: string })?.accessToken;

  let tags: Array<{ id: string; name: string; slug: string; _count?: { posts: number } }> = [];
  try {
    const res = await apiFetch<{ data: typeof tags }>('/tags', { token, cache: 'no-store' });
    tags = res.data;
  } catch { /* */ }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tags</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage blog post tags</p>
      </div>
      <TagsManager tags={tags} token={token || ''} />
    </div>
  );
}
