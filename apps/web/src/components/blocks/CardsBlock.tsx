'use client';

import type { CardsBlockData } from '@applore/types';
import Link from 'next/link';
import Image from 'next/image';

interface CardsBlockProps {
  data: CardsBlockData;
}

export default function CardsBlock({ data }: CardsBlockProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Section header */}
        {data.heading && (
          <div className="mb-12">
            <div className="section-label mb-4">
              Featured
            </div>
            <div className="flex items-end justify-between gap-8">
              <h2
                className="max-w-[650px]"
                style={{
                  fontFamily: 'Manrope, system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(32px, 3.5vw, 48px)',
                  lineHeight: '1.17',
                  letterSpacing: '-0.96px',
                  color: '#000000',
                }}
              >
                {data.heading}
              </h2>
            </div>
          </div>
        )}

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.cards.map((card) => (
            <div
              key={card.id}
              className="group rounded-2xl overflow-hidden flex flex-col"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e6e6e6',
                boxShadow: '1px 1px 4px rgba(0,0,0,0.11)',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '2px 4px 4px rgba(0,0,0,0.09)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '1px 1px 4px rgba(0,0,0,0.11)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Card image */}
              {card.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Tag */}
                {card.tag && (
                  <span
                    className="inline-block mb-3 text-xs px-3 py-1 rounded-full"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 500,
                      fontSize: '11px',
                      color: '#6e45ff',
                      backgroundColor: 'rgba(110,69,255,0.08)',
                      letterSpacing: '0.4px',
                    }}
                  >
                    {card.tag}
                  </span>
                )}

                {/* Title */}
                <h3
                  className="mb-2 flex-1"
                  style={{
                    fontFamily: 'Manrope, system-ui, sans-serif',
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '26px',
                    color: '#000000',
                  }}
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-5"
                  style={{
                    fontFamily: 'Manrope, system-ui, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '22px',
                    color: '#4b4c4c',
                  }}
                >
                  {card.description}
                </p>

                {/* Link */}
                {card.link && (
                  <Link
                    href={card.link}
                    className="inline-flex items-center gap-2 mt-auto"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      color: '#6e45ff',
                      textDecoration: 'none',
                    }}
                  >
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
