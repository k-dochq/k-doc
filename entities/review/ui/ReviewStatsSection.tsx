'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { type User } from '@supabase/supabase-js';
import { EyeIcon } from 'shared/ui/icons/EyeIcon';
import { CommentIcon, MoreIcon } from 'shared/ui';
import { ReviewLikeDisplay } from './ReviewLikeDisplay';
import { LocaleLink } from 'shared/ui/locale-link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui/dropdown-menu';
import { type Dictionary } from 'shared/model/types';

interface ReviewStatsSectionProps {
  review: ReviewCardData;
  lang: Locale;
  user: User | null;
  onToggleLike?: (reviewId: string) => void;
  isLikeLoading?: boolean;
  className?: string;
  showLikeButton?: boolean; // 좋아요 버튼 표시 여부 (기본값: true)
  onDelete?: (reviewId: string) => void;
  dict: Dictionary;
}

export function ReviewStatsSection({
  review,
  lang,
  user,
  onToggleLike,
  isLikeLoading = false,
  className = '',
  showLikeButton = true,
  onDelete,
  dict,
}: ReviewStatsSectionProps) {
  // 클라이언트에서 현재 사용자의 좋아요 상태 계산
  const isLiked = user && review.likedUserIds ? review.likedUserIds.includes(user.id) : false;

  // 삭제 핸들러
  const handleDelete = () => {
    if (window.confirm(dict.review.deleteConfirm)) {
      onDelete?.(review.id);
    }
  };

  return (
    <div
      className={`relative z-10 flex items-center justify-between rounded-b-xl border-r border-b border-l border-white bg-white/50 px-5 py-3 backdrop-blur-[6px] ${className}`}
    >
      <div className='item-center flex gap-3'>
        {/* 댓글 - 클릭 시 리뷰 상세의 댓글 작성 폼으로 이동 */}
        <LocaleLink
          href={`/review/${review.id}#comment-form`}
          locale={lang}
          className='flex cursor-pointer items-center gap-1 transition-opacity hover:opacity-70'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <CommentIcon size={16} className='text-neutral-400' />
          <span className='text-sm font-medium text-neutral-900'>{review.commentCount}</span>
        </LocaleLink>

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className='cursor-pointer transition-opacity hover:opacity-70'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <MoreIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='rounded-[6px] border border-[rgba(218,71,239,0.2)] bg-white p-1 shadow-md'
        >
          {user?.id === review.userId && (
            <DropdownMenuItem
              onClick={handleDelete}
              className='px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-purple-50'
            >
              {dict.review.delete}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <a
              href={`mailto:cs@k-doc.kr?subject=Review Report (ID: ${review.id})&body=Reported review link: ${typeof window !== 'undefined' ? window.location.origin : ''}/${lang}/review/${review.id}%0D%0AReporter email: ${user?.email || 'Guest'}`}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `mailto:cs@k-doc.kr?subject=Review Report (ID: ${review.id})&body=Reported review link: ${window.location.origin}/${lang}/review/${review.id}%0D%0AReporter email: ${user?.email || 'Guest'}`;
              }}
              className='block w-full px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-purple-50'
            >
              {dict.review.report}
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
