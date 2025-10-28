'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';

interface UseDeleteReviewParams {
  onSuccess?: () => void;
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
        if (response.status === 401) {
          throw new Error('Login required');
        }
        if (response.status === 403) {
          throw new Error('Only the author can delete this review');
        }
        if (response.status === 404) {
          throw new Error('Review not found');
        }
        throw new Error('Failed to delete review');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete review');
      }

      return result;
    },
    onSuccess: () => {
      // 리뷰 관련 모든 쿼리 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
        exact: false,
      });

      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error('Error deleting review:', error.message);
      onError?.(error);
    },
  });
}
