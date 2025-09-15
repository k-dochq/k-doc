'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText, formatDateSimple, getUserDisplayName } from 'shared/lib';
import { type ReviewCardData } from '../model/types';
import { Star, User, Calendar, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { ReviewLikeButton } from 'features/review-like/ui/ReviewLikeButton';
import { DetailHeader } from 'shared/ui/detail-header';

interface ReviewDetailCardProps {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
}

export function ReviewDetailCard({ review, lang, dict }: ReviewDetailCardProps) {
  const title = dict.reviewDetail?.title || '시술후기';

  return (
    <div className=''>
      {/* 헤더 */}
      <DetailHeader
        lang={lang}
        title={title}
        fallbackUrl={`/${lang}/reviews`}
        variant='light'
        rightContent={
          <ReviewLikeButton
            reviewId={review.id}
            locale={lang}
            dict={dict}
            variant='compact'
            showCount={true}
            size='md'
          />
        }
      />
    </div>
  );
}
