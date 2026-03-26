import type { GridBlockData } from '@applore/types';
import Link from 'next/link';
import Image from 'next/image';

interface GridBlockProps {
  data: GridBlockData & { heading?: string; subheading?: string };
}

export default function GridBlock({ data }: GridBlockProps) {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[data.columns as 2 | 3 | 4] || 'grid-cols-1 sm:grid-cols-3';

  return (
    <section className="py-20" style={{ backgroundColor: '#f8f6f1' }}>
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Section header */}
        {(data.heading || data.subheading) && (
          <div className="mb-14">
            <div className="section-label mb-4">What we do</div>
            {data.heading && (
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
            )}
            {data.subheading && (
              <p
                className="mt-4 max-w-[600px]"
                style={{
                  fontFamily: 'Manrope, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: '#4b4c4c',
                }}
              >
                {data.subheading}
              </p>
            )}
          </div>
        )}

        <div className={`grid ${colClass} gap-6`}>
          {data.items.map((item) => (
            <div key={item.id}>
              {item.link ? (
                <Link href={item.link} className="block h-full">
                  <GridCard item={item} />
                </Link>
              ) : (
                <GridCard item={item} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GridCard({ item }: { item: GridBlockData['items'][0] & { icon?: string } }) {
  return (
    <div
      className="rounded-2xl p-8 h-full flex flex-col"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '1px 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Icon or image */}
      {item.image ? (
        <div className="relative h-40 rounded-xl overflow-hidden mb-6">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>
      ) : (
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: 'rgba(110,69,255,0.1)' }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#6e45ff',
            }}
          />
        </div>
      )}

      <h3
        className="mb-3"
        style={{
          fontFamily: 'Manrope, system-ui, sans-serif',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '28px',
          color: '#000000',
        }}
      >
        {item.title}
      </h3>

      {item.description && (
        <p
          className="flex-1"
          style={{
            fontFamily: 'Manrope, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: '24px',
            color: '#4b4c4c',
          }}
        >
          {item.description}
        </p>
      )}

      {item.link && (
        <div className="mt-6 flex items-center gap-2" style={{ color: '#6e45ff' }}>
          <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px', fontWeight: 500 }}>
            Learn more
          </span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
}
