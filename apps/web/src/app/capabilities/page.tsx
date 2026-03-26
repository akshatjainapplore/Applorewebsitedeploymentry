import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Intelligence & Automation',
  description: 'Automate workflows. Enable intelligent decisions. We identify where automation creates genuine operational leverage.',
};

export const dynamic = 'force-dynamic';

const FRICTION_POINTS = [
  {
    title: 'Disconnected Data Sources',
    desc: 'Systems that don\'t talk to each other create manual reconciliation work and unreliable reporting.',
  },
  {
    title: 'Manual Approval Chains',
    desc: 'Every decision requiring human sign-off is a potential bottleneck — and a delay in operational velocity.',
  },
  {
    title: 'Duplicate Data Entry',
    desc: 'Information entered in multiple systems breeds errors, wastes time, and erodes data confidence.',
  },
  {
    title: 'Reactive Monitoring',
    desc: 'Finding out about problems after they\'ve caused damage. Proactive systems prevent, not just detect.',
  },
  {
    title: 'Siloed Reporting',
    desc: 'Each team sees a different version of reality. Strategic decisions require a unified view.',
  },
  {
    title: 'Unscalable Processes',
    desc: 'Workflows that work at 10 people break at 100. Systems must be designed for the scale you\'re targeting.',
  },
];

const ENABLERS = [
  {
    num: '01',
    title: 'End-to-End Workflow Automation',
    desc: 'Eliminate manual steps in core operational processes — from approval chains to data handoffs.',
  },
  {
    num: '02',
    title: 'Intelligent Data Pipelines',
    desc: 'Real-time data flows that connect your systems and surface the right information at the right time.',
  },
  {
    num: '03',
    title: 'AI-Assisted Decision Making',
    desc: 'Augment human decisions with pattern recognition, predictive signals, and structured recommendations.',
  },
  {
    num: '04',
    title: 'Predictive Operations',
    desc: 'Move from reactive to proactive with systems that identify issues before they affect performance.',
  },
  {
    num: '05',
    title: 'Unified Reporting Layer',
    desc: 'One source of truth across all business units — real-time dashboards replacing manual report cycles.',
  },
];

const METRICS = [
  { value: '60%', label: 'Reduction in manual coordination time', icon: '⏱' },
  { value: '3x', label: 'Faster operational decisions', icon: '⚡' },
  { value: '40%', label: 'Reduction in reporting overhead', icon: '📊' },
  { value: '95%', label: 'System uptime guarantee', icon: '🔒' },
  { value: '150+', label: 'Automated workflows delivered', icon: '✓' },
];

const IMPACT_FEATURES = [
  {
    title: 'Operational Visibility',
    desc: 'Every team sees live data relevant to their function. No more end-of-week reports or chasing updates.',
  },
  {
    title: 'Faster Execution Cycles',
    desc: 'Approvals, handoffs, and escalations that took days now happen in minutes — automatically.',
  },
  {
    title: 'Compounding Efficiency',
    desc: 'Each automation creates leverage. The system gets smarter and more efficient as it runs.',
  },
  {
    title: 'Reduced Error Surface',
    desc: 'Manual data entry and reconciliation are removed from the critical path — eliminating a major source of operational risk.',
  },
];

const TECH_STACK = [
  ['Next.js', 'Node.js', 'Python', 'PostgreSQL'],
  ['AWS', 'GCP', 'Azure', 'Docker'],
  ['Zapier', 'Make', 'n8n', 'OpenAI'],
];

const FAQ_ITEMS = [
  {
    q: 'How do you decide which processes to automate first?',
    a: 'We start by mapping your operational reality — identifying the highest-frequency, highest-friction touchpoints. Automation candidates are scored by impact (time saved × frequency × error rate) and feasibility. We always begin with quick wins that build confidence before tackling complex workflows.',
  },
  {
    q: 'Do we need to replace our existing systems?',
    a: 'Rarely. Most automation work connects and orchestrates what you already have rather than replacing it. We design integration layers that allow your existing tools to communicate, reducing the need for wholesale system replacement.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Targeted automation engagements typically show measurable impact within 6–12 weeks. We prioritise early delivery of visible operational improvements — not multi-year transformation programmes with deferred ROI.',
  },
  {
    q: 'What does ongoing support look like?',
    a: 'We offer continuous improvement retainers that include monitoring, iteration, and advisory as your operational needs evolve. Automation is not a one-time project — it requires adaptation as your business scales and changes.',
  },
];

