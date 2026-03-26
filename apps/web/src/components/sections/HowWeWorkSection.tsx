const STEPS = [
  {
    num: '01',
    verb: 'Diagnose',
    noun: ' Operational Reality',
    bullets: ['Bottlenecks', 'Manual coordination', 'Fragmented tools', 'Decision delays'],
  },
  {
    num: '02',
    verb: 'Define',
    noun: ' the Right Technology Strategy',
    bullets: ['Options analysis', 'Risk-adjusted recommendations', 'Decision frameworks', 'Executive alignment'],
  },
  {
    num: '03',
    verb: 'Architect',
    noun: ' the System',
    bullets: ['Platform architecture', 'Operational workflows', 'Data flow structure', 'AI-enabled capabilities'],
  },
  {
    num: '04',
    verb: 'Implement',
    noun: ' & Continuously Improve',
    bullets: ['Workflow improvements', 'Faster decisions', 'Efficiency gains', 'ROI visibility'],
  },
];

export default function HowWeWorkSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

          {/* Left */}
          <div style={{ paddingTop: '8px' }}>
            <div className="section-label">How we work</div>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: '1.15',
              letterSpacing: '-0.8px', color: '#111827', marginBottom: '20px',
            }}>
              A Structured Approach to{' '}
              <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>Technology Decisions.</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: '28px', color: '#4B5563' }}>
              We combine strategic thinking, system architecture, and disciplined execution to turn complex technology decisions into scalable solutions.
            </p>
          </div>

          {/* Right: gradient panel with stacked step cards */}
          <div style={{
            background: 'linear-gradient(160deg, #3B82F6 0%, #7C3AED 100%)',
            borderRadius: '24px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {STEPS.map((step) => (
              <div key={step.num} style={{
                background: '#ffffff',
                borderRadius: '14px',
                padding: '20px 24px',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  {/* Step badge */}
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '8px',
                    background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '2px',
                  }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>
                      {step.num}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '16px', color: '#111827', marginBottom: '2px' }}>
                      <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>{step.verb}</em>
                      {step.noun}
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {step.bullets.map((b) => (
                        <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ display: 'inline-block', width: '5px', height: '5px', background: '#2563EB', borderRadius: '50%', flexShrink: 0 }} />
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#4B5563' }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
