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
  const isRtl = lang === 'ar';

  return (
    <div className='w-full'>
      <Carousel
        opts={{
          align: 'start',
          containScroll: 'trimSnaps',
          ...(isRtl && { direction: 'rtl' }),
        }}
        className='w-full'
      >
        <CarouselContent className='' dir={isRtl ? 'rtl' : 'ltr'}>
          {liveReviews.map((liveReview, index) => {
            const isFirst = index === 0;
            const isLast = index === liveReviews.length - 1;
            return (
              <React.Fragment key={liveReview.id}>
                <CarouselItem
                  key={liveReview.id}
                  className={`${isFirst ? 'basis-[316px] ps-5' : 'basis-[312px] ps-4'}`}
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
