import type { ImageBlockData } from '@applore/types';
import Image from 'next/image';

interface ImageBlockProps {
  data: ImageBlockData;
}

export default function ImageBlock({ data }: ImageBlockProps) {
  return (
    <section className="py-8">
      <div className={data.fullWidth ? 'w-full' : 'container mx-auto px-4'}>
        <figure className={data.fullWidth ? 'w-full' : 'max-w-4xl mx-auto'}>
          <div className="relative w-full" style={{ aspectRatio: data.width && data.height ? `${data.width}/${data.height}` : '16/9' }}>
            <Image
              src={data.src}
              alt={data.alt}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          {data.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-3">
              {data.caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
