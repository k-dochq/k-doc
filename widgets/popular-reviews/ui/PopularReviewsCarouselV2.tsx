'use client';

import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from 'entities/review/model/types';
import { useCarouselAutoplay } from 'shared/model/hooks';
import { PopularReviewCardV2 } from 'entities/review/ui/PopularReviewCardV2';
import { PopularReviewsPageIndicator } from './PopularReviewsPageIndicator';

interface PopularReviewsCarouselV2Props {
  reviews: ReviewCardData[];
  lang: Locale;
  dict: Dictionary;
}

export function PopularReviewsCarouselV2({ reviews, lang, dict }: PopularReviewsCarouselV2Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  // 자동재생 기능
  useCarouselAutoplay({
    api,
    itemCount: reviews.length,
    interval: 2500,
    enabled: true,
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on('select', () => {
      const newSlide = api.selectedScrollSnap();
      setCurrentSlide(newSlide);
    });
  }, [api]);

  return (
    <div className='w-full'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          containScroll: 'trimSnaps',
        }}
        className='w-full'
      >
        <CarouselContent className=''>
          {reviews.map((review, index) => {
            const isFirst = index === 0;
            const isLast = index === reviews.length - 1;
            return (
              <>
                <CarouselItem
                  key={review.id}
                  className={`${isFirst ? 'basis-[306px] pl-5' : 'basis-[302px] pl-[16px]'}`}
                >
                  <PopularReviewCardV2 review={review} lang={lang} dict={dict} />
                </CarouselItem>
                {isLast && (
                  <CarouselItem key={`spacer-${review.id}`} className='basis-5'>
                    <div className='w-5' />
                  </CarouselItem>
                )}
              </>
            );
          })}
        </CarouselContent>
      </Carousel>
      <div className='h-6' />
      <div className='px-5'>
        <PopularReviewsPageIndicator totalPages={reviews.length} currentPage={currentSlide} />
      </div>
    </div>
  );
}
