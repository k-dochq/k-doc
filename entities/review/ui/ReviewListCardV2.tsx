'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { type Dictionary } from 'shared/model/types';
import { type User } from '@supabase/supabase-js';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { decodeHtmlEntities } from 'shared/lib/html-entities';
import { ReviewListImages } from './ReviewListImages';
import { ReviewListCardHeaderV2 } from './ReviewListCardHeaderV2';
import { ReviewStatsSectionV2 } from './ReviewStatsSectionV2';
import { ReviewListCardV2Content } from './ReviewListCardV2Content';
import { useState, useRef, useEffect } from 'react';

interface ReviewListCardV2Props {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
  user: User | null;
  onToggleLike?: (reviewId: string) => void;
  isLikeLoading?: boolean;
  className?: string;
  forceContentExpanded?: boolean;
  disableLink?: boolean;
}

export function ReviewListCardV2({
  review,
  lang,
  dict,
  user,
  onToggleLike,
  isLikeLoading = false,
  className = '',
  forceContentExpanded = false,
  disableLink = false,
}: ReviewListCardV2Props) {
  const content = decodeHtmlEntities(extractLocalizedText(review.content, lang) || '');
  const [isExpanded, setIsExpanded] = useState(forceContentExpanded);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceContentExpanded) {
      setShouldShowMore(false);
      setIsExpanded(true);
      return;
    }

    if (textRef.current && content) {
      // scrollHeight가 clientHeight보다 크면 텍스트가 잘렸다는 의미
      setShouldShowMore(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [content, forceContentExpanded]);

  return (
    <div className={`w-full ${className}`}>
      {/* 카드 메인 컨텐츠 */}
      <div className='flex flex-col bg-white pt-5 pb-4'>
        {/* 상단 섹션: 프로필, 닉네임, 작성일자, 평점 */}
        <div className='px-5'>
          <ReviewListCardHeaderV2 review={review} lang={lang} />
        </div>

        {/* 이미지 섹션: Before/After 이미지 */}
        <div className='mt-3 px-5'>
          <ReviewListImages
            beforeImages={review.images.before}
            afterImages={review.images.after}
            reviewId={review.id}
            lang={lang}
            dict={dict}
            requiresLogin={review.requiresLogin}
            className='h-[220px]'
          />
        </div>

        {/* 세 번째 섹션과 네 번째 섹션 */}
        <ReviewListCardV2Content
          review={review}
          lang={lang}
          dict={dict}
          content={content}
          isExpanded={isExpanded}
          forceContentExpanded={forceContentExpanded}
          shouldShowMore={shouldShowMore}
          onToggleExpand={() => setIsExpanded((prev) => !prev)}
          disableLink={disableLink}
          textRef={textRef}
        />
      </div>

      {/* 하단 인터랙션 섹션: 좋아요, 댓글, 북마크 */}
      <ReviewStatsSectionV2
        review={review}
        lang={lang}
        user={user}
        onToggleLike={onToggleLike}
        isLikeLoading={isLikeLoading}
        dict={dict}
      />

      {/* 카드 하단 여백 */}
      <div className='h-[6px] bg-neutral-100' />
    </div>
  );
}
