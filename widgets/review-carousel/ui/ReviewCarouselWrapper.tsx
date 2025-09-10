'use client';

import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from 'entities/review';
import { ReviewCarousel } from './ReviewCarousel';
import { ReviewCarouselSkeleton } from './ReviewCarouselSkeleton';
import { ReviewCarouselError } from './ReviewCarouselError';
import { ErrorBoundary } from 'shared/ui/error-display';

interface ReviewCarouselWrapperProps {
  reviews: ReviewCardData[];
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function ReviewCarouselWrapper({
  reviews,
  hospitalId,
  lang,
  dict,
}: ReviewCarouselWrapperProps) {
  return (
    <ErrorBoundary fallback={<ReviewCarouselError lang={lang} dict={dict} />}>
      <Suspense fallback={<ReviewCarouselSkeleton />}>
        <ReviewCarousel reviews={reviews} hospitalId={hospitalId} lang={lang} dict={dict} />
      </Suspense>
    </ErrorBoundary>
  );
}
