import Link from 'next/link';

export default function CTABanner() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '0 0 96px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 35%, #7C3AED 100%)',
          borderRadius: '28px',
          padding: '80px 64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '48px', flexWrap: 'wrap',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Background decorations */}
          <div style={{
            position: 'absolute', top: '-60px', right: '10%',
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-80px', right: '-40px',
            width: '320px', height: '320px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Text */}
          <div style={{ position: 'relative', maxWidth: '620px' }}>
            <div style={{
              fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600,
              color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase',
              letterSpacing: '0.12em', marginBottom: '16px',
            }}>
              Get Started
            </div>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(24px, 2.5vw, 40px)', lineHeight: '1.2',
              letterSpacing: '-0.6px', color: '#ffffff', margin: 0,
            }}>
              Ready to rethink how your{' '}
              <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>technology works?</em>
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: '26px',
              color: 'rgba(255,255,255,0.75)', margin: '16px 0 0',
            }}>
              Let&apos;s explore how the right systems, automation, and architecture can unlock operational performance.
            </p>
          </div>

          {/* CTA */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px', borderRadius: '9999px',
              background: '#ffffff', color: '#1E40AF',
              fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
            }}>
              Talk to our team
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
