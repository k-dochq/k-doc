'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
// API 응답 타입 정의
interface ReviewLikeStatusResponse {
  success: boolean;
  isLiked: boolean;
  likeCount: number;
  error?: string;
  requestId?: string;
}

interface ReviewLikeToggleResponse {
  success: boolean;
  isLiked: boolean;
  likeCount: number;
  error?: string;
  requestId?: string;
}

interface UseReviewLikeOptions {
  reviewId: string;
  enabled?: boolean;
}

interface ReviewLikeError {
  message: string;
  status?: number;
}

// 리뷰 좋아요 상태 조회 함수
async function fetchReviewLikeStatus(reviewId: string): Promise<ReviewLikeStatusResponse> {
  const response = await fetch(`/api/reviews/${reviewId}/like`);

  if (!response.ok) {
    // 401 에러는 이제 API에서 처리되므로 여기서는 일반적인 에러만 처리
    throw new Error('좋아요 상태를 불러오는 중 오류가 발생했습니다');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || '좋아요 상태를 불러오는 중 오류가 발생했습니다');
  }

  return result;
}

// 리뷰 좋아요 토글 함수
async function toggleReviewLike(reviewId: string): Promise<ReviewLikeToggleResponse> {
  const response = await fetch(`/api/reviews/${reviewId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('로그인이 필요합니다');
    }
    if (response.status === 404) {
      throw new Error('리뷰를 찾을 수 없습니다');
    }
    throw new Error('좋아요 처리 중 오류가 발생했습니다');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || '좋아요 처리 중 오류가 발생했습니다');
  }

  return result;
}

export function useReviewLike({ reviewId, enabled = true }: UseReviewLikeOptions) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<ReviewLikeError | null>(null);

  // 좋아요 상태 조회 쿼리
  const {
    data: likeStatus,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: queryKeys.reviewLike.status(reviewId),
    queryFn: () => fetchReviewLikeStatus(reviewId),
    enabled: enabled && !!reviewId,
    staleTime: 30 * 1000, // 30초
    gcTime: 5 * 60 * 1000, // 5분
    retry: (failureCount, error) => {
      // 일반적인 네트워크 에러만 재시도
      return failureCount < 2;
    },
  });

  // 좋아요 토글 뮤테이션
  const toggleMutation = useMutation({
    mutationFn: () => toggleReviewLike(reviewId),
    onSuccess: (data) => {
      // 현재 리뷰의 좋아요 상태 캐시 업데이트
      queryClient.setQueryData(queryKeys.reviewLike.status(reviewId), data);

      // 좋아요한 리뷰 리스트 쿼리 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.liked.all(),
        exact: false, // 모든 liked reviews 쿼리를 invalidate
      });

      // 리뷰 리스트도 invalidate (likeCount 업데이트를 위해)
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.allInfinite({}),
        exact: false,
      });

      setError(null);
    },
    onError: (error: Error) => {
      setError({
        message: error.message,
        status: error.message.includes('로그인이 필요합니다') ? 401 : undefined,
      });
    },
  });

  // 에러 상태 동기화
  useEffect(() => {
    if (queryError) {
      setError({
        message: queryError.message,
        status: undefined,
      });
    } else {
      setError(null);
    }
  }, [queryError]);

  const toggleLike = () => {
    if (!reviewId) return;
    toggleMutation.mutate();
  };

  return {
    // 상태
    isLiked: likeStatus?.isLiked ?? false,
    likeCount: likeStatus?.likeCount ?? 0,

    // 로딩 상태
    isLoading,
    isToggling: toggleMutation.isPending,

    // 에러 상태
    error,

    // 액션
    toggleLike,

    // 유틸리티
    clearError: () => setError(null),
  };
}
