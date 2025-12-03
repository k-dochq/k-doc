'use client';

import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';

export function PopularReviewsCarouselV2Skeleton() {
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
              <CarouselItem key={index} className={`basis-[286px] ${isFirst ? '' : 'pl-4'}`}>
                <div className='flex w-full flex-col items-start overflow-clip rounded-xl bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]'>
                  {/* Before/After 이미지 스켈레톤 */}
                  <div className='flex gap-0.5'>
                    <div className='size-[142px] animate-pulse bg-gray-200' />
                    <div className='size-[142px] animate-pulse bg-gray-200' />
                  </div>

                  {/* 텍스트 영역 스켈레톤 */}
                  <div className='flex w-full flex-col gap-4 border-t border-neutral-200 p-4'>
                    {/* 사용자 정보 스켈레톤 */}
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex items-center gap-[6px]'>
                        <div className='size-5 animate-pulse rounded-full bg-gray-200' />
                        <div className='h-5 w-16 animate-pulse rounded bg-gray-200' />
                      </div>
                      <div className='flex items-center gap-1'>
                        <div className='size-4 animate-pulse rounded bg-gray-200' />
                        <div className='h-[19px] w-8 animate-pulse rounded bg-gray-200' />
                      </div>
                    </div>

                    {/* 구분선 */}
                    <div className='h-0 w-full'>
                      <div className='h-px w-full bg-neutral-200' />
                    </div>

                    {/* 지역/병원명 및 내용 스켈레톤 */}
                    <div className='flex w-full flex-col gap-2'>
                      <div className='flex w-full items-center gap-1'>
                        <div className='h-4 w-12 animate-pulse rounded bg-gray-200' />
                        <div className='h-4 w-16 animate-pulse rounded bg-gray-200' />
                        <div className='size-[2px] rounded-full bg-gray-200' />
                        <div className='h-4 w-24 animate-pulse rounded bg-gray-200' />
                      </div>
                      <div className='h-5 w-full animate-pulse rounded bg-gray-200' />
                      <div className='flex items-center gap-1'>
                        <div className='h-[19px] w-20 animate-pulse rounded bg-gray-200' />
                        <div className='h-[19px] w-16 animate-pulse rounded bg-gray-200' />
                      </div>
                    </div>
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
