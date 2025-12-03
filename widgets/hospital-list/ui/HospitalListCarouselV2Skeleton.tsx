'use client';

import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';
import { HospitalCardV2Skeleton } from 'entities/hospital/ui/HospitalCardV2Skeleton';

export function HospitalListCarouselV2Skeleton() {
  return (
    <div className='w-full'>
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
          containScroll: 'trimSnaps',
        }}
        className='w-full'
      >
        <CarouselContent className=''>
          {Array.from({ length: 4 }).map((_, index) => {
            const isFirst = index === 0;
            return (
              <CarouselItem
                key={index}
                className={`basis-[150px] ${isFirst ? 'pl-[5px]' : 'pl-[16px]'}`}
              >
                <HospitalCardV2Skeleton />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
