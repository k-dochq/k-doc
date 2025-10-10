'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from 'shared/ui/carousel';
import { type ImageModalItem } from './types';

interface ImageModalCarouselContentProps {
  images: ImageModalItem[];
  initialIndex: number;
  onIndexChange: (index: number) => void;
}

export function ImageModalCarouselContent({
  images,
  initialIndex,
  onIndexChange,
}: ImageModalCarouselContentProps) {
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
          {images.map((imageItem, index) => (
            <CarouselItem key={imageItem.id} className='h-full'>
              <div
                className='flex h-full items-center justify-center'
                style={{
                  minHeight:
                    'calc(100dvh - 8rem - var(--safe-area-inset-top) - var(--safe-area-inset-bottom))',
                }}
              >
                <img
                  src={imageItem.imageUrl}
                  alt={imageItem.alt || `Image ${index + 1}`}
                  className='h-auto w-full object-contain'
                  style={{
                    maxHeight:
                      'calc(100dvh - 8rem - var(--safe-area-inset-top) - var(--safe-area-inset-bottom))',
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
