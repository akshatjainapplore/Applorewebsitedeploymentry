import { auth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import PostForm from '../PostForm';

export const metadata = { title: 'New Post' };

export default async function NewPostPage() {
  const session = await auth();
  const token = (session as { accessToken?: string })?.accessToken;

  const [cats, tags] = await Promise.all([
    apiFetch<{ data: Array<{ id: string; name: string; slug: string }> }>('/categories', { token }).catch(() => ({ data: [] })),
    apiFetch<{ data: Array<{ id: string; name: string; slug: string }> }>('/tags', { token }).catch(() => ({ data: [] })),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Post</h1>
      <PostForm categories={cats.data} tags={tags.data} />
    </div>
  );
}
