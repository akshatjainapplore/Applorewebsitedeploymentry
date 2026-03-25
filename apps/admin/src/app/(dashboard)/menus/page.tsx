import { auth } from '@/lib/auth';
import MenuEditor from './MenuEditor';
import { apiFetch } from '@/lib/api';

export const metadata = { title: 'Navigation Menus' };

interface MenuData {
  id: string;
  name: string;
  location: string;
  items: Array<{
    id: string;
    label: string;
    url?: string;
    target?: string;
    order: number;
    parentId?: string;
    children?: Array<{ id: string; label: string; url?: string; target?: string; order: number }>;
  }>;
}

export default async function MenusPage() {
  const session = await auth();
  const token = (session as { accessToken?: string })?.accessToken;

  let menus: MenuData[] = [];
  try {
    const res = await apiFetch<{ data: MenuData[] }>('/menus', { token, cache: 'no-store' });
    menus = res.data;
  } catch { /* */ }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Navigation Menus</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage header and footer navigation</p>
      </div>
      <MenuEditor menus={menus} token={token || ''} />
    </div>
  );
}
