'use client';

import { useState } from 'react';
import { Plus, Trash2, GripVertical, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface MenuItem {
  id: string;
  label: string;
  url?: string;
  target?: string;
  order: number;
  parentId?: string;
  children?: MenuItem[];
}

interface Menu {
  id: string;
  name: string;
  location: string;
  items: MenuItem[];
}

interface MenuEditorProps {
  menus: Menu[];
  token: string;
}

export default function MenuEditor({ menus: initialMenus, token }: MenuEditorProps) {
  const [menus, setMenus] = useState<Menu[]>(initialMenus);
  const [activeMenu, setActiveMenu] = useState<string>(initialMenus[0]?.id || '');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const menu = menus.find((m) => m.id === activeMenu);

  function updateItems(items: MenuItem[]) {
    setMenus((prev) =>
      prev.map((m) => (m.id === activeMenu ? { ...m, items } : m))
    );
  }

  function addItem() {
    if (!menu) return;
    const newItem: MenuItem = {
      id: Math.random().toString(36).slice(2),
      label: 'New Item',
      url: '/',
      target: '_self',
      order: menu.items.length,
    };
    updateItems([...menu.items, newItem]);
  }

  function updateItem(id: string, field: string, value: string) {
    updateItems(menu!.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  }

  function removeItem(id: string) {
    updateItems(menu!.items.filter((item) => item.id !== id));
  }

  function moveItem(id: string, direction: 'up' | 'down') {
    const items = [...(menu?.items || [])];
    const idx = items.findIndex((i) => i.id === id);
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === items.length - 1) return;
    const swap = direction === 'up' ? idx - 1 : idx + 1;
    [items[idx], items[swap]] = [items[swap], items[idx]];
    updateItems(items.map((item, i) => ({ ...item, order: i })));
  }

  async function saveMenu() {
    if (!menu) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/menus/${menu.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: menu.name,
          location: menu.location,
          items: menu.items.map((item, i) => ({
            label: item.label,
            url: item.url,
            target: item.target,
            order: i,
          })),
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success('Menu saved');
      router.refresh();
    } catch {
      toast.error('Failed to save menu');
    } finally {
      setSaving(false);
    }
  }

  async function createMenu() {
    const name = prompt('Menu name:');
    if (!name) return;
    const location = prompt('Location (HEADER/FOOTER/SIDEBAR):', 'HEADER');
    if (!location) return;
    try {
      const res = await fetch(`${API_URL}/api/v1/menus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, location: location.toUpperCase(), items: [] }),
      });
      const data = await res.json();
      setMenus((prev) => [...prev, data.data]);
      setActiveMenu(data.data.id);
      toast.success('Menu created');
    } catch {
      toast.error('Failed to create menu');
    }
  }

  return (
    <div className="flex gap-6">
      {/* Menu list */}
      <div className="w-56 shrink-0">
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <span className="text-sm font-medium">Menus</span>
            <button
              onClick={createMenu}
              className="text-primary hover:bg-accent rounded p-1"
              title="New Menu"
            >
              <Plus size={14} />
            </button>
          </div>
          <div className="p-2">
            {menus.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMenu(m.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeMenu === m.id ? 'bg-primary text-white' : 'hover:bg-accent'
                }`}
              >
                <div className="font-medium">{m.name}</div>
                <div className={`text-xs ${activeMenu === m.id ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {m.location}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu editor */}
      {menu ? (
        <div className="flex-1">
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h2 className="font-semibold">{menu.name}</h2>
                <p className="text-xs text-muted-foreground">{menu.location}</p>
              </div>
              <button
                onClick={saveMenu}
                disabled={saving}
                className="h-8 px-4 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Menu'}
              </button>
            </div>

            <div className="p-4 space-y-2">
              {menu.items.sort((a, b) => a.order - b.order).map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border border-border rounded-lg bg-background">
                  <GripVertical size={16} className="text-muted-foreground shrink-0" />
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateItem(item.id, 'label', e.target.value)}
                      className="field-input text-sm"
                      placeholder="Label"
                    />
                    <input
                      type="text"
                      value={item.url || ''}
                      onChange={(e) => updateItem(item.id, 'url', e.target.value)}
                      className="field-input text-sm font-mono"
                      placeholder="/url"
                    />
                    <select
                      value={item.target || '_self'}
                      onChange={(e) => updateItem(item.id, 'target', e.target.value)}
                      className="field-input text-sm"
                    >
                      <option value="_self">Same Tab</option>
                      <option value="_blank">New Tab</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItem(item.id, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded hover:bg-accent disabled:opacity-30 text-xs"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveItem(item.id, 'down')}
                      disabled={idx === menu.items.length - 1}
                      className="p-1 rounded hover:bg-accent disabled:opacity-30 text-xs"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 rounded hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={addItem}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary transition-colors text-sm"
              >
                <Plus size={16} />
                Add Menu Item
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Select or create a menu
        </div>
      )}
    </div>
  );
}
