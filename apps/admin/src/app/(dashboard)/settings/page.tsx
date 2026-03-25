import { auth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import SettingsForm from './SettingsForm';

export const metadata = { title: 'Settings' };

export default async function SettingsPage() {
  const session = await auth();
  const token = (session as { accessToken?: string })?.accessToken;

  let settings = null;
  try {
    const res = await apiFetch<{ data: unknown }>('/settings', { token, cache: 'no-store' });
    settings = res.data;
  } catch { /* */ }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Configure your website settings</p>
      </div>
      <SettingsForm settings={settings} token={token || ''} />
    </div>
  );
}
