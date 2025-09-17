'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from 'entities/review/model/types';
import { ReviewCarousel } from 'shared/ui/review-carousel';

interface PopularReviewsListProps {
  reviews: ReviewCardData[];
  lang: Locale;
  className?: string;
}

export function PopularReviewsList({ reviews, lang, className = '' }: PopularReviewsListProps) {
  return (
    <ReviewCarousel
      items={reviews}
      lang={lang}
      className={className}
      emptyMessage='표시할 후기가 없습니다.'
      loop={true}
      autoPlay={true}
      autoPlayInterval={4000}
      align='start'
    />
  );
}
