'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { MenuItem } from '@applore/types';

interface HeaderProps {
  settings: {
    siteTitle?: string;
    logoUrl?: string;
  } | null;
  menu: {
    items: MenuItem[];
  } | null;
}

export default function Header({ settings, menu }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = menu?.items || [];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            {settings?.logoUrl ? (
              <Image src={settings.logoUrl} alt={settings.siteTitle || 'Logo'} width={120} height={40} />
            ) : (
              <span className="text-primary">{settings?.siteTitle || 'Applore'}</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={item.url || '#'}
                  target={item.target || '_self'}
                  className="px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function NavItem({ item }: { item: MenuItem }) {
  if (item.children && item.children.length > 0) {
    return (
      <div className="relative group">
        <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors flex items-center gap-1">
          {item.label}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="absolute top-full left-0 mt-1 w-48 bg-popover rounded-md shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          {item.children.map((child) => (
            <Link
              key={child.id}
              href={child.url || '#'}
              className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.url || '#'}
      target={item.target || '_self'}
      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
    >
      {item.label}
    </Link>
  );
}
