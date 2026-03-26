import type { HeroBlockData } from '@applore/types';
import Link from 'next/link';
import Image from 'next/image';

interface HeroBlockProps {
  data: HeroBlockData;
}

// Ticker items from Figma design
const TICKER_ITEMS = [
  'Technology Strategy',
  'Platform Architecture',
  'Operating Model Design',
  'Data & AI Governance',
  'Digital Transformation',
  'Board Advisory',
  'Vendor Selection',
  'Technology Due Diligence',
  'Organisational Change',
  'Product Strategy',
  'Cloud Migration',
  'Enterprise Architecture',
];

export default function HeroBlock({ data }: HeroBlockProps) {
  // Duplicate for seamless loop
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background image if provided */}
      {data.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          {data.overlay && (
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: data.overlayOpacity ?? 0.5 }}
            />
          )}
        </div>
      )}

      {/* Hero content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 pt-20 pb-0">
        <div className="max-w-[1087px]">
          {/* Subheading/eyebrow */}
          {data.subheading && (
            <div className="section-label mb-6">
              {data.subheading}
            </div>
          )}

          {/* Main heading */}
          <h1
            className="mb-6 leading-tight"
            style={{
              fontFamily: 'Manrope, system-ui, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(40px, 5vw, 64px)',
              lineHeight: '1.1',
              letterSpacing: '-1.92px',
              color: '#000000',
            }}
          >
            {data.heading}
          </h1>

          {/* Description */}
          {data.description && (
            <p
              className="mb-10 max-w-[876px]"
              style={{
                fontFamily: 'Manrope, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '28px',
                color: '#000000',
              }}
            >
              {data.description}
            </p>
          )}

          {/* CTA Buttons */}
          {(data.ctaText || data.secondaryCtaText) && (
            <div className="flex flex-wrap gap-4 mb-16">
              {data.ctaText && data.ctaLink && (
                <Link href={data.ctaLink} className="btn-primary">
                  {data.ctaText}
                </Link>
              )}
              {data.secondaryCtaText && data.secondaryCtaLink && (
                <Link href={data.secondaryCtaLink} className="btn-secondary">
                  {data.secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Purple ticker bar - from Figma: #6e45ff background, JetBrains Mono 300 10.4px */}
      <div
        className="w-full overflow-hidden py-[13px]"
        style={{ backgroundColor: '#6e45ff' }}
      >
        <div className="ticker-inner">
          {tickerItems.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-4"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 300,
                fontSize: '10.4px',
                lineHeight: '16.6px',
                color: 'rgba(248,246,241,0.7)',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
              <span
                style={{
                  display: 'inline-block',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(248,246,241,0.4)',
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
