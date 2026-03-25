'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Trash2, Plus, X } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface Tag {
  id: string;
  name: string;
  slug: string;
  _count?: { posts: number };
}

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export default function TagsManager({ tags: initial, token }: { tags: Tag[]; token: string }) {
  const [tags, setTags] = useState<Tag[]>(initial);
  const [newTag, setNewTag] = useState('');
  const [saving, setSaving] = useState(false);

  async function createTag() {
    if (!newTag.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newTag, slug: slugify(newTag) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setTags((prev) => [...prev, data.data]);
      setNewTag('');
      toast.success('Tag created');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to create');
    } finally {
      setSaving(false);
    }
  }

  async function deleteTag(id: string) {
    if (!confirm('Delete this tag?')) return;
    try {
      await fetch(`${API_URL}/api/v1/tags/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setTags((prev) => prev.filter((t) => t.id !== id));
      toast.success('Tag deleted');
    } catch {
      toast.error('Failed to delete');
    }
  }

  return (
    <div className="max-w-xl">
      <div className="rounded-xl border border-border bg-card p-5 mb-4">
        <h3 className="font-semibold mb-4">Add New Tag</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createTag()}
            className="field-input flex-1"
            placeholder="Tag name"
          />
          <button
            onClick={createTag}
            disabled={saving || !newTag.trim()}
            className="flex items-center gap-2 h-9 px-4 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5 text-sm"
          >
            <span className="font-medium">#{tag.name}</span>
            {tag._count && (
              <span className="text-xs text-muted-foreground">({tag._count.posts})</span>
            )}
            <button
              onClick={() => deleteTag(tag.id)}
              className="ml-1 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {tags.length === 0 && (
          <p className="text-muted-foreground text-sm">No tags yet</p>
        )}
      </div>
    </div>
  );
}
