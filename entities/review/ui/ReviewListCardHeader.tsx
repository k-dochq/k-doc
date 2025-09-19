'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { UserAvatar } from './UserAvatar';
import { StarIcon } from 'shared/ui/star-icon/StarIcon';
import { formatRelativeDate, getUserDisplayName } from 'shared/lib';

interface ReviewListCardHeaderProps {
  review: ReviewCardData;
  lang: Locale;
  className?: string;
}

export function ReviewListCardHeader({ review, lang, className = '' }: ReviewListCardHeaderProps) {
  // 사용자 표시명
  const userName = getUserDisplayName(review.user);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className='flex items-center gap-3'>
        {/* 프로필 사진 */}
        <UserAvatar className='h-[30px] w-[30px]' />

        {/* 닉네임과 작성일자 */}
        <div className='flex items-center gap-2'>
          <span className='text-sm font-semibold text-neutral-900'>{userName}</span>
          <span className='text-xs font-medium text-neutral-400'>
            {formatRelativeDate(review.createdAt, lang)}
          </span>
        </div>
      </div>

      {/* 평점 */}
      <div className='flex items-center gap-1'>
        <StarIcon />
        <span className='text-sm font-medium text-neutral-900'>{review.rating.toFixed(1)}</span>
      </div>
    </div>
  );
}
