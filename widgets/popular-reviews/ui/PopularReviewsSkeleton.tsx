'use client';

import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';

interface PopularReviewsSkeletonProps {
  className?: string;
}

export function PopularReviewsSkeleton({ className = '' }: PopularReviewsSkeletonProps) {
  return (
    <div className={`w-full ${className}`}>
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-2 md:-ml-4'>
          {/* 스켈레톤 카드들을 3개 정도 표시 */}
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className='basis-[280px] md:basis-[320px]'>
              <div className='rounded-lg bg-white/30 p-4 shadow-sm'>
                {/* Before/After 이미지 스켈레톤 */}
                <div className='mb-3 flex gap-2'>
                  <div className='aspect-square flex-1 animate-pulse rounded-lg bg-white/50'></div>
                  <div className='aspect-square flex-1 animate-pulse rounded-lg bg-white/50'></div>
                </div>

                {/* 사용자 정보 및 평점 스켈레톤 */}
                <div className='mb-2 flex items-center gap-2'>
                  <div className='h-6 w-6 animate-pulse rounded-full bg-white/50'></div>
                  <div className='h-4 w-16 animate-pulse rounded bg-white/50'></div>
                  <div className='h-4 w-8 animate-pulse rounded bg-white/50'></div>
                </div>

                {/* 리뷰 텍스트 스켈레톤 */}
                <div className='mb-2 space-y-1'>
                  <div className='h-4 w-full animate-pulse rounded bg-white/50'></div>
                  <div className='h-4 w-4/5 animate-pulse rounded bg-white/50'></div>
                  <div className='h-4 w-3/5 animate-pulse rounded bg-white/50'></div>
                </div>

                {/* 해시태그 스켈레톤 */}
                <div className='mb-3 flex gap-1'>
                  <div className='h-6 w-16 animate-pulse rounded-full bg-white/50'></div>
                  <div className='h-6 w-12 animate-pulse rounded-full bg-white/50'></div>
                </div>

                {/* 병원 정보 스켈레톤 */}
                <div className='h-3 w-32 animate-pulse rounded bg-white/50'></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
