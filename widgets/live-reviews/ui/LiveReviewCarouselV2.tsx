'use client';

import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type LiveReviewData } from 'entities/live-review/api/use-cases/get-live-reviews';
import { LiveReviewCardV2 } from 'entities/live-review/ui/LiveReviewCardV2';

interface LiveReviewCarouselV2Props {
  liveReviews: LiveReviewData[];
  lang: Locale;
  dict: Dictionary;
}

export function LiveReviewCarouselV2({ liveReviews, lang, dict }: LiveReviewCarouselV2Props) {
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
          {liveReviews.map((liveReview, index) => {
            const isFirst = index === 0;
            return (
              <CarouselItem
                key={liveReview.id}
                className={`basis-[312px] ${isFirst ? '' : 'pl-4'}`}
              >
                <LiveReviewCardV2 liveReview={liveReview} lang={lang} dict={dict} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
