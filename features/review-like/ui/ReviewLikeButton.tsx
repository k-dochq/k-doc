'use client';

import { useState } from 'react';
import { useReviewLike } from '../model/useReviewLike';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import type { Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';
import { HeartIcon } from 'shared/ui/icons/HeartIcon';

interface ReviewLikeButtonProps {
  reviewId: string;
  locale: Locale;
  dict: Dictionary;
  className?: string;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ReviewLikeButton({
  reviewId,
  locale,
  dict,
  className = '',
  showCount = true,
  size = 'sm',
}: ReviewLikeButtonProps) {
  const router = useLocalizedRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const { isLiked, likeCount, isLoading, isToggling, error, toggleLike, clearError } =
    useReviewLike({
      reviewId,
      enabled: true,
    });

  // 사이즈별 스타일 정의
  const sizeStyles = {
    sm: {
      button: 'h-8 px-2 text-xs',
      icon: 'h-4 w-4',
      text: 'text-xs',
    },
    md: {
      button: 'h-10 px-3 text-sm',
      icon: 'h-5 w-5',
      text: 'text-sm',
    },
    lg: {
      button: 'h-12 px-4 text-base',
      icon: 'h-6 w-6',
      text: 'text-base',
    },
  };

  const currentSize = sizeStyles[size];

  const handleClick = () => {
    // 에러 초기화
    if (error) {
      clearError();
    }

    // 인증 에러인 경우 로그인 페이지로 이동
    if (error?.status === 401) {
      const currentPath = window.location.pathname;
      router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    // 좋아요 토글 실행
    toggleLike();
  };

  const isDisabled = isLoading || isToggling;

  return (
    <div className='flex items-center space-x-1'>
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`flex items-center justify-center space-x-1 rounded-lg border transition-all duration-200 ${currentSize.button} ${
          isLiked
            ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
            : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50'
        } ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`}
        aria-label={
          isLiked ? dict.review?.like?.liked || '좋아요 취소' : dict.review?.like?.like || '좋아요'
        }
      >
        {/* 로딩 스피너 또는 하트 아이콘 */}
        {isDisabled ? (
          <div
            className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${currentSize.icon}`}
          />
        ) : (
          <HeartIcon
            className={`${currentSize.icon} transition-transform duration-200 ${
              isLiked ? 'scale-110' : 'scale-100'
            }`}
            width={parseInt(currentSize.icon.replace('h-', '').replace('w-', '')) * 4}
            height={parseInt(currentSize.icon.replace('h-', '').replace('w-', '')) * 4}
          />
        )}

        {/* 좋아요 수 표시 */}
        {showCount && (
          <span className={`font-medium ${currentSize.text}`}>{likeCount.toLocaleString()}</span>
        )}
      </button>

      {/* 에러 메시지 */}
      {error && error.status !== 401 && (
        <div className='mt-1 text-xs text-red-500'>{error.message}</div>
      )}
    </div>
  );
}
