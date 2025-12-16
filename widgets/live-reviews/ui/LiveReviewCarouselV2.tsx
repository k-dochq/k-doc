'use client';

import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type LiveReviewData } from 'entities/live-review/api/use-cases/get-live-reviews';
import { LiveReviewCardV2 } from 'entities/live-review/ui/LiveReviewCardV2';
import React from 'react';

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
            const isLast = index === liveReviews.length - 1;
            return (
              <React.Fragment key={liveReview.id}>
                <CarouselItem
                  key={liveReview.id}
                  className={`basis-[312px] ${isFirst ? 'pl-5' : 'pl-[16px]'}`}
                >
                  <LiveReviewCardV2 liveReview={liveReview} lang={lang} dict={dict} />
                </CarouselItem>
                {isLast && (
                  <CarouselItem key={`spacer-${liveReview.id}`} className='basis-5'>
                    <div className='w-5' />
                  </CarouselItem>
                )}
              </React.Fragment>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
