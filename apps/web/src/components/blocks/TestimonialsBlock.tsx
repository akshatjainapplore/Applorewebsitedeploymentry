import type { TestimonialsBlockData } from '@applore/types';
import Image from 'next/image';

interface TestimonialsBlockProps {
  data: TestimonialsBlockData;
}

export default function TestimonialsBlock({ data }: TestimonialsBlockProps) {
  return (
    <section className="py-20" style={{ backgroundColor: '#0a0a1e' }}>
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Section header */}
        {data.heading && (
          <div className="mb-14 flex items-end justify-between">
            <div className="max-w-[985px]">
              {/* Section label */}
              <div
                className="flex items-center gap-2 mb-4"
                style={{
                  fontFamily: 'Manrope, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'rgba(248,246,241,0.6)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10A4F2, #8B4EFD)',
                  }}
                />
                What our clients say
              </div>
              <h2
                style={{
                  fontFamily: 'Manrope, system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(32px, 3.5vw, 48px)',
                  lineHeight: '1.17',
                  letterSpacing: '-0.96px',
                  color: '#ffffff',
                }}
              >
                {data.heading}
              </h2>
            </div>
          </div>
        )}

        {/* Testimonials grid — horizontal cards matching Figma (Background fills:#242424, card width ~400px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between p-8 rounded-2xl"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                minHeight: '280px',
              }}
            >
              {/* Stars */}
              {t.rating && (
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      fill={i < t.rating! ? '#ffcd05' : 'rgba(248,246,241,0.2)'}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}

              {/* Quote */}
              <blockquote
                className="flex-1 mb-8"
                style={{
                  fontFamily: 'Manrope, system-ui, sans-serif',
                  fontWeight: 300,
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: '#ffffff',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                {t.avatar ? (
                  <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden shrink-0">
                    <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-base font-bold"
                    style={{ backgroundColor: '#6e45ff', color: '#ffffff' }}
                  >
                    {t.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p
                    style={{
                      fontFamily: 'Manrope, system-ui, sans-serif',
                      fontWeight: 300,
                      fontSize: '20px',
                      lineHeight: '28px',
                      color: '#d5f2f2',
                    }}
                  >
                    {t.author}
                  </p>
                  {(t.role || t.company) && (
                    <p
                      style={{
                        fontFamily: 'Figtree, system-ui, sans-serif',
                        fontWeight: 300,
                        fontSize: '15px',
                        lineHeight: '22px',
                        color: '#ffffff',
                      }}
                    >
                      {[t.role, t.company].filter(Boolean).join(' | ')}
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
