'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import type { Page, ContentBlock, SEOData, ContentStatus } from '@applore/types';
import BlockEditor from '@/components/editor/BlockEditor';
import SEOPanel from '@/components/seo/SEOPanel';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface PageFormProps {
  page?: Page;
}

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').replace(/--+/g, '-');
}

export default function PageForm({ page }: PageFormProps) {
  const { data: session } = useSession();
  const token = (session as { accessToken?: string })?.accessToken;
  const router = useRouter();

  const [title, setTitle] = useState(page?.title || '');
  const [slug, setSlug] = useState(page?.slug || '');
  const [status, setStatus] = useState(page?.status || 'DRAFT');
  const [blocks, setBlocks] = useState<ContentBlock[]>((page?.content as ContentBlock[]) || []);
  const [seo, setSeo] = useState<Partial<SEOData>>(page?.seo || {});
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [saving, setSaving] = useState(false);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    if (!page) {
      setSlug(slugify(e.target.value));
    }
  }

  async function handleSave(newStatus?: ContentStatus) {
    const finalStatus = newStatus || status;
    setSaving(true);
    try {
      const body = JSON.stringify({ title, slug, content: blocks, status: finalStatus, seo });
      const res = await fetch(
        `${API_URL}/api/v1/pages${page ? `/${page.id}` : ''}`,
        {
          method: page ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body,
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(page ? 'Page updated' : 'Page created');
      if (!page) router.push(`/pages/${data.data.id}`);
      else if (newStatus) setStatus(newStatus);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to save page');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex gap-6 flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 space-y-4">
        {/* Title & Slug */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="field-input text-lg font-semibold"
              placeholder="Enter page title..."
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="field-input font-mono text-sm"
                placeholder="page-slug"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`pb-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === 'content' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Content Blocks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`pb-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === 'seo' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            SEO
          </button>
        </div>

        {activeTab === 'content' ? (
          <BlockEditor blocks={blocks} onChange={setBlocks} />
        ) : (
          <SEOPanel seo={seo} onChange={setSeo} title={title} />
        )}
      </div>

      {/* Sidebar */}
      <div className="lg:w-72 shrink-0 space-y-4">
        {/* Publish */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h3 className="font-semibold">Publish</h3>
          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ContentStatus)}
              className="field-input"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleSave('PUBLISHED')}
              disabled={saving}
              className="h-9 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Publish'}
            </button>
            <button
              type="button"
              onClick={() => handleSave('DRAFT')}
              disabled={saving}
              className="h-9 border border-border rounded-md text-sm font-medium hover:bg-accent disabled:opacity-50"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
