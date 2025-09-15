'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { type User } from '@supabase/supabase-js';
import { EyeIcon } from 'shared/ui/icons/EyeIcon';
import { ReviewLikeDisplay } from './ReviewLikeDisplay';

interface ReviewStatsSectionProps {
  review: ReviewCardData;
  lang: Locale;
  user: User | null;
  onToggleLike?: (reviewId: string) => void;
  isLikeLoading?: boolean;
  className?: string;
  showLikeButton?: boolean; // 좋아요 버튼 표시 여부 (기본값: true)
}

export function ReviewStatsSection({
  review,
  lang,
  user,
  onToggleLike,
  isLikeLoading = false,
  className = '',
  showLikeButton = true,
}: ReviewStatsSectionProps) {
  // 클라이언트에서 현재 사용자의 좋아요 상태 계산
  const isLiked = user && review.likedUserIds ? review.likedUserIds.includes(user.id) : false;

  return (
    <div
      className={`flex items-center ${showLikeButton ? 'justify-between' : 'justify-start'} ${className}`}
    >
      {/* 조회수 */}
      <div className='flex items-center gap-1'>
        <EyeIcon className='text-sm text-neutral-400' />
        <span className='text-sm font-medium text-neutral-400'>{review.viewCount}</span>
      </div>

      {/* 좋아요 - showLikeButton이 true일 때만 표시 */}
      {showLikeButton && (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ReviewLikeDisplay
            count={review.likeCount}
            isLiked={isLiked}
            onClick={() => onToggleLike?.(review.id)}
            isLoading={isLikeLoading}
          />
        </div>
      )}
    </div>
  );
}
