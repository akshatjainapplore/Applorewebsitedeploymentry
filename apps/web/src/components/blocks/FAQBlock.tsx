'use client';

import type { FAQBlockData } from '@applore/types';
import { useState } from 'react';

interface FAQBlockProps {
  data: FAQBlockData;
}

export default function FAQBlock({ data }: FAQBlockProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {data.heading && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.heading}</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>
        )}
        <div className="space-y-3">
          {data.items.map((item) => (
            <div key={item.id} className="border border-border rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left font-medium hover:bg-muted/50 transition-colors"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                aria-expanded={openId === item.id}
              >
                <span>{item.question}</span>
                <svg
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                    openId === item.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openId === item.id && (
                <div className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
