import type { CardsBlockData } from '@applore/types';
import Link from 'next/link';
import Image from 'next/image';

interface CardsBlockProps {
  data: CardsBlockData;
}

export default function CardsBlock({ data }: CardsBlockProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {data.heading && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.heading}</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.cards.map((card) => (
            <div key={card.id} className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
              {card.image && (
                <div className="relative h-48">
                  <Image src={card.image} alt={card.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="p-6">
                {card.tag && (
                  <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium mb-3 inline-block">
                    {card.tag}
                  </span>
                )}
                <h3 className="font-semibold text-xl mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{card.description}</p>
                {card.link && (
                  <Link
                    href={card.link}
                    className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
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
