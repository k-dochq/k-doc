'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { BeforeAfterImages } from './BeforeAfterImages';
import { UserRatingInfo } from './UserRatingInfo';
import { ReviewText } from './ReviewText';
import { ReviewHashtags } from './ReviewHashtags';
import { ReviewHospitalInfo } from './ReviewHospitalInfo';
import { ReviewListCardHeader } from './ReviewListCardHeader';
import { LocaleLink } from 'shared/ui/locale-link';

interface ReviewListCardProps {
  review: ReviewCardData;
  lang: Locale;
  className?: string;
}

export function ReviewListCard({ review, lang, className = '' }: ReviewListCardProps) {
  const title = extractLocalizedText(review.title, lang) || '';
  const content = extractLocalizedText(review.content, lang) || '';

  // 해시태그 추출 (concerns를 해시태그로 사용)
  const hashtags = review.concerns ? [review.concerns] : [];

  return (
    <LocaleLink
      href={`/reviews/${review.id}`}
      locale={lang}
      className={`block w-full overflow-hidden rounded-lg ${className}`}
    >
      {/* 첫 번째 섹션: 프로필 사진, 닉네임, 작성일자, 평점 */}
      <ReviewListCardHeader review={review} lang={lang} />
    </LocaleLink>
  );
}
