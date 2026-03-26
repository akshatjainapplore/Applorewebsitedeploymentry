'use client';

import { useState } from 'react';

const TESTIMONIALS = [
  {
    id: 't1',
    name: 'MATT MARRS',
    title: 'CEO',
    company: 'Texas',
    quote: "We've had zero double bookings since Applore helped us step back and understand the real operational challenges before building anything. Their structured approach brought clarity to decisions that had stalled for months.",
    initials: 'MM',
  },
  {
    id: 't2',
    name: 'BRANDRETH CANALEY',
    title: 'Roami',
    company: 'Florida',
    quote: "Applore didn't just give us a roadmap — they fundamentally changed how we think about technology decisions. The re-architecture they led took us from constant firefighting to building confidently at scale.",
    initials: 'BC',
  },
  {
    id: 't3',
    name: 'DAVID LEDERMAN',
    title: 'Zen Vacation Rentals',
    company: 'Florida',
    quote: "We had 34 systems with significant overlap and no clear owner. In 90 days, Applore helped us rationalise to 19 — saving ₹12 Cr annually and actually improving our capability.",
    initials: 'DL',
  },
  {
    id: 't4',
    name: 'RIC KENWORTHY',
    title: 'Old Town Rental',
    company: 'Arizona',
    quote: "The architectural transformation Applore led enabled our product team to ship independently for the first time. Feature velocity increased 30% within the first quarter post-migration.",
    initials: 'RK',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div className="section-label">Testimonials</div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15',
            letterSpacing: '-0.8px', color: '#111827', maxWidth: '700px',
          }}>
            Trusted by teams building the{' '}
            <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>future of technology.</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'start' }}>
          {/* Left: nav list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 16px', borderRadius: '12px',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: active === i ? '#EFF6FF' : 'transparent',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                  background: active === i ? '#2563EB' : '#E5E7EB',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700,
                  color: active === i ? '#ffffff' : '#6B7280',
                  transition: 'all 0.15s',
                }}>
                  {item.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: active === i ? '#111827' : '#4B5563' }}>
                    {item.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#9CA3AF' }}>
                    {item.title}, {item.company}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: quote card */}
          <div style={{
            background: '#111827',
            borderRadius: '24px',
            padding: '48px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '200px', height: '200px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Quote mark */}
            <div style={{
              fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic',
              fontSize: '96px', lineHeight: '0.6',
              color: 'rgba(37,99,235,0.3)',
              marginBottom: '32px',
              display: 'block',
            }}>
              &ldquo;
            </div>

            <blockquote style={{
              fontFamily: 'var(--font-sans)', fontSize: '18px',
              lineHeight: '32px', color: '#ffffff',
              fontWeight: 400, margin: '0 0 40px',
              fontStyle: 'normal',
            }}>
              {t.quote}
            </blockquote>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: '#ffffff',
                flexShrink: 0,
              }}>
                {t.initials}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                  {t.name}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                  {t.title} · {t.company}
                </div>
              </div>
            </div>

            {/* Dot pagination */}
            <div style={{ position: 'absolute', bottom: '32px', right: '48px', display: 'flex', gap: '6px' }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: active === i ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '9999px',
                    background: active === i ? '#2563EB' : 'rgba(255,255,255,0.2)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
