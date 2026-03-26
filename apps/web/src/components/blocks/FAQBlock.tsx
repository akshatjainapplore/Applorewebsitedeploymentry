'use client';

import type { FAQBlockData } from '@applore/types';
import { useState } from 'react';

interface FAQBlockProps {
  data: FAQBlockData;
}

export default function FAQBlock({ data }: FAQBlockProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="max-w-[1320px] mx-auto">
          {/* Header */}
          {data.heading && (
            <div className="mb-12">
              <div className="section-label mb-4">
                FAQ
              </div>
              <h2
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
          )}

          {/* FAQ items */}
          <div className="space-y-0">
            {data.items.map((item, index) => (
              <div
                key={item.id}
                className="border-t"
                style={{ borderColor: '#e6e6e6' }}
              >
                <button
                  className="w-full flex items-center justify-between py-6 text-left transition-colors group"
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  aria-expanded={openId === item.id}
                >
                  <div className="flex items-center gap-6">
                    {/* Index number */}
                    <span
                      style={{
                        fontFamily: 'Manrope, system-ui, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: 'rgba(0,0,0,0.4)',
                        minWidth: '24px',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Question */}
                    <span
                      style={{
                        fontFamily: 'Manrope, system-ui, sans-serif',
                        fontWeight: 500,
                        fontSize: '18px',
                        lineHeight: '28px',
                        color: '#000000',
                      }}
                    >
                      {item.question}
                    </span>
                  </div>

                  {/* Toggle icon */}
                  <div
                    className="shrink-0 ml-8 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: openId === item.id ? '#6e45ff' : '#f0ede5',
                    }}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${openId === item.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke={openId === item.id ? '#ffffff' : '#000000'}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                {openId === item.id && (
                  <div
                    className="pb-6 pl-[54px] pr-16"
                    style={{
                      fontFamily: 'Manrope, system-ui, sans-serif',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '26px',
                      color: '#4b4c4c',
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ))}

            {/* Bottom border */}
            <div className="border-t" style={{ borderColor: '#e6e6e6' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
