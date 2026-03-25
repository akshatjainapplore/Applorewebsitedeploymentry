import { auth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import PageForm from '../PageForm';
import type { Page } from '@applore/types';

export const metadata = { title: 'Edit Page' };

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const session = await auth();
  const token = (session as { accessToken?: string })?.accessToken;

  let page: Page | null = null;
  try {
    const res = await apiFetch<{ data: Page }>(`/pages/${params.id}`, {
      token,
      cache: 'no-store',
    });
    page = res.data;
  } catch {
    //
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Page: {page?.title}</h1>
      <PageForm page={page || undefined} />
    </div>
  );
}
