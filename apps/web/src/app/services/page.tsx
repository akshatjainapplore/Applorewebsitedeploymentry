import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Our Approach',
  description: 'Technology decisions should begin with understanding. We follow a structured process to every engagement.',
};

export const dynamic = 'force-dynamic';

const STEPS = [
  {
    num: '01',
    title: 'Diagnose the Operational Reality',
    bullets: [
      'Map existing workflows and bottlenecks',
      'Interview stakeholders across functions',
      'Identify root causes vs symptoms',
      'Document constraints and non-negotiables',
    ],
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
  },
  {
    num: '02',
    title: 'Define the Technology Direction',
    bullets: [
      'Evaluate build vs buy options',
      'Risk-adjust each recommendation',
      'Create decision framework',
      'Align executive team on direction',
    ],
    gradient: 'linear-gradient(135deg, #0F766E 0%, #1E40AF 100%)',
  },
  {
    num: '03',
    title: 'Architect the System',
    bullets: [
      'Design platform architecture',
      'Plan data flows and integrations',
      'Define security and compliance requirements',
      'Create implementation roadmap',
    ],
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
  },
  {
    num: '04',
    title: 'Implement and Continuously Improve',
    bullets: [
      'Oversee delivery against blueprint',
      'Run structured sprint reviews',
      'Monitor performance metrics',
      'Iterate based on operational feedback',
    ],
    gradient: 'linear-gradient(135deg, #065F46 0%, #1E40AF 100%)',
  },
];

const WORK_PRINCIPLES = [
  {
    title: 'Clarity Before Technology',
    desc: 'We diagnose before we prescribe. Recommendations follow a thorough understanding of operational reality — not pre-packaged solutions.',
  },
  {
    title: 'Systems Over Tools',
    desc: 'We design interconnected systems, not isolated tools. Every component is evaluated in the context of the whole.',
  },
  {
    title: 'Outcomes Over Activity',
    desc: 'Every recommendation is tied to a measurable business outcome. We track impact — not hours or deliverables.',
  },
  {
    title: 'Built for Evolution',
    desc: 'Systems we design are built to adapt. Not to require a full rebuild the next time strategy or scale changes.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        label="Our Approach"
        title="Technology decisions should begin with"
        titleItalic="understanding."
        subtitle="Technology delivers value only when it fits how organizations actually operate. Before recommending any system, we map the decision, the constraint, and the downstream impact."
      />

      {/* Framework */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div className="section-label">A Framework for Scalable Technology</div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15', letterSpacing: '-0.8px', color: '#111827', marginBottom: '16px', maxWidth: '700px' }}>
            We follow a structured process to{' '}
            <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>every engagement.</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', lineHeight: '30px', color: '#4B5563', marginBottom: '80px', maxWidth: '600px' }}>
            Four phases. Each built on the previous. All anchored in your operational context.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {STEPS.map((step, i) => {
              const isEven = i % 2 === 1;
              return (
                <div key={step.num} style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px',
                  alignItems: 'center',
                  direction: isEven ? 'rtl' : 'ltr',
                }}>
                  {/* Text side */}
                  <div style={{ direction: 'ltr' }}>
                    <div style={{
                      fontFamily: 'var(--font-sans)', fontWeight: 800,
                      fontSize: '64px', lineHeight: '1', color: '#2563EB',
                      opacity: 0.15, marginBottom: '-16px',
                      letterSpacing: '-2px',
                    }}>
                      {step.num}
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-sans)', fontWeight: 700,
                      fontSize: '28px', color: '#111827',
                      marginBottom: '24px', marginTop: 0, lineHeight: '1.25',
                    }}>
                      {step.title}
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {step.bullets.map((b) => (
                        <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            display: 'inline-block', width: '6px', height: '6px',
                            borderRadius: '50%', background: '#2563EB', flexShrink: 0,
                          }} />
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: '24px', color: '#4B5563' }}>
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '10px 24px', borderRadius: '9999px',
                      border: '1.5px solid #2563EB', color: '#2563EB',
                      fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
                      textDecoration: 'none', transition: 'all 0.2s',
                    }}>
                      Get in Touch
                    </Link>
                  </div>

                  {/* Decorative image box */}
                  <div style={{ direction: 'ltr' }}>
                    <div style={{
                      background: step.gradient,
                      borderRadius: '20px',
                      aspectRatio: '4/3',
                      width: '100%',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section style={{ backgroundColor: '#F9FAFB', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15', letterSpacing: '-0.8px', color: '#111827', marginBottom: '40px' }}>
            Principles That Guide Our Work
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {WORK_PRINCIPLES.map((p) => (
              <div key={p.title} style={{
                background: '#ffffff', borderRadius: '16px', padding: '32px',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
                {/* Icon */}
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                  marginBottom: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="20" height="20" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '18px', color: '#111827', marginBottom: '10px', marginTop: 0 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: '26px', color: '#4B5563', margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
