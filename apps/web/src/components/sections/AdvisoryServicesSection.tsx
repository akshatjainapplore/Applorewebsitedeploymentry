import Link from 'next/link';

export default function AdvisoryServicesSection() {
  return (
    <section style={{ backgroundColor: '#111111', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

        {/* Header row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '40px',
          marginBottom: '56px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}>
          <div>
            <div className="section-label-white">What we Offer</div>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15',
              letterSpacing: '-0.8px', color: '#ffffff', margin: 0,
            }}>
              Advisory built for{' '}
              <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>complexity.</em>
            </h2>
          </div>
          <div style={{ maxWidth: '360px' }}>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '15px',
              lineHeight: '26px', color: 'rgba(255,255,255,0.55)',
              margin: 0,
            }}>
              Three areas of deep practice. Each underpinned by the same principle: no recommendation without understanding.
            </p>
          </div>
        </div>

        {/* 3-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>

          {/* Card 1 — light blue */}
          <div style={{
            backgroundColor: '#DBEAFE',
            borderRadius: '20px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '44px', height: '44px', borderRadius: '12px',
              background: '#2563EB', marginBottom: '24px', flexShrink: 0,
            }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '22px', color: '#111827', marginBottom: '12px' }}>
              Technology Strategy
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: '26px', color: '#374151', marginBottom: '24px', flex: 1 }}>
              For boards and executive teams who need a defensible technology direction.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Technology Board Advisory', 'Digital Strategy Development', 'Technology M&A Support', 'CTO-as-a-Service'].map((b) => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '7px', height: '7px', background: '#2563EB', borderRadius: '2px', marginTop: '6px', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#374151' }}>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="btn-primary"
              style={{ textDecoration: 'none', display: 'inline-flex', alignSelf: 'flex-start', fontSize: '14px', padding: '10px 20px' }}
            >
              Read More ↗
            </Link>
          </div>

          {/* Card 2 — dark blue gradient */}
          <div style={{
            borderRadius: '20px',
            background: 'linear-gradient(160deg, #1E293B 0%, #0F172A 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '44px', height: '44px', borderRadius: '12px',
              background: 'rgba(59,130,246,0.2)',
              border: '1px solid rgba(59,130,246,0.3)',
              marginBottom: '24px', flexShrink: 0,
            }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#3B82F6" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '22px', color: '#ffffff', marginBottom: '12px' }}>
              Platform & Architecture
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: '26px', color: 'rgba(255,255,255,0.65)', marginBottom: '24px', flex: 1 }}>
              Design systems that scale reliably — from initial architecture to enterprise-grade platform evolution.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Architecture design & review', 'Scalability & resilience planning', 'API & integration strategy', 'Tech debt remediation'].map((b) => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '7px', height: '7px', background: '#3B82F6', borderRadius: '50%', marginTop: '6px', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                </li>
              ))}
            </ul>
            <Link href="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
              color: '#3B82F6', textDecoration: 'none',
            }}>
              Read More →
            </Link>
          </div>

          {/* Card 3 — dark purple gradient */}
          <div style={{
            borderRadius: '20px',
            background: 'linear-gradient(160deg, #1E1B2E 0%, #0F0D1A 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '44px', height: '44px', borderRadius: '12px',
              background: 'rgba(124,58,237,0.2)',
              border: '1px solid rgba(124,58,237,0.3)',
              marginBottom: '24px', flexShrink: 0,
            }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#8B5CF6" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '22px', color: '#ffffff', marginBottom: '12px' }}>
              Data & AI
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: '26px', color: 'rgba(255,255,255,0.65)', marginBottom: '24px', flex: 1 }}>
              Turn your data into a strategic asset and deploy AI where it creates genuine business leverage.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Data strategy & governance', 'AI use-case identification', 'Model deployment & monitoring', 'Data platform architecture'].map((b) => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '7px', height: '7px', background: '#8B5CF6', borderRadius: '50%', marginTop: '6px', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                </li>
              ))}
            </ul>
            <Link href="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
              color: '#8B5CF6', textDecoration: 'none',
            }}>
              Read More →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
