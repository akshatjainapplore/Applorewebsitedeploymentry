import type { CTABlockData } from '@applore/types';
import Link from 'next/link';

interface CTABlockProps {
  data: CTABlockData;
}

export default function CTABlock({ data }: CTABlockProps) {
  const btnClass = {
    primary: 'bg-white text-primary hover:bg-white/90',
    secondary: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-primary',
  }[data.buttonVariant || 'primary'];

  return (
    <section
      className="py-20"
      style={{ backgroundColor: data.backgroundColor || undefined }}
    >
      <div className={`relative overflow-hidden rounded-2xl mx-4 md:mx-8 lg:mx-16 ${!data.backgroundColor ? 'bg-primary' : ''}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-white rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white rounded-full" />
        </div>
        <div className="relative z-10 text-center py-16 px-8 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{data.heading}</h2>
          {data.description && (
            <p className="text-lg text-white/90 mb-8">{data.description}</p>
          )}
          <Link
            href={data.buttonLink}
            className={`inline-flex items-center justify-center h-12 px-8 rounded-full font-semibold text-base transition-all shadow-lg hover:-translate-y-0.5 ${btnClass}`}
          >
            {data.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
