'use client';

import { useState } from 'react';
import { useHospitalLike } from '../model/useHospitalLike';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import type { Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';

interface HospitalLikeButtonProps {
  hospitalId: string;
  locale: Locale;
  dict: Dictionary;
  className?: string;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function HospitalLikeButton({
  hospitalId,
  locale,
  dict,
  className = '',
  showCount = true,
  size = 'md',
}: HospitalLikeButtonProps) {
  const router = useLocalizedRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const { isLiked, likeCount, isLoading, isToggling, error, toggleLike, clearError } =
    useHospitalLike({
      hospitalId,
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

  // 로딩 중이거나 토글 중일 때 비활성화
  const isDisabled = isLoading || isToggling;

  return (
    <div className='flex flex-col items-center space-y-1'>
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`flex items-center justify-center space-x-1 rounded-lg border transition-all duration-200 ${currentSize.button} ${
          isLiked
            ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
            : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50'
        } ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className} `}
        aria-label={
          isLiked
            ? dict.hospital?.like?.liked || '좋아요 취소'
            : dict.hospital?.like?.like || '좋아요'
        }
      >
        {/* 로딩 스피너 또는 하트 아이콘 */}
        {isDisabled ? (
          <div
            className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${currentSize.icon}`}
          />
        ) : (
          <svg
            className={`${currentSize.icon} transition-transform duration-200 ${
              isLiked ? 'scale-110' : 'scale-100'
            }`}
            fill={isLiked ? 'currentColor' : 'none'}
            stroke='currentColor'
            strokeWidth={isLiked ? 0 : 2}
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
        )}

        {/* 좋아요 수 표시 */}
        {showCount && (
          <span className={`font-medium ${currentSize.text}`}>{likeCount.toLocaleString()}</span>
        )}
      </button>

      {/* 에러 메시지 */}
      {error && error.status !== 401 && (
        <div className='rounded-md bg-red-50 px-2 py-1'>
          <p className='text-xs text-red-600'>{error.message}</p>
        </div>
      )}

      {/* 로그인 필요 메시지 */}
      {error?.status === 401 && (
        <div className='rounded-md bg-blue-50 px-2 py-1'>
          <p className='text-xs text-blue-600'>로그인이 필요합니다</p>
        </div>
      )}
    </div>
  );
}
