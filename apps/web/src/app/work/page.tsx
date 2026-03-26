import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Case studies and client engagements across technology strategy, platform architecture, and AI.',
};

export const dynamic = 'force-dynamic';

const CASES = [
  {
    id: 'c1',
    company: 'Mars Petcare',
    title: 'Mars Petcare reimagines digital petcare experiences with PawEasy & Pawra',
    metrics: [
      { value: '95%', label: 'Digital adoption' },
      { value: '48%', label: 'Platform engagement improvement' },
      { value: '30%', label: 'Automated payments' },
      { value: '60%', label: 'Workflows automated' },
    ],
    tags: ['Platform Architecture', 'AI Automation'],
    bg: 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
  },
  {
    id: 'c2',
    company: 'DeHaat',
    title: 'Agri-tech platform rebuilt to handle 10x transaction volume during peak harvest',
    metrics: [
      { value: '95%', label: 'System uptime after re-architecture' },
      { value: '10x', label: 'Transaction volume capacity' },
    ],
    tags: ['Platform Architecture', 'Scale'],
    bg: 'linear-gradient(135deg, #0F766E 0%, #1E40AF 100%)',
  },
  {
    id: 'c3',
    company: 'Kalyan Jewellers',
    title: 'Vendor portfolio rationalised from 34 systems to 19 — saving ₹12 Cr annually',
    metrics: [
      { value: '48%', label: 'Reduction in technology spend' },
      { value: '₹12 Cr', label: 'Annual savings' },
    ],
    tags: ['Cost Optimisation', 'Vendor Strategy'],
    bg: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
  },
  {
    id: 'c4',
    company: 'CirclePE',
    title: 'Monolith-to-modular architecture transformation enables independent team shipping',
    metrics: [
      { value: '30%', label: 'Faster feature delivery post-migration' },
    ],
    tags: ['Modernisation', 'Engineering'],
    bg: 'linear-gradient(135deg, #065F46 0%, #1E40AF 100%)',
  },
  {
    id: 'c5',
    company: 'IndiaMart',
    title: 'Saved 18 months of misdirected development by identifying the wrong technology bet',
    metrics: [
      { value: '60%', label: 'Scope reduction before build began' },
    ],
    tags: ['Strategy', 'Risk Mitigation'],
    bg: 'linear-gradient(135deg, #B45309 0%, #7C3AED 100%)',
  },
  {
    id: 'c6',
    company: 'JK Tyre',
    title: 'Unified data layer across 7 business units replaces 200+ manual reports',
    metrics: [
      { value: '3x', label: 'Data pipeline throughput' },
      { value: '200+', label: 'Manual reports replaced' },
    ],
    tags: ['Data & AI', 'Integration'],
    bg: 'linear-gradient(135deg, #065F46 0%, #1E40AF 100%)',
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Our Work"
        title="Real Business Impact defines"
        titleItalic="Successful Technology."
        subtitle="We measure success through measurable operational improvements — not features shipped, hours billed, or systems launched."
      />

      <section style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {CASES.map((c) => (
              <div key={c.id} style={{
                borderRadius: '20px', overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                display: 'flex', flexDirection: 'column',
              }}>
                {/* Gradient top */}
                <div style={{ background: c.bg, padding: '32px' }}>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700,
                    color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase',
                    letterSpacing: '0.1em', marginBottom: '12px',
                  }}>
                    {c.company}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 700,
                    fontSize: '18px', lineHeight: '1.4', color: '#ffffff',
                    margin: '0 0 24px',
                  }}>
                    {c.title}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {c.metrics.map((m) => (
                      <div key={m.label}>
                        <div style={{
                          fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic',
                          fontSize: '32px', fontWeight: 400, color: '#ffffff',
                          lineHeight: '1.1', marginBottom: '4px',
                        }}>
                          {m.value}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-sans)', fontSize: '12px',
                          color: 'rgba(255,255,255,0.7)', lineHeight: '1.4',
                        }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* White bottom */}
                <div style={{ background: '#ffffff', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {c.tags.map((tag) => (
                      <span key={tag} style={{
                        padding: '4px 10px', borderRadius: '9999px',
                        background: '#EFF6FF', color: '#2563EB',
                        fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/work/${c.id}`} style={{
                    fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600,
                    color: '#2563EB', textDecoration: 'none', whiteSpace: 'nowrap', marginLeft: '12px',
                  }}>
                    Read Case ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
