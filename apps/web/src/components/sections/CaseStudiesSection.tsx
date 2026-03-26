'use client';

import { useState } from 'react';
import Link from 'next/link';

const CASES = [
  {
    id: 'c1',
    company: 'Mars Petcare',
    title: 'Mars Petcare reimagines digital petcare experiences with PawEasy & Pawra',
    metrics: [
      { value: '95%', label: 'Digital adoption' },
      { value: '48%', label: 'Improvement in Digital Petcare Platform Engagement' },
      { value: '30%', label: 'Automated Payments' },
      { value: '60%', label: 'Workflows automated' },
    ],
    bg: 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
    tags: ['Platform Architecture', 'AI Automation'],
  },
  {
    id: 'c2',
    company: 'DeHaat',
    title: 'Redesigned the core agri-tech platform to handle 10x transaction volume',
    metrics: [
      { value: '95%', label: 'System uptime after re-architecture' },
      { value: '10x', label: 'Transaction volume capacity' },
    ],
    bg: 'linear-gradient(135deg, #0F766E 0%, #1E40AF 100%)',
    tags: ['Platform Architecture', 'Scale'],
  },
  {
    id: 'c3',
    company: 'Kalyan Jewellers',
    title: 'Rationalised vendor portfolio from 34 systems to 19',
    metrics: [
      { value: '48%', label: 'Reduction in technology spend' },
      { value: '₹12 Cr', label: 'Annual savings' },
    ],
    bg: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
    tags: ['Cost Optimisation', 'Vendor Strategy'],
  },
  {
    id: 'c4',
    company: 'CirclePE',
    title: 'Architectural transformation from monolith to modular platform',
    metrics: [
      { value: '30%', label: 'Faster feature delivery post-migration' },
    ],
    bg: 'linear-gradient(135deg, #065F46 0%, #1E40AF 100%)',
    tags: ['Modernisation', 'Engineering'],
  },
];

export default function CaseStudiesSection() {
  const [start, setStart] = useState(0);
  const visible = 2;
  const canPrev = start > 0;
  const canNext = start + visible < CASES.length;

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="section-label">Case Studies</div>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15',
              letterSpacing: '-0.8px', color: '#111827', maxWidth: '620px', margin: 0,
            }}>
              Real Business Impact defines{' '}
              <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>Successful Technology.</em>
            </h2>
          </div>
          {/* Prev/Next */}
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <button
              onClick={() => canPrev && setStart(start - 1)}
              disabled={!canPrev}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                border: '1.5px solid rgba(0,0,0,0.12)',
                background: canPrev ? '#ffffff' : '#F9FAFB',
                cursor: canPrev ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: canPrev ? '#374151' : '#D1D5DB', transition: 'all 0.15s',
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
                border: '1.5px solid rgba(0,0,0,0.12)',
                background: canNext ? '#2563EB' : '#F9FAFB',
                cursor: canNext ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: canNext ? '#ffffff' : '#D1D5DB', transition: 'all 0.15s',
              }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Subtext */}
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#6B7280', marginBottom: '48px' }}>
          We measure success through measurable operational improvements — not features shipped, hours billed, or systems launched.
        </p>

        {/* Cards — 2 visible */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {CASES.slice(start, start + visible).map((c) => (
            <div key={c.id} style={{
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            }}>
              {/* Gradient top */}
              <div style={{ background: c.bg, padding: '32px' }}>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontSize: '13px',
                  fontWeight: 600, color: '#ffffff',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  marginBottom: '12px',
                }}>
                  {c.company}
                </div>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontSize: '20px',
                  fontWeight: 700, color: '#ffffff',
                  lineHeight: '1.3', marginBottom: '24px',
                }}>
                  {c.title}
                </div>
                {/* Metrics grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <div style={{
                        fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic',
                        fontSize: '32px', fontWeight: 400, color: '#ffffff',
                        lineHeight: '1', marginBottom: '4px',
                      }}>
                        {m.value}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-sans)', fontSize: '12px',
                        color: 'rgba(255,255,255,0.7)', lineHeight: '1.4',
                      }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* White bottom */}
              <div style={{
                background: '#ffffff',
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {c.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: '4px 10px', borderRadius: '9999px',
                      background: '#EFF6FF', color: '#2563EB',
                      fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/work/${c.id}`}
                  style={{
                    fontFamily: 'var(--font-sans)', fontSize: '14px',
                    fontWeight: 600, color: '#2563EB', textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                  }}
                >
                  Read Case ↗
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
