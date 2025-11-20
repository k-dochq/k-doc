'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { type Dictionary } from 'shared/model/types';
import { type User } from '@supabase/supabase-js';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { decodeHtmlEntities } from 'shared/lib/html-entities';
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
  onDelete?: (reviewId: string) => void;
}

export function ReviewListCard({
  review,
  lang,
  dict,
  user,
  onToggleLike,
  isLikeLoading = false,
  className = '',
  onDelete,
}: ReviewListCardProps) {
  const title = decodeHtmlEntities(extractLocalizedText(review.title, lang) || '');
  const content = decodeHtmlEntities(extractLocalizedText(review.content, lang) || '');

  // 해시태그 추출 (concernsMultilingual을 해시태그로 사용)
  const concerns = decodeHtmlEntities(
    extractLocalizedText(review.concernsMultilingual, lang) || '',
  );
  const hashtags = concerns ? [concerns] : [];

  return (
    <div className='relative z-10 overflow-hidden rounded-xl shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)]'>
      <div
        className={`block w-full rounded-t-xl border border-white bg-white/50 px-5 pt-5 pb-4 backdrop-blur-[6px] ${className}`}
      >
        {/* 첫 번째 섹션: 프로필 사진, 닉네임, 작성일자, 평점 */}
        <ReviewListCardHeader review={review} lang={lang} />

        {/* 두 번째 섹션: Before/After 이미지 */}
        <ReviewListImages
          beforeImages={review.images.before}
          afterImages={review.images.after}
          reviewId={review.id}
          lang={lang}
          dict={dict}
          className='mt-3'
          requiresLogin={review.requiresLogin}
        />

        {/* 세 번째 섹션과 네 번째 섹션을 LocaleLink로 감싸기 */}
        <LocaleLink href={`/review/${review.id}`} locale={lang} className='block'>
          {/* 세 번째 섹션: 해시태그, 시술시기 */}
          <ReviewListCardFooter review={review} lang={lang} dict={dict} className='mt-3' />

          {/* 네 번째 섹션: 리뷰 내용 */}
          {content && (
            <ReviewContentSection content={content} lang={lang} dict={dict} className='mt-3' />
          )}
        </LocaleLink>
      </div>
      {/* 다섯 번째 섹션: 조회수, 좋아요 */}
      <ReviewStatsSection
        review={review}
        lang={lang}
        user={user}
        onToggleLike={onToggleLike}
        isLikeLoading={isLikeLoading && isLikeLoading}
        className=''
        onDelete={onDelete}
        dict={dict}
      />
    </div>
  );
}
