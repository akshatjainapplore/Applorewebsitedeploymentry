'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  PenSquare,
  Image,
  Navigation,
  Settings,
  Search,
  Tag,
  FolderOpen,
  ChevronLeft,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pages', label: 'Pages', icon: FileText },
  { href: '/posts', label: 'Blog Posts', icon: PenSquare },
  { href: '/categories', label: 'Categories', icon: FolderOpen },
  { href: '/tags', label: 'Tags', icon: Tag },
  { href: '/media', label: 'Media Library', icon: Image },
  { href: '/menus', label: 'Navigation', icon: Navigation },
  { href: '/seo', label: 'SEO', icon: Search },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } bg-slate-900 text-white flex flex-col transition-all duration-200 shrink-0`}
    >
      {/* Logo */}
      <div className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-6'} py-5 border-b border-slate-700`}>
        {!collapsed && (
          <Link href="/" className="text-xl font-bold text-white">
            Applore
            <span className="text-xs text-slate-400 font-normal ml-2">CMS</span>
          </Link>
        )}
        {collapsed && (
          <span className="text-xl font-bold">A</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="p-3 border-t border-slate-700">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm transition-colors`}
        >
          <ChevronLeft
            size={16}
            className={`transition-transform ${collapsed ? 'rotate-180' : ''}`}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
