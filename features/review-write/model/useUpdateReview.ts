'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import {
  type UpdateReviewRequest,
  type UpdateReviewResponse,
} from 'entities/review/api/entities/types';

interface UseUpdateReviewOptions {
  onSuccess?: (reviewId: string) => void;
  onError?: (error: Error) => void;
}

export function useUpdateReview({ onSuccess, onError }: UseUpdateReviewOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reviewId,
      data,
    }: {
      reviewId: string;
      data: UpdateReviewRequest;
    }): Promise<UpdateReviewResponse> => {
      const response = await fetch(`/api/reviews/${reviewId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to update review');
      }

      return result;
    },
    onSuccess: (data, variables) => {
      // 리뷰 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
        exact: false,
      });

      // 리뷰 상세 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.byId(variables.reviewId),
        exact: false,
      });

      // review-detail 쿼리도 무효화 (useReviewDetail에서 사용)
      queryClient.invalidateQueries({
        queryKey: ['review-detail', variables.reviewId],
        exact: false,
      });

      // 내가 작성한 리뷰 목록도 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.myInfinite({}),
        exact: false,
      });

      // 성공 콜백 호출
      if (data.reviewId) {
        onSuccess?.(data.reviewId);
      }
    },
    onError: (error: Error) => {
      console.error('Update review error:', error);
      onError?.(error);
    },
  });
}
