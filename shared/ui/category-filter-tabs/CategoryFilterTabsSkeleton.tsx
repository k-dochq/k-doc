'use client';

import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';

export function CategoryFilterTabsSkeleton() {
  return (
    <div className='relative w-full'>
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
          containScroll: 'trimSnaps',
        }}
        className='w-full'
      >
        <CarouselContent className=''>
          {Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem
              key={index}
              className={`basis-auto ${index === 0 ? 'pl-[16px]' : 'pl-2'}`}
            >
              <div className='h-8 w-20 animate-pulse rounded-full bg-gray-200' />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
