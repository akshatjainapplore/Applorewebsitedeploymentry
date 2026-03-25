import { auth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import PostForm from '../PostForm';
import type { Post } from '@applore/types';

export const metadata = { title: 'Edit Post' };

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const token = (session as { accessToken?: string })?.accessToken;

  const [postRes, cats, tags] = await Promise.all([
    apiFetch<{ data: Post }>(`/posts/${params.id}`, { token, cache: 'no-store' }).catch(() => null),
    apiFetch<{ data: Array<{ id: string; name: string; slug: string }> }>('/categories', { token }).catch(() => ({ data: [] })),
    apiFetch<{ data: Array<{ id: string; name: string; slug: string }> }>('/tags', { token }).catch(() => ({ data: [] })),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Post: {postRes?.data?.title}</h1>
      <PostForm post={postRes?.data} categories={cats.data} tags={tags.data} />
    </div>
  );
}
