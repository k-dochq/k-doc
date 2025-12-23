'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';

interface UseDeleteReviewParams {
  onSuccess?: (data: { reviewId: string; hospitalId?: string }) => void;
  onError?: (error: Error) => void;
}

/**
 * 리뷰 삭제 뮤테이션 훅
 */
export function useDeleteReview({ onSuccess, onError }: UseDeleteReviewParams = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const result = await response.json();
        if (response.status === 401) {
          throw new Error('Login required');
        }
        if (response.status === 403) {
          throw new Error('Only the author can delete this review');
        }
        if (response.status === 404) {
          throw new Error('Review not found');
        }
        throw new Error(result.error || 'Failed to delete review');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete review');
      }

      return result;
    },
    onSuccess: (data, reviewId) => {
      // 리뷰 상세 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.byId(reviewId),
        exact: true,
      });

      // review-detail 쿼리도 무효화 (useReviewDetail에서 사용)
      queryClient.invalidateQueries({
        queryKey: ['review-detail', reviewId],
        exact: false,
      });

      // 모든 리뷰 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
        exact: false,
      });

      // 내가 작성한 리뷰 목록도 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.myInfinite({}),
        exact: false,
      });

      // 병원 리뷰 목록도 무효화 (병원 ID가 있다면)
      if (data.hospitalId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.reviews.hospital(data.hospitalId),
          exact: false,
        });
      }

      // 성공 콜백 호출
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error('Error deleting review:', error.message);
      onError?.(error);
    },
  });
}
