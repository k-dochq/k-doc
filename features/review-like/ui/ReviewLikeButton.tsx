'use client';

import { useState } from 'react';
import { useReviewLike } from '../model/useReviewLike';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useAuth } from 'shared/lib/auth/useAuth';
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
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact';
}

export function ReviewLikeButton({
  reviewId,
  locale,
  dict,
  className = '',
  showCount = true,
  size = 'sm',
  variant = 'default',
}: ReviewLikeButtonProps) {
  const router = useLocalizedRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const { isLiked, likeCount, isLoading, isToggling, error, toggleLike, clearError } =
    useReviewLike({
      reviewId,
      enabled: true, // 모든 사용자가 좋아요 수를 볼 수 있도록 활성화
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
    // 로그인 상태 확인
    if (!isAuthenticated) {
      const currentPath = window.location.pathname;
      router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

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

  // compact 스타일 (병원 리스트와 동일)
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
          <LoadingIcon size={16} className='text-neutral-400' />
        ) : (
          <div>{isLiked ? <HeartIcon /> : <HeartOutlineIcon />}</div>
        )}
        {showCount && (
          <span
            className={`text-sm font-medium text-neutral-400 ${isDisabled ? 'opacity-70' : ''}`}
          >
            {likeCount.toLocaleString()}
          </span>
        )}
      </button>
    );
  }

  // 기본 스타일 (기존 버튼 스타일)
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
    </div>
  );
}
