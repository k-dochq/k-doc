'use client';

import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from 'entities/review/model/types';
import { PopularReviewCardV2 } from 'entities/review/ui/PopularReviewCardV2';

interface PopularReviewsCarouselV2Props {
  reviews: ReviewCardData[];
  lang: Locale;
  dict: Dictionary;
}

export function PopularReviewsCarouselV2({ reviews, lang, dict }: PopularReviewsCarouselV2Props) {
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
          {reviews.map((review, index) => {
            const isFirst = index === 0;
            return (
              <CarouselItem key={review.id} className={`basis-[286px] ${isFirst ? '' : 'pl-4'}`}>
                <PopularReviewCardV2 review={review} lang={lang} dict={dict} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
