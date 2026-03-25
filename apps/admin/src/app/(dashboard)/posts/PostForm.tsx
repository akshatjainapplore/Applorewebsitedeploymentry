'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import type { Post, SEOData } from '@applore/types';
import RichTextEditor from '@/components/editor/RichTextEditor';
import SEOPanel from '@/components/seo/SEOPanel';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface PostFormProps {
  post?: Post;
  categories: Array<{ id: string; name: string; slug: string }>;
  tags: Array<{ id: string; name: string; slug: string }>;
}

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').replace(/--+/g, '-');
}

export default function PostForm({ post, categories, tags }: PostFormProps) {
  const { data: session } = useSession();
  const token = (session as { accessToken?: string })?.accessToken;
  const router = useRouter();

  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '');
  const [status, setStatus] = useState(post?.status || 'DRAFT');
  const [scheduledAt, setScheduledAt] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    post?.categories?.map((pc: { category: { id: string } }) => pc.category.id) || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    post?.tags?.map((pt: { tag: { id: string } }) => pt.tag.id) || []
  );
  const [seo, setSeo] = useState<Partial<SEOData>>(post?.seo || {});
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [saving, setSaving] = useState(false);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    if (!post) setSlug(slugify(e.target.value));
  }

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function toggleTag(id: string) {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  async function handleSave(newStatus?: string) {
    const finalStatus = newStatus || status;
    setSaving(true);
    try {
      const body = JSON.stringify({
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        status: finalStatus,
        scheduledAt: finalStatus === 'SCHEDULED' ? scheduledAt : undefined,
        categoryIds: selectedCategories,
        tagIds: selectedTags,
        seo,
      });

      const res = await fetch(
        `${API_URL}/api/v1/posts${post ? `/${post.id}` : ''}`,
        {
          method: post ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body,
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(post ? 'Post updated' : 'Post created');
      if (!post) router.push(`/posts/${data.data.id}`);
      else if (newStatus) setStatus(newStatus);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex gap-6 flex-col lg:flex-row">
      {/* Main */}
      <div className="flex-1 space-y-4">
        {/* Title */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Post Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="field-input text-lg font-semibold"
              placeholder="Enter post title..."
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="field-input font-mono text-sm"
                placeholder="post-slug"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="field-input"
              placeholder="Short description for blog listing..."
            />
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
            Content
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
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <RichTextEditor content={content} onChange={setContent} placeholder="Write your post..." />
          </div>
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
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="field-input">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          {status === 'SCHEDULED' && (
            <div>
              <label className="text-sm font-medium mb-1 block">Schedule Date</label>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="field-input"
              />
            </div>
          )}
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

        {/* Featured Image */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <h3 className="font-semibold">Featured Image</h3>
          <input
            type="text"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            className="field-input text-xs"
            placeholder="https://... or upload URL"
          />
          {featuredImage && (
            <img src={featuredImage} alt="Preview" className="w-full rounded-lg aspect-video object-cover" />
          )}
        </div>

        {/* Categories */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <h3 className="font-semibold">Categories</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="rounded"
                />
                <span className="text-sm">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <h3 className="font-semibold">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  selectedTags.includes(tag.id)
                    ? 'bg-primary text-white border-primary'
                    : 'border-border hover:border-primary'
                }`}
              >
                #{tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
