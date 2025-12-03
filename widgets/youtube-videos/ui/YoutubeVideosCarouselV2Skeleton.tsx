'use client';

import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';

export function YoutubeVideosCarouselV2Skeleton() {
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
          {Array.from({ length: 1 }).map((_, index) => (
            <CarouselItem key={index} className='basis-[300px] pr-4'>
              <div className='relative flex flex-col items-start gap-[12px]'>
                {/* 썸네일 이미지 스켈레톤 */}
                <div className='relative h-[169px] w-[300px] shrink-0 overflow-clip rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]'>
                  <div className='h-full w-full animate-pulse bg-gray-200' />
                </div>

                {/* 텍스트 영역 스켈레톤 */}
                <div className='relative box-border flex w-full shrink-0 flex-col items-start gap-[2px] px-2 py-0 not-italic'>
                  {/* 타이틀 스켈레톤 */}
                  <div className='relative h-[28px] w-[min-content] min-w-full shrink-0 animate-pulse rounded bg-gray-200' />
                  {/* 설명 스켈레톤 */}
                  <div className='relative h-[20px] w-full shrink-0 animate-pulse rounded bg-gray-200' />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
