import type { GridBlockData } from '@applore/types';
import Link from 'next/link';
import Image from 'next/image';

interface GridBlockProps {
  data: GridBlockData;
}

export default function GridBlock({ data }: GridBlockProps) {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[data.columns as 2 | 3 | 4] || 'grid-cols-1 sm:grid-cols-3';

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className={`grid ${colClass} gap-6`}>
          {data.items.map((item) => (
            <div key={item.id} className="group">
              {item.link ? (
                <Link href={item.link}>
                  <GridItem item={item} />
                </Link>
              ) : (
                <GridItem item={item} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GridItem({ item }: { item: GridBlockData['items'][0] }) {
  return (
    <div className="rounded-lg overflow-hidden border border-border bg-card hover:shadow-md transition-shadow">
      {item.image && (
        <div className="relative h-48">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-muted-foreground">{item.description}</p>
        )}
      </div>
    </div>
  );
}
