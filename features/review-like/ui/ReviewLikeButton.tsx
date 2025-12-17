'use client';

import { useReviewLike } from '../model/useReviewLike';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openDrawer } from 'shared/lib/drawer';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';
import type { Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';
import { HeartIcon } from 'shared/ui/icons/HeartIcon';
import { HeartOutlineIcon } from 'shared/ui/icons/HeartOutlineIcon';
import { LoadingIcon } from 'shared/ui/loading-icon';

interface ReviewLikeButtonProps {
  reviewId: string;
  locale: Locale;
  dict: Dictionary;
  className?: string;
  showCount?: boolean;
  variant?: 'default' | 'compact';
}

export function ReviewLikeButton({
  reviewId,
  locale,
  dict,
  className = '',
  showCount = true,
  variant = 'default',
}: ReviewLikeButtonProps) {
  const router = useLocalizedRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const { isLiked, likeCount, isLoading, isToggling, error, toggleLike, clearError } =
    useReviewLike({
      reviewId,
      enabled: true, // 모든 사용자가 좋아요 수를 볼 수 있도록 활성화
    });

  const handleClick = async () => {
    // 로그인 상태 확인
    if (!isAuthenticated) {
      await openDrawer({
        content: <LoginRequiredDrawer lang={locale} dict={dict} />,
      });
      return;
    }

    // 에러 초기화
    if (error) {
      clearError();
    }

    // 인증 에러인 경우 로그인 드로어 표시
    if (error?.status === 401) {
      await openDrawer({
        content: <LoginRequiredDrawer lang={locale} dict={dict} />,
      });
      return;
    }

    // 좋아요 토글 실행
    toggleLike();
  };

  const isDisabled = isLoading || isToggling;

  // compact 스타일 (LikeButton과 동일한 스타일)
  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`flex items-center gap-1 ${className} ${isDisabled ? 'cursor-not-allowed' : ''}`}
        type='button'
        aria-label={
          isLiked ? dict.review?.like?.liked || '좋아요 취소' : dict.review?.like?.like || '좋아요'
        }
      >
        {isDisabled ? (
          <LoadingIcon size={16} className='text-neutral-500' />
        ) : (
          <div>{isLiked ? <HeartIcon /> : <HeartOutlineIcon />}</div>
        )}
        {showCount && (
          <span
            className={`text-sm font-medium text-neutral-900 ${isDisabled ? 'opacity-70' : ''}`}
          >
            {likeCount.toLocaleString()}
          </span>
        )}
      </button>
    );
  }

  // 기본 스타일 (LikeButton과 동일한 스타일)
  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`flex items-center gap-1 ${className} ${isDisabled ? 'cursor-not-allowed' : ''}`}
      type='button'
      aria-label={
        isLiked ? dict.review?.like?.liked || '좋아요 취소' : dict.review?.like?.like || '좋아요'
      }
    >
      {isDisabled ? (
        <LoadingIcon size={16} className='text-neutral-500' />
      ) : (
        <div>{isLiked ? <HeartIcon /> : <HeartOutlineIcon />}</div>
      )}
      {showCount && (
        <span className={`text-sm font-medium text-neutral-900 ${isDisabled ? 'opacity-70' : ''}`}>
          {likeCount.toLocaleString()}
        </span>
      )}
    </button>
  );
}
