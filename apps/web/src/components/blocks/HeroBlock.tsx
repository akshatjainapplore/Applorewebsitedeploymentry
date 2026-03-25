import type { HeroBlockData } from '@applore/types';
import Link from 'next/link';
import Image from 'next/image';

interface HeroBlockProps {
  data: HeroBlockData;
}

export default function HeroBlock({ data }: HeroBlockProps) {
  const align = data.align || 'center';
  const alignClass = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50 overflow-hidden">
      {/* Background image */}
      {data.backgroundImage && (
        <div className="absolute inset-0">
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

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className={`flex flex-col ${alignClass} max-w-4xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {data.subheading && (
            <span className="text-sm md:text-base font-semibold uppercase tracking-widest text-white/80 mb-4">
              {data.subheading}
            </span>
          )}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {data.heading}
          </h1>

          {data.description && (
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
              {data.description}
            </p>
          )}

          {(data.ctaText || data.secondaryCtaText) && (
            <div className="flex flex-wrap gap-4 justify-start">
              {data.ctaText && data.ctaLink && (
                <Link
                  href={data.ctaLink}
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-primary font-semibold text-base hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  {data.ctaText}
                </Link>
              )}
              {data.secondaryCtaText && data.secondaryCtaLink && (
                <Link
                  href={data.secondaryCtaLink}
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-white text-white font-semibold text-base hover:bg-white hover:text-primary transition-all"
                >
                  {data.secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
