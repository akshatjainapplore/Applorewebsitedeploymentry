import type { TestimonialsBlockData } from '@applore/types';
import Image from 'next/image';

interface TestimonialsBlockProps {
  data: TestimonialsBlockData;
}

export default function TestimonialsBlock({ data }: TestimonialsBlockProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {data.heading && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.heading}</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {data.testimonials.map((t) => (
            <div key={t.id} className="bg-card rounded-xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
              {/* Stars */}
              {t.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < t.rating! ? 'text-yellow-400' : 'text-muted'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              <blockquote className="text-foreground leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                {t.avatar ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                    {t.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm">{t.author}</p>
                  {(t.role || t.company) && (
                    <p className="text-xs text-muted-foreground">
                      {[t.role, t.company].filter(Boolean).join(' at ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
