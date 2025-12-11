'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { UserAvatar } from './UserAvatar';
import { StarIconReviewV2 } from 'shared/ui/icons/StarIconReviewV2';
import { getUserDisplayName } from 'shared/lib';
import dayjs from 'dayjs';

interface ReviewListCardHeaderV2Props {
  review: ReviewCardData;
  lang: Locale;
  className?: string;
}

export function ReviewListCardHeaderV2({
  review,
  lang,
  className = '',
}: ReviewListCardHeaderV2Props) {
  // 사용자 표시명
  const userName = getUserDisplayName(review.user);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className='flex items-center gap-1.5'>
        {/* 프로필 사진 */}
        <UserAvatar className='h-[30px] w-[30px] shrink-0' />

        {/* 닉네임과 작성일자 */}
        <div className='flex items-center gap-1.5'>
          <span className='text-sm leading-5 font-medium text-neutral-500'>{userName}</span>
          <span className='text-[13px] leading-[19px] font-medium text-neutral-400'>
            {dayjs(review.createdAt).format('YYYY-MM-DD')}
          </span>
        </div>
      </div>

      {/* 평점 */}
      <div className='flex items-center gap-1'>
        <StarIconReviewV2 width={20} height={20} />
        <span className='text-base leading-6 font-medium text-neutral-700'>
          {review.rating.toFixed(0)}
        </span>
      </div>
    </div>
  );
}
