'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';

interface UseToggleReviewLikeParams {
  queryParams: {
    limit: number;
    sort?: string;
    category?: string;
  };
}

/**
 * 리뷰 좋아요 토글 뮤테이션 훅
 */
export function useToggleReviewLike({ queryParams }: UseToggleReviewLikeParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      // API 호출
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
    },
    onSuccess: () => {
      // 리뷰 관련 모든 쿼리 invalidate (리스트, 상세, 좋아요한 리뷰 등)
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
        exact: false, // 모든 reviews 관련 쿼리를 invalidate
      });

      // 좋아요한 리뷰 리스트 쿼리도 별도로 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.liked.all(),
        exact: false, // 모든 liked reviews 쿼리를 invalidate
      });

      // 리뷰 좋아요 상태 쿼리도 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviewLike.all,
        exact: false, // 모든 review-like 쿼리를 invalidate
      });
    },
    onError: (error: Error) => {
      console.error('좋아요 처리 중 오류:', error.message);
      // alert 대신 에러를 상위 컴포넌트에서 처리하도록 함
      // 401 에러는 상위 컴포넌트에서 LoginRequiredModal로 처리됨
    },
  });
}
