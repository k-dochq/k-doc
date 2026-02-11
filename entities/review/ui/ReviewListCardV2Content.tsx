'use client';

import { LocaleLink } from 'shared/ui/locale-link';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from '../model/types';
import { ReviewListCardFooterV2 } from './ReviewListCardFooterV2';
import { type RefObject } from 'react';

interface ReviewListCardV2ContentProps {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
  content: string;
  isExpanded: boolean;
  forceContentExpanded: boolean;
  shouldShowMore: boolean;
  onToggleExpand: () => void;
  disableLink: boolean;
  textRef: RefObject<HTMLDivElement | null>;
}

export function ReviewListCardV2Content({
  review,
  lang,
  dict,
  content,
  isExpanded,
  forceContentExpanded,
  shouldShowMore,
  onToggleExpand,
  disableLink,
  textRef,
}: ReviewListCardV2ContentProps) {
  const ContentBlock = (
    <div className='px-5'>
      {/* 해시태그, 시술시기, 조회수 */}
      <ReviewListCardFooterV2 review={review} lang={lang} dict={dict} className='mt-3' />

      {/* 리뷰 내용 */}
      {content && (
        <div className='mt-3 flex flex-col gap-1'>
          <div
            ref={textRef}
            className={`text-[13px] leading-[19px] whitespace-pre-wrap text-neutral-700 ${
              !isExpanded && !forceContentExpanded ? 'line-clamp-3' : ''
            }`}
          >
            {content}
          </div>
          {!forceContentExpanded && shouldShowMore && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleExpand();
              }}
              className='inline-flex items-center text-xs leading-4 font-medium text-neutral-400 transition-colors hover:text-neutral-500'
            >
              {isExpanded ? dict.review.showLess : dict.review.showMore}
            </button>
          )}
        </div>
      )}
    </div>
  );

  if (disableLink) {
    return ContentBlock;
  }

  return (
    <LocaleLink href={`/review/${review.id}`} locale={lang} className='block'>
      {ContentBlock}
    </LocaleLink>
  );
}
