'use client';

import { useState } from 'react';

const TABS = [
  {
    id: 'smes',
    label: 'SMEs',
    stat: '750+',
    statLabel: 'Digital Platforms Delivered',
    subheading: 'Growth-Stage · Mid-Market · Global SMEs',
    description: 'We help small and medium enterprises cut through technology complexity to implement systems that actually fit their scale, budget, and growth ambitions.',
    bullets: ['Rapid technology audit & gap analysis', 'Right-sized architecture decisions', 'Vendor selection & contract negotiation', 'Implementation oversight'],
  },
  {
    id: 'enterprise',
    label: 'Enterprises',
    stat: '60%',
    statLabel: 'Reduction in failed technology initiatives',
    subheading: 'Large-Scale · Multi-Region · Complex Environments',
    description: 'For enterprise teams, we navigate political complexity, legacy constraints, and competing stakeholder priorities to drive technology decisions that actually land.',
    bullets: ['Enterprise architecture review', 'Portfolio rationalisation', 'Digital transformation roadmaps', 'Change management support'],
  },
  {
    id: 'midmarket',
    label: 'Mid-Market Businesses',
    stat: '3x',
    statLabel: 'Faster time-to-decision on major technology choices',
    subheading: 'Scaling · Decision-Heavy · Resource-Constrained',
    description: 'Mid-market companies face enterprise-scale decisions without enterprise-scale resources. We bring senior advisory bandwidth at a fraction of the cost of traditional consulting.',
    bullets: ['Technology strategy alignment', 'Build vs. buy analysis', 'Scalability planning', 'Team capability assessment'],
  },
  {
    id: 'product',
    label: 'Product & Tech Teams',
    stat: '95%',
    statLabel: 'Of engagements result in measurable cost savings',
    subheading: 'CTOs · CPOs · Engineering Leaders',
    description: 'We work alongside CTOs, CPOs, and engineering leaders to stress-test architecture decisions, validate technology bets, and provide an external perspective on hard choices.',
    bullets: ['Technical due diligence', 'Architecture review boards', 'Technology radar development', 'Engineering leadership coaching'],
  },
  {
    id: 'ops',
    label: 'Operations Leaders',
    stat: '150+',
    statLabel: 'Operational systems designed and delivered',
    subheading: 'COOs · Process Owners · Operations Teams',
    description: 'For COOs and operations leaders, we translate business process requirements into technology specifications — ensuring the systems you buy actually solve the problem you have.',
    bullets: ['Process-to-technology mapping', 'ERP & CRM selection', 'Systems integration advisory', 'Operational data strategy'],
  },
];

export default function WhoWeServeSection() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: '16px' }}>
          <div className="section-label">Who We Serve</div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15',
            letterSpacing: '-0.8px', color: '#111827', maxWidth: '700px',
            marginBottom: '12px',
          }}>
            Built for organisations where{' '}
            <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>technology affects performance.</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#6B7280', marginBottom: '32px' }}>
            Each engagement below reflects a decision corrected before a system was built.
          </p>
        </div>

        {/* Tab pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s',
                background: active === i
                  ? 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)'
                  : '#F3F4F6',
                color: active === i ? '#ffffff' : '#374151',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          {/* Left: stat + description */}
          <div>
            <div style={{
              fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic',
              fontSize: 'clamp(56px, 5vw, 80px)', fontWeight: 400,
              color: '#2563EB', lineHeight: '1', marginBottom: '8px',
            }}>
              {tab.stat}
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#6B7280', marginBottom: '4px', fontWeight: 500 }}>
              {tab.statLabel}
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#9CA3AF', marginBottom: '24px', fontWeight: 500 }}>
              {tab.subheading}
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: '28px', color: '#4B5563', marginBottom: '24px' }}>
              {tab.description}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tab.bullets.map((b) => (
                <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#2563EB', borderRadius: '2px', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#374151' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: styled card with gradient */}
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            aspectRatio: '4/3',
            background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(37,99,235,0.25)',
          }}>
            {/* Decorative circles */}
            <div style={{
              position: 'absolute',
              top: '-40px', right: '-40px',
              width: '200px', height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-30px', left: '-30px',
              width: '160px', height: '160px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            {/* Stat overlay */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic',
                fontSize: 'clamp(64px, 6vw, 96px)', fontWeight: 400,
                color: '#ffffff', lineHeight: '1',
                marginBottom: '12px',
              }}>
                {tab.stat}
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: '14px',
                fontWeight: 600, color: 'rgba(255,255,255,0.8)',
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                {tab.statLabel}
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: '13px',
                color: 'rgba(255,255,255,0.55)', marginTop: '6px',
              }}>
                {tab.label}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
