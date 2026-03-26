import type { CTABlockData } from '@applore/types';
import Link from 'next/link';

interface CTABlockProps {
  data: CTABlockData;
}

export default function CTABlock({ data }: CTABlockProps) {
  const isDark = !data.backgroundColor || data.backgroundColor === '#242424' || data.backgroundColor === '#0a0a1e';

  const bgStyle: React.CSSProperties = isDark
    ? { backgroundColor: '#0a0a1e' }
    : { backgroundColor: data.backgroundColor };

  return (
    <section className="py-20" style={bgStyle}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="max-w-[1216px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
            {/* Left */}
            <div className="flex-1">
              <div
                className="flex items-center gap-2 mb-6"
                style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '14px', fontWeight: 400, color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)' }}
              >
                <span
                  style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #10A4F2, #8B4EFD)' }}
                />
                Get started
              </div>

              <h2
                className="mb-4"
                style={{
                  fontFamily: 'Manrope, system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(28px, 3.5vw, 56px)',
                  lineHeight: '1.08',
                  letterSpacing: '-1.5px',
                  color: isDark ? '#ffffff' : '#000000',
                }}
              >
                {data.heading}
              </h2>

              {data.description && (
                <p
                  className="max-w-[540px]"
                  style={{
                    fontFamily: 'Manrope, system-ui, sans-serif',
                    fontWeight: 400,
                    fontSize: '17px',
                    lineHeight: '28px',
                    color: isDark ? 'rgba(255,255,255,0.55)' : '#4b4c4c',
                  }}
                >
                  {data.description}
                </p>
              )}
            </div>

            {/* Right: gradient CTA button */}
            <div className="shrink-0">
              <Link
                href={data.buttonLink}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base transition-all hover:opacity-88 hover:-translate-y-0.5"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  background: 'linear-gradient(135deg, #10A4F2 0%, #8B4EFD 100%)',
                  color: '#ffffff',
                  border: 'none',
                }}
              >
                {data.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
