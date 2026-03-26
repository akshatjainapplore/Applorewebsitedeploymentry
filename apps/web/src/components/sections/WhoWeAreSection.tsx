import Link from 'next/link';

const STATS = [
  {
    number: '1000+',
    label: 'Across US · EU · India',
    sub: 'Organisations operating in complex, multi-team environments',
    title: 'Clients',
  },
  {
    number: '9+',
    label: 'Strategy-led technology engagements across industries',
    sub: '',
    title: 'Advisory Experience',
  },
  {
    number: '150+',
    label: 'Platforms, internal systems, and operational workflows implemented',
    sub: '',
    title: 'Systems Designed',
  },
  {
    number: '40%',
    label: 'Unnecessary builds eliminated during strategy phase',
    sub: '',
    title: 'Scope Reduction',
  },
];

export default function WhoWeAreSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

        {/* Top row: text left + visual right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div className="section-label">Who we are</div>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15',
              letterSpacing: '-0.8px', color: '#111827', marginBottom: '20px',
            }}>
              <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>Advisory</em>
              {' '}grounded in execution
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: '28px', color: '#4B5563', marginBottom: '16px' }}>
              Applore is a technology advisory firm with a decade of delivery behind it. We help enterprises and growth-stage companies make well-considered decisions on digital product strategy, platform architecture, and AI — and where required, we work alongside you to ensure those decisions result in outcomes, not just plans.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: '28px', color: '#4B5563', marginBottom: '32px' }}>
              Our clients do not come to us for presentations. They come because the problem is consequential, the timeline is real, and they need a firm that has been in that position before.
            </p>
            <Link href="/about" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
              Learn More →
            </Link>
          </div>

          {/* Right: network visualization */}
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            aspectRatio: '4/3',
            background: 'linear-gradient(135deg, #EEF2FF 0%, #DBEAFE 50%, #EDE9FE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="80%" height="80%" viewBox="0 0 400 300" fill="none">
              {/* Lines first (behind dots) */}
              <line x1="200" y1="150" x2="80" y2="60" stroke="rgba(37,99,235,0.25)" strokeWidth="1.5" />
              <line x1="200" y1="150" x2="320" y2="60" stroke="rgba(37,99,235,0.25)" strokeWidth="1.5" />
              <line x1="200" y1="150" x2="60" y2="190" stroke="rgba(37,99,235,0.25)" strokeWidth="1.5" />
              <line x1="200" y1="150" x2="340" y2="190" stroke="rgba(37,99,235,0.25)" strokeWidth="1.5" />
              <line x1="200" y1="150" x2="140" y2="260" stroke="rgba(124,58,237,0.2)" strokeWidth="1.5" />
              <line x1="200" y1="150" x2="260" y2="260" stroke="rgba(124,58,237,0.2)" strokeWidth="1.5" />
              <line x1="80" y1="60" x2="320" y2="60" stroke="rgba(37,99,235,0.12)" strokeWidth="1" />
              <line x1="60" y1="190" x2="340" y2="190" stroke="rgba(37,99,235,0.12)" strokeWidth="1" />
              {/* Center dot */}
              <circle cx="200" cy="150" r="14" fill="rgba(37,99,235,0.15)" stroke="#2563EB" strokeWidth="2" />
              <circle cx="200" cy="150" r="7" fill="#2563EB" />
              {/* Outer dots */}
              <circle cx="80" cy="60" r="7" fill="#3B82F6" opacity="0.8" />
              <circle cx="320" cy="60" r="7" fill="#3B82F6" opacity="0.8" />
              <circle cx="60" cy="190" r="7" fill="#3B82F6" opacity="0.8" />
              <circle cx="340" cy="190" r="7" fill="#3B82F6" opacity="0.8" />
              <circle cx="140" cy="260" r="7" fill="#7C3AED" opacity="0.7" />
              <circle cx="260" cy="260" r="7" fill="#7C3AED" opacity="0.7" />
            </svg>
          </div>
        </div>

        {/* By the Numbers */}
        <div style={{ marginTop: '80px' }}>
          <div className="section-label">By the Numbers</div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15',
            letterSpacing: '-0.8px', color: '#111827', maxWidth: '700px',
            marginBottom: '12px',
          }}>
            Performance Metrics<br />
            define{' '}
            <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>
              &ldquo;Technology Decisions&rdquo;
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: '28px',
            color: '#4B5563', maxWidth: '680px', marginBottom: '40px',
          }}>
            We evaluate success by measurable operational change — not launches, not features, not engagement rates. Every engagement is aligned to business outcomes before implementation begins.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {STATS.map((stat) => (
              <div key={stat.title} style={{
                border: '1.5px dashed #BFDBFE',
                borderRadius: '16px',
                padding: '28px',
                backgroundColor: '#ffffff',
              }}>
                <div style={{
                  fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic',
                  fontSize: '48px', fontWeight: 400,
                  color: '#2563EB', lineHeight: '1', marginBottom: '8px',
                }}>
                  {stat.number}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  {stat.title}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#6B7280', lineHeight: '1.5' }}>
                  {stat.label}
                </div>
                {stat.sub && (
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#9CA3AF', marginTop: '4px', lineHeight: '1.4' }}>
                    {stat.sub}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
