'use client';

const PARTNERS = [
  { name: 'JK Tyre', abbr: 'JK' },
  { name: 'DeHaat', abbr: 'DH' },
  { name: 'Indiamart', abbr: 'IM' },
  { name: 'Kalyan Jewellers', abbr: 'KJ' },
  { name: 'CirclePE', abbr: 'CP' },
];

export default function TrustedPartnersSection() {
  return (
    <section style={{ backgroundColor: '#0D0D0D', padding: '56px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>

          {/* Left label with divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <div style={{ width: '1px', height: '48px', background: 'rgba(255,255,255,0.15)' }} />
            <div>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '4px',
              }}>
                Our Trusted
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                Partners
              </div>
            </div>
          </div>

          {/* Partner logos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flex: 1, flexWrap: 'wrap' }}>
            {PARTNERS.map((p) => (
              <div
                key={p.name}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.6, transition: 'opacity 0.2s', cursor: 'default' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#ffffff',
                  flexShrink: 0,
                }}>
                  {p.abbr}
                </div>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                }}>
                  {p.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
