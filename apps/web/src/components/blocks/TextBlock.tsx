import type { TextBlockData } from '@applore/types';

interface TextBlockProps {
  data: TextBlockData;
}

export default function TextBlock({ data }: TextBlockProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[data.align || 'left'];

  return (
    <section className="py-16">
      <div className={`container mx-auto px-4 max-w-4xl ${alignClass}`}>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </section>
  );
}
