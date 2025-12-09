'use client';

import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';

export function LiveReviewCarouselV2Skeleton() {
  return (
    <div className='w-full'>
      <Carousel
        opts={{
          align: 'start',
          containScroll: 'trimSnaps',
        }}
        className='w-full'
      >
        <CarouselContent className=''>
          {Array.from({ length: 2 }).map((_, index) => {
            const isFirst = index === 0;
            return (
              <CarouselItem
                key={index}
                className={`basis-[312px] ${isFirst ? 'pl-[16px]' : 'pl-4'}`}
              >
                <div className='flex w-full flex-col items-start overflow-clip rounded-xl bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]'>
                  {/* 이미지 스켈레톤 */}
                  <div className='h-[190px] w-full animate-pulse bg-gray-200' />

                  {/* 텍스트 영역 스켈레톤 */}
                  <div className='flex w-full shrink-0 flex-col gap-0.5 px-5 py-4'>
                    {/* 지역/병원명 스켈레톤 */}
                    <div className='flex w-full shrink-0 items-center gap-1'>
                      <div className='h-4 w-20 animate-pulse rounded bg-gray-200' />
                      <div className='size-[2px] rounded-full bg-gray-200' />
                      <div className='h-4 w-24 animate-pulse rounded bg-gray-200' />
                    </div>

                    {/* 내용 스켈레톤 */}
                    <div className='h-6 w-full animate-pulse rounded bg-gray-200' />
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
