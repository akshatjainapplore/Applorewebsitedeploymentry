'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface HeaderProps {
  settings: any;
  menu: any;
}

const NAV_ITEMS = [
  { label: 'Home', href: '/', hasDropdown: false },
  {
    label: 'About Us', href: '/about', hasDropdown: true, children: [
      { label: 'Company Overview', href: '/about' },
      { label: 'Our Approach', href: '/about#approach' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  { label: 'Our Work', href: '/work', hasDropdown: false },
  {
    label: 'Our expertise', href: '/services', hasDropdown: true, children: [
      { label: 'Technology Strategy', href: '/services/technology-strategy' },
      { label: 'Platform & Architecture', href: '/services/platform-architecture' },
      { label: 'Data & AI', href: '/services/data-ai' },
      { label: 'Intelligence & Automation', href: '/services/intelligence-automation' },
    ],
  },
  { label: 'Insights', href: '/insights', hasDropdown: false },
];

function FallbackLogo() {
  return (
    <svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="16,4 30,36 2,36" fill="#2563EB" />
      <polygon points="16,4 30,36 16,22" fill="#7C3AED" opacity="0.6" />
      <text x="38" y="28" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="18" letterSpacing="3" fill="#111827">APPLORE</text>
    </svg>
  );
}

function Logo() {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
      {imgError ? (
        <FallbackLogo />
      ) : (
        <Image
          src="/applore-logo.svg"
          alt="Applore"
          width={120}
          height={40}
          priority
          onError={() => setImgError(true)}
          style={{ display: 'block' }}
        />
      )}
    </Link>
  );
}

function NavItem({ item }: { item: typeof NAV_ITEMS[0] }) {
  const [open, setOpen] = useState(false);

  if (item.hasDropdown && item.children) {
    return (
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 14px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#374151',
            borderRadius: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'color 0.15s, background 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#2563EB';
            (e.currentTarget as HTMLButtonElement).style.background = '#EFF6FF';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#374151';
            (e.currentTarget as HTMLButtonElement).style.background = 'none';
          }}
        >
          {item.label}
          <svg
            style={{
              width: '14px',
              height: '14px',
              transition: 'transform 0.2s',
              transform: open ? 'rotate(180deg)' : 'none',
              flexShrink: 0,
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '4px',
              minWidth: '220px',
              background: '#ffffff',
              borderRadius: '14px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              border: '1px solid rgba(0,0,0,0.06)',
              padding: '8px',
              zIndex: 200,
            }}
          >
            {item.children!.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                style={{
                  display: 'block',
                  padding: '9px 14px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#EFF6FF';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#374151';
                }}
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
      href={item.href}
      style={{
        padding: '8px 14px',
        fontSize: '14px',
        fontWeight: 500,
        color: '#374151',
        borderRadius: '10px',
        textDecoration: 'none',
        transition: 'color 0.15s, background 0.15s',
        display: 'inline-block',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = '#2563EB';
        (e.currentTarget as HTMLAnchorElement).style.background = '#EFF6FF';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = '#374151';
        (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
      }}
    >
      {item.label}
    </Link>
  );
}

export default function Header({ settings: _settings, menu: _menu }: HeaderProps) {
  return (
    <div
      style={{
        position: 'sticky',
        top: '16px',
        zIndex: 50,
        padding: '0 16px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        {/* Main nav row */}
        <div
          style={{
            display: 'flex',
            height: '64px',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
          }}
        >
          <Logo />

          {/* Desktop nav links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </nav>

          {/* CTA button */}
          <div style={{ flexShrink: 0 }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 22px',
                borderRadius: '9999px',
                background: '#2563EB',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s, box-shadow 0.2s',
                boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#1d4ed8';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 14px rgba(37,99,235,0.45)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#2563EB';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 8px rgba(37,99,235,0.3)';
              }}
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
