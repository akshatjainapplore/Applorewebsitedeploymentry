import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar session={session} />
        <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}
