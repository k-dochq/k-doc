'use client';

import { UserAvatar } from './UserAvatar';
import { StarIcon } from './StarIcon';

interface PopularReviewCardV2UserInfoProps {
  userName: string;
  rating: number;
}

export function PopularReviewCardV2UserInfo({
  userName,
  rating,
}: PopularReviewCardV2UserInfoProps) {
  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex items-center gap-[6px]'>
        <div className='size-5 shrink-0 overflow-hidden rounded-full bg-[#fbceff]'>
          <UserAvatar className='size-5' />
        </div>
        <p className='text-sm leading-5 font-medium text-neutral-500'>{userName}</p>
      </div>
      <div className='flex items-center gap-1'>
        <StarIcon className='size-4 shrink-0' />
        <p className='text-[13px] leading-[19px] font-medium text-neutral-700'>
          {rating.toFixed(1)}
        </p>
      </div>
    </div>
  );
}
