'use client';

import { useState } from 'react';
import Link from 'next/link';

const INSIGHTS = [
  {
    id: 'i1',
    category: 'Technology Strategy',
    title: 'Why Most Digital Transformations Fail Before They Start',
    excerpt: 'The problem isn\'t execution. It\'s that the technology bet was wrong from the beginning.',
    readTime: '6 min read',
    bg: 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
  },
  {
    id: 'i2',
    category: 'Architecture',
    title: 'The Hidden Cost of Premature Microservices',
    excerpt: 'Breaking apart your monolith before you\'re ready creates more problems than it solves.',
    readTime: '8 min read',
    bg: 'linear-gradient(135deg, #0F766E 0%, #2563EB 100%)',
  },
  {
    id: 'i3',
    category: 'Data & AI',
    title: 'Building a Data Strategy That Actually Scales',
    excerpt: 'Most data strategies fail not from lack of data, but from lack of clear business questions.',
    readTime: '5 min read',
    bg: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
  },
  {
    id: 'i4',
    category: 'Cost Optimisation',
    title: 'How to Rationalise Your Technology Vendor Portfolio',
    excerpt: 'A structured approach to cutting SaaS spend without losing capability.',
    readTime: '7 min read',
    bg: 'linear-gradient(135deg, #B45309 0%, #DC2626 100%)',
  },
  {
    id: 'i5',
    category: 'Engineering',
    title: 'Technical Debt Is a Leadership Problem',
    excerpt: 'The accumulation of technical debt is rarely a developer problem. It\'s a decision-making problem.',
    readTime: '9 min read',
    bg: 'linear-gradient(135deg, #065F46 0%, #1E40AF 100%)',
  },
];

export default function InsightsSection() {
  const [start, setStart] = useState(0);
  const visible = 3;
  const canPrev = start > 0;
  const canNext = start + visible < INSIGHTS.length;

  return (
    <section style={{ backgroundColor: '#111111', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="section-label-white">Insights</div>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15',
              letterSpacing: '-0.8px', color: '#ffffff', maxWidth: '620px', margin: 0,
            }}>
              <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>Perspectives</em>
              {' '}on technology, AI, and operational systems
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => canPrev && setStart(start - 1)}
              disabled={!canPrev}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.15)',
                background: canPrev ? 'rgba(255,255,255,0.08)' : 'transparent',
                cursor: canPrev ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: canPrev ? '#ffffff' : 'rgba(255,255,255,0.2)', transition: 'all 0.15s',
              }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => canNext && setStart(start + 1)}
              disabled={!canNext}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.15)',
                background: canNext ? '#2563EB' : 'transparent',
                cursor: canNext ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: canNext ? '#ffffff' : 'rgba(255,255,255,0.2)', transition: 'all 0.15s',
              }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {INSIGHTS.slice(start, start + visible).map((insight) => (
            <Link
              key={insight.id}
              href={`/insights/${insight.id}`}
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', borderRadius: '20px', overflow: 'hidden', transition: 'transform 0.2s' }}
            >
              {/* Gradient image area */}
              <div style={{ background: insight.bg, aspectRatio: '16/9', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '20px' }}>
                <span style={{
                  padding: '4px 10px', borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500, color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}>
                  {insight.category}
                </span>
              </div>

              {/* Content */}
              <div style={{
                background: '#1A1A1A',
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255,255,255,0.06)',
                borderTop: 'none',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 700,
                  fontSize: '16px', lineHeight: '24px',
                  color: '#ffffff', marginBottom: '10px', flex: 1,
                }}>
                  {insight.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: '13px',
                  lineHeight: '20px', color: 'rgba(255,255,255,0.5)',
                  marginBottom: '16px',
                }}>
                  {insight.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
                    {insight.readTime}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: '#3B82F6' }}>
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/insights" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600,
            color: 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
            border: '1.5px solid rgba(255,255,255,0.12)',
            borderRadius: '9999px', padding: '12px 28px',
            transition: 'all 0.2s',
          }}>
            View all insights →
          </Link>
        </div>

      </div>
    </section>
  );
}
