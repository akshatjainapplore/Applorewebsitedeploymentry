import type { TextBlockData } from '@applore/types';

interface TextBlockProps {
  data: TextBlockData;
}

export default function TextBlock({ data }: TextBlockProps) {
  const alignMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  const alignClass = alignMap[data.align || 'left'];

  return (
    <section className="py-16 bg-white">
      <div className={`max-w-[1440px] mx-auto px-8`}>
        <div className={`max-w-4xl ${data.align === 'center' ? 'mx-auto' : ''} ${alignClass}`}>
          <div
            className="prose"
            style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>
    </section>
  );
}
