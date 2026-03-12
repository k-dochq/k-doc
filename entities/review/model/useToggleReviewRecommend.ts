'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';

interface UseToggleReviewRecommendParams {
  queryParams: {
    limit: number;
    sort?: string;
    category?: string;
  };
}

/**
 * 리뷰 추천 토글 뮤테이션 훅
 */
export function useToggleReviewRecommend({ queryParams }: UseToggleReviewRecommendParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      const response = await fetch(`/api/reviews/${reviewId}/recommend`, {
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
        throw new Error('추천 처리 중 오류가 발생했습니다');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || '추천 처리 중 오류가 발생했습니다');
      }

      return result;
    },
    onSuccess: (_data, reviewId) => {
      // 리뷰 상세 쿼리 invalidate (detail 페이지 즉시 반영)
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.byId(reviewId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviewRecommend.all,
        exact: false,
      });
    },
    onError: (error: Error) => {
      console.error('추천 처리 중 오류:', error.message);
    },
  });
}
