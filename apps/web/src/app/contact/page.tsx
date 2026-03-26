import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from './ContactForm';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Start the conversation.',
};

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return (
    <>
      <PageHero label="Contact Us" title="Let's start the" titleItalic="conversation." />
      <section style={{ backgroundColor: '#ffffff', padding: '80px 0' }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 32px',
          display: 'grid', gridTemplateColumns: '1fr 400px', gap: '64px', alignItems: 'start',
        }}>
          <ContactForm />
          {/* Sidebar */}
          <div>
            <div style={{
              background: '#F9FAFB', borderRadius: '20px', padding: '32px',
              border: '1px solid rgba(0,0,0,0.06)',
            }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '18px', color: '#111827', marginBottom: '16px', marginTop: 0 }}>
                Our Office
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: '24px', color: '#4B5563', margin: 0 }}>
                803, Pegasus Tower, Block A<br />
                Sector 68, Noida<br />
                Uttar Pradesh – 201307<br />
                India
              </p>
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <a href="mailto:hello@applore.in" style={{
                  fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
                  color: '#2563EB', textDecoration: 'none',
                }}>
                  hello@applore.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
