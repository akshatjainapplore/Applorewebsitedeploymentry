import type { HeroBlockData } from '@applore/types';
import Link from 'next/link';
import Image from 'next/image';

interface HeroBlockProps {
  data: HeroBlockData;
}

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
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #10A4F2 0%, #8B4EFD 100%)' }}>
      {/* Subtle radial glow overlays */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)',
        }}
      />

      {/* Optional background image with overlay */}
      {data.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image src={data.backgroundImage} alt="Hero background" fill className="object-cover mix-blend-overlay opacity-20" priority />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 pt-20 pb-20">
        <div className="max-w-[900px]">
          {/* Eyebrow */}
          {data.subheading && (
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.25)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.02em',
              }}
            >
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#A9FFF8' }} />
              {data.subheading}
            </div>
          )}

          {/* Main heading */}
          <h1
            className="mb-6"
            style={{
              fontFamily: 'Manrope, system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(48px, 6vw, 80px)',
              lineHeight: '1.05',
              letterSpacing: '-2.4px',
              color: '#ffffff',
              whiteSpace: 'pre-line',
            }}
          >
            {data.heading}
          </h1>

          {/* Description */}
          {data.description && (
            <p
              className="mb-10 max-w-[640px]"
              style={{
                fontFamily: 'Manrope, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '28px',
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              {data.description}
            </p>
          )}

          {/* CTA Buttons */}
          {(data.ctaText || data.secondaryCtaText) && (
            <div className="flex flex-wrap gap-4">
              {data.ctaText && data.ctaLink && (
                <Link
                  href={data.ctaLink}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-base transition-all hover:opacity-90 hover:-translate-y-0.5"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 600,
                    fontSize: '16px',
                    backgroundColor: '#ffffff',
                    color: '#5E6EF9',
                  }}
                >
                  {data.ctaText}
                </Link>
              )}
              {data.secondaryCtaText && data.secondaryCtaLink && (
                <Link
                  href={data.secondaryCtaLink}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-base transition-all hover:bg-white/20"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 600,
                    fontSize: '16px',
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    color: '#ffffff',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {data.secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Wave divider — white curves into the next section */}
      <div className="relative z-10" style={{ marginBottom: '-2px' }}>
        <svg
          viewBox="0 0 1440 72"
          fill="none"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '72px' }}
        >
          <path
            d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Ticker bar — sits below wave logically but above next section */}
      <div
        className="relative z-20 w-full overflow-hidden py-[13px]"
        style={{ backgroundColor: '#6e45ff', marginTop: '-72px' }}
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
              <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(248,246,241,0.4)' }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
