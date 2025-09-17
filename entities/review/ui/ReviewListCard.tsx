'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { type Dictionary } from 'shared/model/types';
import { type User } from '@supabase/supabase-js';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { ReviewListImages } from './ReviewListImages';
import { UserRatingInfo } from './UserRatingInfo';
import { ReviewText } from './ReviewText';
import { ReviewHashtags } from './ReviewHashtags';
import { ReviewListCardHeader } from './ReviewListCardHeader';
import { ReviewListCardFooter } from './ReviewListCardFooter';
import { ReviewContentSection } from './ReviewContentSection';
import { ReviewStatsSection } from './ReviewStatsSection';
import { LocaleLink } from 'shared/ui/locale-link';

interface ReviewListCardProps {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
  user: User | null;
  onToggleLike?: (reviewId: string) => void;
  isLikeLoading?: boolean;
  className?: string;
}

export function ReviewListCard({
  review,
  lang,
  dict,
  user,
  onToggleLike,
  isLikeLoading = false,
  className = '',
}: ReviewListCardProps) {
  const title = extractLocalizedText(review.title, lang) || '';
  const content = extractLocalizedText(review.content, lang) || '';

  // 해시태그 추출 (concerns를 해시태그로 사용)
  const hashtags = review.concerns ? [review.concerns] : [];

  return (
    <LocaleLink
      href={`/review/${review.id}`}
      locale={lang}
      className={`block w-full overflow-hidden rounded-lg ${className}`}
    >
      {/* 첫 번째 섹션: 프로필 사진, 닉네임, 작성일자, 평점 */}
      <ReviewListCardHeader review={review} lang={lang} />

      {/* 두 번째 섹션: Before/After 이미지 */}
      <ReviewListImages
        beforeImages={review.images.before}
        afterImages={review.images.after}
        className='mt-3'
      />

      {/* 세 번째 섹션: 해시태그, 시술시기 */}
      <ReviewListCardFooter review={review} lang={lang} dict={dict} className='mt-3' />

      {/* 네 번째 섹션: 리뷰 내용 */}
      {content && (
        <ReviewContentSection content={content} lang={lang} dict={dict} className='mt-3' />
      )}

      {/* 다섯 번째 섹션: 조회수, 좋아요 */}
      <ReviewStatsSection
        review={review}
        lang={lang}
        user={user}
        onToggleLike={onToggleLike}
        isLikeLoading={isLikeLoading && isLikeLoading}
        className='mt-3'
      />
    </LocaleLink>
  );
}
