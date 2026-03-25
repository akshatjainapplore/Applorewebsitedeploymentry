'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Trash2, Plus, Pencil, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  _count?: { posts: number };
}

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export default function CategoriesManager({
  categories: initial,
  token,
}: {
  categories: Category[];
  token: string;
}) {
  const [categories, setCategories] = useState<Category[]>(initial);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function createCategory() {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newName, slug: newSlug || slugify(newName), description: newDesc }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCategories((prev) => [...prev, data.data]);
      setNewName(''); setNewSlug(''); setNewDesc('');
      toast.success('Category created');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to create');
    } finally {
      setSaving(false);
    }
  }

  async function updateCategory(id: string) {
    try {
      const res = await fetch(`${API_URL}/api/v1/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: editName, slug: editSlug, description: editDesc }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCategories((prev) => prev.map((c) => c.id === id ? data.data : c));
      setEditId(null);
      toast.success('Category updated');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to update');
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm('Delete this category?')) return;
    try {
      await fetch(`${API_URL}/api/v1/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success('Category deleted');
    } catch {
      toast.error('Failed to delete');
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Add form */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-semibold mb-4">Add New Category</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => { setNewName(e.target.value); setNewSlug(slugify(e.target.value)); }}
              className="field-input"
              placeholder="Category name"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Slug</label>
            <input
              type="text"
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              className="field-input font-mono text-sm"
              placeholder="category-slug"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Description</label>
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              rows={2}
              className="field-input"
              placeholder="Optional description"
            />
          </div>
          <button
            onClick={createCategory}
            disabled={saving || !newName.trim()}
            className="flex items-center gap-2 h-9 px-4 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            <Plus size={16} /> Add Category
          </button>
        </div>
      </div>

      {/* Categories list */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">All Categories ({categories.length})</h3>
        </div>
        <div className="divide-y divide-border">
          {categories.map((cat) => (
            <div key={cat.id} className="p-3">
              {editId === cat.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="field-input text-sm"
                  />
                  <input
                    type="text"
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="field-input text-sm font-mono"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => updateCategory(cat.id)} className="flex items-center gap-1 text-xs text-green-600 hover:underline">
                      <Check size={12} /> Save
                    </button>
                    <button onClick={() => setEditId(null)} className="flex items-center gap-1 text-xs text-muted-foreground hover:underline">
                      <X size={12} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-sm">{cat.name}</span>
                    <span className="text-xs text-muted-foreground font-mono ml-2">/{cat.slug}</span>
                    {cat._count && (
                      <span className="text-xs text-muted-foreground ml-2">({cat._count.posts} posts)</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditId(cat.id);
                        setEditName(cat.name);
                        setEditSlug(cat.slug);
                        setEditDesc(cat.description || '');
                      }}
                      className="p-1.5 rounded hover:bg-accent text-muted-foreground"
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {categories.length === 0 && (
            <div className="p-6 text-center text-muted-foreground text-sm">No categories yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
