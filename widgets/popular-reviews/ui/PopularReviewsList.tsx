'use client';

import { useState, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type ReviewCardData } from 'entities/review/model/types';
import { PopularReviewCard } from 'entities/review/ui/PopularReviewCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from 'shared/ui/carousel';

interface PopularReviewsListProps {
  reviews: ReviewCardData[];
  lang: Locale;
  className?: string;
}

export function PopularReviewsList({ reviews, lang, className = '' }: PopularReviewsListProps) {
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

  if (reviews.length === 0) {
    return (
      <div className={`py-8 text-center text-gray-500 ${className}`}>표시할 후기가 없습니다.</div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-2 md:-ml-4'>
          {reviews.map((review) => (
            <CarouselItem key={review.id} className='basis-[280px] md:basis-[320px]'>
              <PopularReviewCard review={review} lang={lang} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
