'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { type ImageModalItem } from './types';

interface ImageModalCarouselContentV2Props {
  images: ImageModalItem[];
  initialIndex: number;
  onIndexChange: (index: number) => void;
}

export function ImageModalCarouselContentV2({
  images,
  initialIndex,
  onIndexChange,
}: ImageModalCarouselContentV2Props) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    onIndexChange(api.selectedScrollSnap());

    api.on('select', () => {
      onIndexChange(api.selectedScrollSnap());
    });
  }, [api, onIndexChange]);

  useEffect(() => {
    if (api) {
      api.scrollTo(initialIndex);
    }
  }, [api, initialIndex]);

  return (
    <div className='flex h-full flex-col justify-center'>
      <Carousel setApi={setApi} className='h-full w-full'>
        <CarouselContent className='h-full'>
          {images.map((imageItem) => (
            <CarouselItem key={imageItem.id} className='h-full'>
              <div className='relative flex h-full min-h-[calc(100dvh-8rem-var(--safe-area-inset-top)-var(--safe-area-inset-bottom))] w-full items-center justify-center'>
                <Image
                  src={imageItem.imageUrl}
                  alt={imageItem.alt || 'Image'}
                  fill
                  className='max-h-[calc(100dvh-8rem-var(--safe-area-inset-top)-var(--safe-area-inset-bottom))] object-contain'
                  sizes='100vw'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
