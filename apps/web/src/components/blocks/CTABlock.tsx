import type { CTABlockData } from '@applore/types';
import Link from 'next/link';

interface CTABlockProps {
  data: CTABlockData;
}

export default function CTABlock({ data }: CTABlockProps) {
  // Dark background CTA from Figma (Frame 1618874736 fills:#242424)
  const isDark = !data.backgroundColor || data.backgroundColor === '#242424';

  const bgStyle = isDark
    ? { backgroundColor: '#242424' }
    : { backgroundColor: data.backgroundColor };

  const headingColor = isDark ? '#ffffff' : '#000000';
  const descColor = isDark ? 'rgba(248,246,241,0.8)' : '#1e1e1e';

  // Button style based on variant and background
  const getButtonStyle = () => {
    const variant = data.buttonVariant || 'primary';
    if (variant === 'primary') {
      return {
        backgroundColor: '#6e45ff',
        color: '#ffffff',
        border: 'none',
      };
    }
    if (variant === 'outline') {
      return {
        backgroundColor: 'transparent',
        color: isDark ? '#ffffff' : '#000000',
        border: `1.5px solid ${isDark ? '#ffffff' : '#000000'}`,
      };
    }
    return {
      backgroundColor: isDark ? '#ffffff' : '#000000',
      color: isDark ? '#000000' : '#ffffff',
      border: 'none',
    };
  };

  const btnStyle = getButtonStyle();

  return (
    <section className="py-20" style={bgStyle}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="max-w-[1216px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
            {/* Left: heading + description */}
            <div className="flex-1">
              {/* Section label */}
              <div
                className="flex items-center gap-2 mb-6"
                style={{
                  fontFamily: 'Manrope, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: isDark ? 'rgba(248,246,241,0.6)' : '#000000',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#6e45ff',
                  }}
                />
                Get started
              </div>

              <h2
                className="mb-4"
                style={{
                  fontFamily: 'Manrope, system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(32px, 4vw, 80px)',
                  lineHeight: '1.05',
                  letterSpacing: '-2.4px',
                  color: headingColor,
                }}
              >
                {data.heading}
              </h2>

              {data.description && (
                <p
                  className="max-w-[540px]"
                  style={{
                    fontFamily: 'Manrope, system-ui, sans-serif',
                    fontWeight: 300,
                    fontSize: '18px',
                    lineHeight: '28px',
                    color: descColor,
                  }}
                >
                  {data.description}
                </p>
              )}
            </div>

            {/* Right: CTA button */}
            <div className="shrink-0">
              <Link
                href={data.buttonLink}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  borderRadius: '100px',
                  ...btnStyle,
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
