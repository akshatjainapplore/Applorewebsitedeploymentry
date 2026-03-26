'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTABanner from '@/components/sections/CTABanner';

const FILTERS = ['All', 'Automation', 'Technology', 'Operations', 'Healthcare'];

const ARTICLES = [
  {
    id: '1',
    category: 'Healthcare',
    title: 'AI-Powered Workflow Transformation for Modern Healthcare',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
  },
  {
    id: '2',
    category: 'Technology',
    title: 'Why Most Digital Transformations Fail Before They Start',
    gradient: 'linear-gradient(135deg, #0F766E 0%, #2563EB 100%)',
  },
  {
    id: '3',
    category: 'Automation',
    title: 'The Hidden Cost of Premature Microservices',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
  },
  {
    id: '4',
    category: 'Operations',
    title: 'Building a Data Strategy That Actually Scales',
    gradient: 'linear-gradient(135deg, #065F46 0%, #1E40AF 100%)',
  },
  {
    id: '5',
    category: 'Technology',
    title: 'How to Rationalise Your Technology Vendor Portfolio',
    gradient: 'linear-gradient(135deg, #B45309 0%, #DC2626 100%)',
  },
  {
    id: '6',
    category: 'Automation',
    title: 'Technical Debt Is a Leadership Problem',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #065F46 100%)',
  },
];

export default function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <>
      <PageHero
        label="Insights"
        title="Perspectives"
        titleItalic="That Move Industries Forward"
      />

      <section style={{ backgroundColor: '#ffffff', padding: '64px 0 96px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '48px' }}>
            {FILTERS.map((f) => {
              const active = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding: '8px 20px', borderRadius: '9999px', cursor: 'pointer',
                    fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
                    border: active ? '1.5px solid #2563EB' : '1.5px solid rgba(0,0,0,0.12)',
                    background: active ? '#2563EB' : '#ffffff',
                    color: active ? '#ffffff' : '#4B5563',
                    transition: 'all 0.15s',
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Articles grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {ARTICLES.map((article) => (
              <div key={article.id} style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s',
              }}>
                {/* Gradient image area */}
                <div style={{
                  background: article.gradient,
                  aspectRatio: '16/9',
                  borderRadius: '20px 20px 0 0',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '16px',
                }}>
                  {/* Category pill */}
                  <span style={{
                    display: 'inline-block',
                    background: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '9999px',
                    padding: '4px 12px',
                    fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '0.04em',
                  }}>
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 700,
                    fontSize: '16px', lineHeight: '24px', color: '#111827',
                    marginBottom: '16px', marginTop: 0,
                  }}>
                    {article.title}
                  </h3>
                  <Link href={`/insights/${article.id}`} style={{
                    fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
                    color: '#2563EB', textDecoration: 'none',
                  }}>
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
