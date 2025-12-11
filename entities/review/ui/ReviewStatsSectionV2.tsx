'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { type User } from '@supabase/supabase-js';
import { CommentIconV2 } from 'shared/ui/icons/CommentIconV2';
import { HeartIconV2Detail } from 'shared/ui/icons/HeartIconV2Detail';
import { HeartOutlineIconV2Detail } from 'shared/ui/icons/HeartOutlineIconV2Detail';
import { LoadingIcon } from 'shared/ui/loading-icon';
import { LocaleLink } from 'shared/ui/locale-link';
import { type Dictionary } from 'shared/model/types';

interface ReviewStatsSectionV2Props {
  review: ReviewCardData;
  lang: Locale;
  user: User | null;
  onToggleLike?: (reviewId: string) => void;
  isLikeLoading?: boolean;
  className?: string;
  dict: Dictionary;
}

export function ReviewStatsSectionV2({
  review,
  lang,
  user,
  onToggleLike,
  isLikeLoading = false,
  className = '',
  dict,
}: ReviewStatsSectionV2Props) {
  // 클라이언트에서 현재 사용자의 좋아요 상태 계산
  const isLiked = user && review.likedUserIds ? review.likedUserIds.includes(user.id) : false;

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLikeLoading) {
      onToggleLike?.(review.id);
    }
  };

  return (
    <div
      className={`flex items-center justify-between border-t border-neutral-200 bg-white px-5 py-3 ${className}`}
    >
      {/* 좋아요와 댓글 */}
      <div className='flex items-center gap-3'>
        {/* 좋아요 */}
        <button
          onClick={handleLikeClick}
          className='flex items-center gap-1'
          type='button'
          disabled={isLikeLoading}
          aria-label={isLiked ? '좋아요 취소' : '좋아요'}
        >
          {isLikeLoading ? (
            <LoadingIcon size={20} className='text-neutral-400' />
          ) : isLiked ? (
            <HeartIconV2Detail width={20} height={20} />
          ) : (
            <HeartOutlineIconV2Detail width={20} height={20} />
          )}
          <span className='text-sm leading-5 font-medium text-neutral-700'>{review.likeCount}</span>
        </button>

        {/* 댓글 */}
        <LocaleLink
          href={`/review/${review.id}#comment-form`}
          locale={lang}
          className='flex items-center gap-1'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <CommentIconV2 width={20} height={20} className='text-neutral-700' />
          <span className='text-sm leading-5 font-medium text-neutral-700'>
            {review.commentCount}
          </span>
        </LocaleLink>
      </div>
    </div>
  );
}