export default function CapabilitiesPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        label="Capabilities"
        title="Automate workflows. Enable"
        titleItalic="intelligent decisions."
        subtitle="We identify where automation creates genuine operational leverage — and build systems that work with how your organisation actually operates."
      />

      {/* Where Systems Break Down */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div className="section-label">Where Most Systems Break Down</div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15',
            letterSpacing: '-0.8px', color: '#111827',
            marginBottom: '16px', maxWidth: '680px',
          }}>
            The friction points that{' '}
            <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>slow organisations down.</em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '17px', lineHeight: '28px',
            color: '#4B5563', marginBottom: '56px', maxWidth: '620px',
          }}>
            Most operational inefficiency isn&apos;t caused by bad people or poor intent. It&apos;s caused by systems that were never designed to work together.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {FRICTION_POINTS.map((fp) => (
              <div key={fp.title} style={{
                background: '#ffffff',
                border: '1px solid rgba(239,68,68,0.15)',
                borderRadius: '16px', padding: '28px',
                borderLeft: '3px solid #EF4444',
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: '#FEF2F2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="16" height="16" fill="none" stroke="#EF4444" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 700,
                  fontSize: '16px', color: '#111827',
                  marginBottom: '8px', marginTop: 0,
                }}>
                  {fp.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: '14px',
                  lineHeight: '22px', color: '#6B7280', margin: 0,
                }}>
                  {fp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Actually Enable */}
      <section style={{ backgroundColor: '#F9FAFB', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Left: decorative visual */}
            <div style={{
              background: 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
              borderRadius: '24px', aspectRatio: '1/1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Abstract grid decoration */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
                {[...Array(6)].map((_, row) => (
                  [...Array(6)].map((_, col) => (
                    <div key={`${row}-${col}`} style={{
                      position: 'absolute',
                      left: `${col * 20 + 5}%`, top: `${row * 20 + 5}%`,
                      width: '8px', height: '8px', borderRadius: '2px',
                      background: '#ffffff',
                    }} />
                  ))
                ))}
              </div>
              <div style={{ position: 'relative', textAlign: 'center', padding: '32px' }}>
                <div style={{
                  fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic',
                  fontSize: '72px', fontWeight: 400, color: '#ffffff',
                  lineHeight: '1', marginBottom: '12px',
                }}>
                  5x
                </div>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontSize: '16px',
                  color: 'rgba(255,255,255,0.8)', fontWeight: 500,
                }}>
                  average operational leverage
                </div>
              </div>
            </div>

            {/* Right: numbered list */}
            <div>
              <div className="section-label">What We Actually Enable</div>
              <h2 style={{
                fontFamily: 'var(--font-sans)', fontWeight: 700,
                fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: '1.15',
                letterSpacing: '-0.8px', color: '#111827',
                marginBottom: '40px',
              }}>
                Systems that{' '}
                <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>work for your business.</em>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {ENABLERS.map((e) => (
                  <div key={e.num} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                      background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, color: '#ffffff',
                    }}>
                      {e.num}
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-sans)', fontWeight: 700,
                        fontSize: '16px', color: '#111827',
                        marginBottom: '4px', marginTop: 0,
                      }}>
                        {e.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-sans)', fontSize: '14px',
                        lineHeight: '22px', color: '#6B7280', margin: 0,
                      }}>
                        {e.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Changes in the Business */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div className="section-label">What Changes in the Business</div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15',
            letterSpacing: '-0.8px', color: '#111827',
            marginBottom: '48px', maxWidth: '600px',
          }}>
            What changes when the{' '}
            <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>system works.</em>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {METRICS.map((m) => (
              <div key={m.label} style={{
                background: '#ffffff', borderRadius: '16px', padding: '28px 20px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic',
                  fontSize: '40px', fontWeight: 400, color: '#2563EB',
                  lineHeight: '1.1', marginBottom: '8px',
                }}>
                  {m.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontSize: '13px',
                  lineHeight: '18px', color: '#6B7280', fontWeight: 500,
                }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where This Creates Impact */}
      <section style={{ backgroundColor: '#111111', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            {/* Left */}
            <div>
              <div className="section-label-white">Where This Creates Impact</div>
              <h2 style={{
                fontFamily: 'var(--font-sans)', fontWeight: 700,
                fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15',
                letterSpacing: '-0.8px', color: '#ffffff', marginBottom: '24px',
              }}>
                Operational leverage across{' '}
                <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>every function.</em>
              </h2>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: '28px',
                color: 'rgba(255,255,255,0.6)', marginBottom: '32px',
              }}>
                Intelligent automation doesn&apos;t replace people — it removes the work that prevents people from doing their best work.
              </p>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 28px', borderRadius: '9999px',
                background: '#2563EB', color: '#ffffff',
                fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600,
                textDecoration: 'none',
              }}>
                Explore how it applies to you →
              </Link>
            </div>

            {/* Right: feature cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {IMPACT_FEATURES.map((f) => (
                <div key={f.title} style={{
                  background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '14px', padding: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '2px',
                      background: '#2563EB', marginTop: '6px', flexShrink: 0,
                    }} />
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-sans)', fontWeight: 700,
                        fontSize: '15px', color: '#ffffff',
                        marginBottom: '6px', marginTop: 0,
                      }}>
                        {f.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-sans)', fontSize: '14px',
                        lineHeight: '22px', color: 'rgba(255,255,255,0.5)', margin: 0,
                      }}>
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ backgroundColor: '#0D0D0D', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label-white" style={{ justifyContent: 'center' }}>Technology Foundations</div>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(24px, 2.5vw, 36px)', lineHeight: '1.2',
              letterSpacing: '-0.6px', color: '#ffffff', margin: 0,
            }}>
              Built on Modern{' '}
              <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>Technology</em>
              {' '}Foundations
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '900px', margin: '0 auto' }}>
            {TECH_STACK.map((row, ri) => (
              <div key={ri} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {row.map((tech) => (
                  <div key={tech} style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px', padding: '16px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
                    color: 'rgba(255,255,255,0.7)',
                  }}>
                    {tech}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <CaseStudiesSection />

      {/* FAQ */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 32px' }}>
          <div className="section-label">FAQ</div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: '1.15',
            letterSpacing: '-0.8px', color: '#111827', marginBottom: '48px',
          }}>
            Common questions about{' '}
            <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>automation advisory.</em>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{
                borderTop: '1px solid rgba(0,0,0,0.08)',
                padding: '24px 0',
                ...(i === FAQ_ITEMS.length - 1 ? { borderBottom: '1px solid rgba(0,0,0,0.08)' } : {}),
              }}>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 700,
                  fontSize: '17px', color: '#111827', marginBottom: '12px',
                }}>
                  {item.q}
                </div>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: '15px',
                  lineHeight: '26px', color: '#4B5563', margin: 0,
                }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
