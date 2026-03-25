import { auth } from '@/lib/auth';
import MediaLibrary from './MediaLibrary';

export const metadata = { title: 'Media Library' };

export default async function MediaPage() {
  const session = await auth();
  const token = (session as { accessToken?: string })?.accessToken;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Upload and manage files</p>
        </div>
      </div>
      <MediaLibrary token={token || ''} />
    </div>
  );
}
