'use client';

import { UserAvatar } from './UserAvatar';
import { StarIcon } from './StarIcon';

interface UserRatingInfoProps {
  userName: string;
  rating: number;
  className?: string;
}

export function UserRatingInfo({ userName, rating, className = '' }: UserRatingInfoProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className='flex items-center gap-2'>
        {/* 사용자 아바타 */}
        <UserAvatar />
        {/* 사용자명 */}
        <span className='text-xs font-medium text-neutral-500'>{userName}</span>
      </div>

      {/* 평점 */}
      <div className='flex items-center gap-0.5'>
        <StarIcon />
        <span className='text-xs font-medium text-neutral-900'>{rating.toFixed(1)}</span>
      </div>
    </div>
  );
}
