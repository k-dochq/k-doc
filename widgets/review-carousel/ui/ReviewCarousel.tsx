'use client';

import { useState, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from 'entities/review';
import { ReviewCard } from 'entities/review/ui';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from 'shared/ui/carousel';

interface ReviewCarouselProps {
  reviews: ReviewCardData[];
  lang: Locale;
  dict: Dictionary;
}

export function ReviewCarousel({ reviews, lang, dict }: ReviewCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // 자동 재생 기능 (infinite loop)
  useEffect(() => {
    if (!api || reviews.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext(); // loop: true로 인해 자동으로 처음으로 돌아감
    }, 5000); // 5초마다 자동 재생

    return () => clearInterval(interval);
  }, [api, reviews.length]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  // 빈 데이터 상태 처리
  if (reviews.length === 0) {
    return (
      <div className='w-full'>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold text-gray-900'>
            {dict.reviewCarousel?.title || '시술후기'}
          </h2>
        </div>
        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <div className='mb-4'>
            <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100'>
              <svg
                className='h-6 w-6 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1.586l-4.707 4.707z'
                />
              </svg>
            </div>
          </div>
          <h3 className='mb-2 text-sm font-medium text-gray-900'>
            {dict.reviewCarousel?.empty?.message || '등록된 리뷰가 없습니다'}
          </h3>
          <p className='max-w-sm text-xs text-gray-500'>
            {dict.reviewCarousel?.empty?.description || '첫 번째 리뷰를 작성해보세요.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-gray-900'>
          {dict.reviewCarousel?.title || '시술후기'}
        </h2>
        <div className='flex items-center space-x-2 text-sm text-gray-500'>
          <span>{reviews.length}개의 후기</span>
        </div>
      </div>

      <div className='mx-auto w-full'>
        <Carousel
          setApi={setApi}
          className='w-full'
          opts={{
            loop: true,
            align: 'start',
          }}
        >
          <CarouselContent className='-ml-4 min-h-[500px]'>
            {reviews.map((review) => (
              <CarouselItem key={review.id} className='h-full basis-[85%] pl-4'>
                <div className='h-full'>
                  <ReviewCard review={review} lang={lang} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* 네비게이션 버튼 */}
          {reviews.length > 1 && (
            <>
              <CarouselPrevious className='left-2' />
              <CarouselNext className='right-2' />
            </>
          )}
        </Carousel>

        {/* 인디케이터 */}
        {reviews.length > 1 && (
          <div className='mt-4 flex justify-center space-x-2'>
            {Array.from({ length: Math.min(reviews.length, 5) }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentSlide % Math.min(reviews.length, 5)
                    ? 'bg-gray-800'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
