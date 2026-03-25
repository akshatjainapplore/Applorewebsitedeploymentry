import type { ContentBlock } from '@applore/types';
import HeroBlock from './HeroBlock';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import CTABlock from './CTABlock';
import GridBlock from './GridBlock';
import CardsBlock from './CardsBlock';
import TestimonialsBlock from './TestimonialsBlock';
import FAQBlock from './FAQBlock';

interface BlockRendererProps {
  blocks: ContentBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div>
      {sorted.map((block) => {
        switch (block.type) {
          case 'hero':
            return <HeroBlock key={block.id} data={block.data as Parameters<typeof HeroBlock>[0]['data']} />;
          case 'text':
            return <TextBlock key={block.id} data={block.data as Parameters<typeof TextBlock>[0]['data']} />;
          case 'image':
            return <ImageBlock key={block.id} data={block.data as Parameters<typeof ImageBlock>[0]['data']} />;
          case 'cta':
            return <CTABlock key={block.id} data={block.data as Parameters<typeof CTABlock>[0]['data']} />;
          case 'grid':
            return <GridBlock key={block.id} data={block.data as Parameters<typeof GridBlock>[0]['data']} />;
          case 'cards':
            return <CardsBlock key={block.id} data={block.data as Parameters<typeof CardsBlock>[0]['data']} />;
          case 'testimonials':
            return <TestimonialsBlock key={block.id} data={block.data as Parameters<typeof TestimonialsBlock>[0]['data']} />;
          case 'faq':
            return <FAQBlock key={block.id} data={block.data as Parameters<typeof FAQBlock>[0]['data']} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
