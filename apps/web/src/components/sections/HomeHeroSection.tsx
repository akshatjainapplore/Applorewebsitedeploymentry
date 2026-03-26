import Link from 'next/link';

const TICKER_ITEMS = [
  'STRATEGY',
  'PLATFORM ARCHITECTURE',
  'OPERATING MODEL DESIGN',
  'DATA & AI GOVERNANCE',
  'DIGITAL TRANSFORMATION',
  'BOARD ADVISORY',
  'VENDOR SELECTION',
  'TECHNOLOGY DUE DILIGENCE',
];

const allItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function HomeHeroSection() {
  return (
    <section>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          animation: ticker-scroll 28s linear infinite;
          width: max-content;
        }
      `}</style>

      {/* Hero content */}
      <div
        style={{
          background: 'linear-gradient(135deg, #EEF2FF 0%, #E8E4F8 50%, #FCE8F3 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '96px 32px 0',
        }}
      >
        <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>

          {/* Eyebrow pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            border: '1.5px solid #2563EB',
            borderRadius: '9999px',
            padding: '6px 16px',
            marginBottom: '36px',
          }}>
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              background: '#2563EB',
              borderRadius: '2px',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 600,
              color: '#2563EB',
              letterSpacing: '0.03em',
            }}>
              Technology Advisory
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: '1.1',
            letterSpacing: '-1.5px',
            margin: '0 0 28px',
          }}>
            <span style={{ display: 'block', marginBottom: '4px' }}>
              <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400, color: '#2563EB' }}>
                Advisory-led
              </em>
            </span>
            <span style={{ display: 'block', color: '#111827' }}>
              transformation that stops you building the wrong thing.
            </span>
          </h1>

          {/* Subtext */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '18px',
            lineHeight: '1.75',
            color: '#4B5563',
            maxWidth: '680px',
            margin: '0 auto 40px',
          }}>
            Great technology is not created by speed; it is built on disciplined decisions made early.
            Applore operates where strategy, architecture, and AI readiness converge — ensuring growth
            is deliberate, defensible, and built to last.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', paddingBottom: '80px' }}>
            <Link href="/work" className="btn-primary" style={{ textDecoration: 'none' }}>
              Explore our work
            </Link>
            <Link href="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>
              Talk to us
            </Link>
          </div>
        </div>
      </div>

      {/* Dark ticker bar */}
      <div style={{
        backgroundColor: '#1a1a2e',
        height: '56px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div className="ticker-track">
          {allItems.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: '#ffffff',
                whiteSpace: 'nowrap',
                padding: '0 24px',
              }}
            >
              {item}
              <span style={{ marginLeft: '24px', opacity: 0.35 }}>•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
