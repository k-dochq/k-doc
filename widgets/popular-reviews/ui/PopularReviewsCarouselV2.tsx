'use client';

import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from 'entities/review/model/types';
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
            return (
              <CarouselItem key={review.id} className={`basis-[286px] pr-4`}>
                <PopularReviewCardV2 review={review} lang={lang} dict={dict} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <div className='h-6' />
      <PopularReviewsPageIndicator totalPages={reviews.length} currentPage={currentSlide} />
    </div>
  );
}
