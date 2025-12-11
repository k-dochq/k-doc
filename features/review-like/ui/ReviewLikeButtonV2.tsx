'use client';

import { useReviewLike } from '../model/useReviewLike';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';
import { LikeButtonV2 } from 'shared/ui/like-button';
import type { Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';

interface ReviewLikeButtonV2Props {
  reviewId: string;
  locale: Locale;
  dict: Dictionary;
  className?: string;
}

/**
 * 리뷰 상세 V2용 좋아요 버튼
 * - 병원 상세 V2 헤더 스타일(LikeButtonV2) 사용
 * - 로그인 요구 시 모달 노출
 */
export function ReviewLikeButtonV2({
  reviewId,
  locale,
  dict,
  className = '',
}: ReviewLikeButtonV2Props) {
  const { isAuthenticated } = useAuth();

  const { isLiked, likeCount, isLoading, isToggling, error, toggleLike, clearError } =
    useReviewLike({
      reviewId,
      enabled: true,
    });

  const isDisabled = isLoading || isToggling;

  const handleLikeToggle = () => {
    if (!isAuthenticated) {
      openModal({
        content: (
          <LoginRequiredModal lang={locale} dict={dict} redirectPath={window.location.pathname} />
        ),
      });
      return;
    }

    if (error) {
      clearError();
    }

    toggleLike();
  };

  // 로딩/에러 안전 처리: 기본 값 표시
  const safeIsLiked = !!isLiked && !error;

  return (
    <LikeButtonV2
      isLiked={safeIsLiked}
      onLikeToggle={handleLikeToggle}
      isLoading={isDisabled}
      className={className}
    />
  );
}
