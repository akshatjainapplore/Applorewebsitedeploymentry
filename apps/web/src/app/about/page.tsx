import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'We partner with organizations to design intelligent systems that enable faster decisions and more efficient operations.',
};

export const dynamic = 'force-dynamic';

const PRINCIPLES = [
  {
    title: 'Our Vision',
    desc: 'A world where organizations approach technology with strategic rigor — where decisions are made with clarity, systems are built to last, and technology serves the business.',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
  },
  {
    title: 'Our Mission',
    desc: 'To be the trusted advisory partner for complex technology decisions — combining strategic thinking, system design, and execution oversight to deliver outcomes.',
    gradient: 'linear-gradient(135deg, #0F766E 0%, #1E40AF 100%)',
  },
  {
    title: 'Our Values',
    desc: 'We prioritize clarity before technology, focus on measurable outcomes, and build relationships grounded in honest counsel — not vendor interests.',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
  },
];

const PARTNERS = ['Snappr', 'Kauth', 'CirclePE', 'Covey'];

const TIMELINE = [
  { year: '2017', title: 'Building the Applore Foundation', desc: 'Applore is founded in Noida, India with a focus on technology advisory for growth-stage companies.' },
  { year: '2018–2019', title: 'First Enterprise Partnerships', desc: 'Secured first enterprise clients across e-commerce and fintech sectors.' },
  { year: '2020', title: 'Platform Architecture Practice', desc: 'Launched dedicated platform architecture advisory, growing to 20+ clients.' },
  { year: '2021', title: 'Data & AI Practice', desc: 'Established Data & AI advisory practice, onboarding first AI-transformation clients.' },
  { year: '2022', title: 'Regional Expansion', desc: 'Extended operations to serve clients in Southeast Asia and Middle East.' },
  { year: '2023', title: '100+ Client Milestone', desc: 'Crossed 100 client engagements with 94% retention rate.' },
  { year: '2024', title: 'Global Advisory Network', desc: 'Expanded global presence with clients in US, EU and India.' },
  { year: 'Present', title: 'Next Chapter', desc: 'Continuing to grow advisory capabilities with focus on AI-enabled enterprise transformation.' },
];

const STATS = [
  { value: '1000+', label: 'Organizations Served' },
  { value: '9+', label: 'Years Advisory Experience' },
  { value: '150+', label: 'Systems Designed & Delivered' },
  { value: '40%', label: 'Average Scope Reduction' },
];

const DIFFERENTIATORS = [
  { title: 'Clarity Before Technology', desc: 'We diagnose before we prescribe. Every engagement starts with understanding the real operational challenge.' },
  { title: 'Strategic Technology Advisory', desc: 'We bring senior advisory bandwidth to decisions that shape how your organization uses technology.' },
  { title: 'Systems Thinking', desc: 'We design for interconnection, not silos — ensuring your systems work together as an integrated whole.' },
  { title: 'Outcome-Driven Approach', desc: 'Every recommendation is tied to a business outcome. We measure success by operational improvement.' },
  { title: 'AI-Enabled Systems', desc: 'We identify where AI creates genuine leverage — not where it\'s fashionable.' },
  { title: 'Built for Evolution', desc: 'Systems designed with Applore are built to adapt — not to require a rebuild every 18 months.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        label="Who we are"
        title="We partner with organizations to design intelligent systems that enable faster"
        titleItalic="decisions and more efficient operations."
      />

      {/* Principles */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div className="section-label">The Principles That Guide Us</div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', lineHeight: '30px', color: '#4B5563', maxWidth: '700px', marginBottom: '0' }}>
            We combine strategic thinking, systems architecture, and disciplined execution to turn complex technology decisions into scalable, high-performing systems.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '48px' }}>
            {PRINCIPLES.map((p) => (
              <div key={p.title} style={{ background: p.gradient, borderRadius: '20px', padding: '36px', color: '#ffffff' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '22px', color: '#ffffff', marginBottom: '16px', marginTop: 0 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: '26px', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section style={{ backgroundColor: '#ffffff', padding: '64px 0', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '24px', color: '#111827', marginBottom: '32px' }}>
            100+ Businesses Trust Us
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {PARTNERS.map((name) => (
              <div key={name} style={{
                background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '9999px', padding: '12px 24px',
                fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700,
                color: '#4B5563',
              }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div className="section-label">Our Journey of Innovation and Growth</div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15', letterSpacing: '-0.8px', color: '#111827', marginBottom: '64px', maxWidth: '640px' }}>
            Building something lasting takes time, iteration, and client trust.
          </h2>

          {/* Timeline container */}
          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            {/* Center vertical line */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: '2px', background: 'linear-gradient(180deg, #2563EB 0%, #7C3AED 100%)',
              transform: 'translateX(-50%)',
            }} />

            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={item.year} style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  marginBottom: '40px',
                  position: 'relative',
                }}>
                  {/* Dot on center line */}
                  <div style={{
                    position: 'absolute', left: '50%', top: '24px',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: '#2563EB', border: '3px solid #ffffff',
                    boxShadow: '0 0 0 3px rgba(37,99,235,0.2)',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                  }} />

                  {/* Content card */}
                  <div style={{
                    width: '44%',
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    marginLeft: isLeft ? '0' : undefined,
                    marginRight: isLeft ? undefined : '0',
                  }}>
                    <div style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700,
                      padding: '4px 12px', borderRadius: '9999px', marginBottom: '12px',
                    }}>
                      {item.year}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '16px', color: '#111827', marginBottom: '8px', marginTop: 0 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: '22px', color: '#4B5563', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section style={{ backgroundColor: '#F9FAFB', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div className="section-label">Our Impact</div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15', letterSpacing: '-0.8px', color: '#111827', marginBottom: '48px' }}>
            Numbers that{' '}
            <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>speak for themselves.</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {STATS.map((s) => (
              <div key={s.label} style={{
                background: '#ffffff', borderRadius: '16px', padding: '32px',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400,
                  fontSize: '52px', lineHeight: '1.1', color: '#2563EB', marginBottom: '8px',
                }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#6B7280' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.15', letterSpacing: '-0.8px', color: '#111827', marginBottom: '40px' }}>
            What Sets Applore Apart
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {DIFFERENTIATORS.map((d) => (
              <div key={d.title} style={{
                background: '#ffffff',
                border: '1px solid rgba(37,99,235,0.1)',
                borderRadius: '16px', padding: '28px',
                transition: 'box-shadow 0.2s',
              }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '17px', color: '#111827', marginBottom: '10px', marginTop: 0 }}>
                  {d.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: '24px', color: '#4B5563', margin: 0 }}>
                  {d.desc}
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
