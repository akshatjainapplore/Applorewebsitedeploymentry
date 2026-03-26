'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
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
    <header className="sticky top-0 z-50 bg-white border-b border-[#e6e6e6]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex h-[72px] items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {settings?.logoUrl ? (
              <Image
                src={settings.logoUrl}
                alt={settings.siteTitle || 'Applore'}
                width={140}
                height={40}
                className="object-contain"
              />
            ) : (
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#000000' }}
              >
                APPLORE
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {items.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              href="/contact"
              className="btn-cta text-sm"
            >
              Start a Conversation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#e6e6e6] bg-white">
          <nav className="max-w-[1440px] mx-auto px-8 py-4">
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={item.url || '#'}
                  target={item.target || '_self'}
                  className="px-3 py-3 text-sm font-medium text-[#000000] hover:text-[#6e45ff] transition-colors rounded-md hover:bg-gray-50"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 btn-cta text-center"
                onClick={() => setMobileOpen(false)}
              >
                Start a Conversation
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavItem({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);

  if (item.children && item.children.length > 0) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#000000] hover:text-[#6e45ff] transition-colors rounded-md"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          aria-expanded={open}
        >
          {item.label}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-xl shadow-[2px_4px_4px_rgba(0,0,0,0.09)] border border-[#e6e6e6] py-2 z-50">
            {item.children.map((child) => (
              <Link
                key={child.id}
                href={child.url || '#'}
                className="block px-5 py-2.5 text-sm text-[#000000] hover:text-[#6e45ff] hover:bg-[#f8f6f1] transition-colors"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.url || '#'}
      target={item.target || '_self'}
      className="px-4 py-2 text-sm font-medium text-[#000000] hover:text-[#6e45ff] transition-colors rounded-md"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {item.label}
    </Link>
  );
}
