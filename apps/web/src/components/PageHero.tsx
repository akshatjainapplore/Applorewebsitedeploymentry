import Link from 'next/link';

interface PageHeroProps {
  label?: string;
  title: string;
  titleItalic?: string;
  subtitle?: string;
  description?: string; // alias for subtitle
  ctaText?: string;
  ctaHref?: string;
}

export default function PageHero({ label, title, titleItalic, subtitle, description, ctaText, ctaHref }: PageHeroProps) {
  const body = subtitle || description;
  return (
    <section style={{
      background: 'linear-gradient(135deg, #EEF2FF 0%, #E8E4F8 50%, #FCE8F3 100%)',
      padding: '120px 32px 80px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {label && <div className="section-label" style={{ justifyContent: 'center' }}>{label}</div>}
        <h1 style={{
          fontFamily: 'var(--font-sans)', fontWeight: 700,
          fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: '1.15',
          letterSpacing: '-1px', color: '#111827', margin: '0 0 24px',
        }}>
          {title}{titleItalic && <>{' '}<em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontWeight: 400 }}>{titleItalic}</em></>}
        </h1>
        {body && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', lineHeight: '30px', color: '#4B5563', marginBottom: '32px' }}>
            {body}
          </p>
        )}
        {ctaText && ctaHref && (
          <Link href={ctaHref} className="btn-primary">{ctaText}</Link>
        )}
      </div>
    </section>
  );
}
