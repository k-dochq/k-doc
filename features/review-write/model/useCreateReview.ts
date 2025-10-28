'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import {
  type CreateReviewRequest,
  type CreateReviewResponse,
} from 'entities/review/api/entities/types';

interface UseCreateReviewOptions {
  onSuccess?: (reviewId: string, hospitalId: string) => void;
  onError?: (error: Error) => void;
}

export function useCreateReview({ onSuccess, onError }: UseCreateReviewOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateReviewRequest): Promise<CreateReviewResponse> => {
      const response = await fetch('/api/reviews/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit review');
      }

      return result;
    },
    onSuccess: (data, variables) => {
      // 리뷰 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
        exact: false,
      });

      // 병원 리뷰 목록도 무효화
      if (variables.hospitalId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.reviews.hospital(variables.hospitalId),
          exact: false,
        });
      }

      // 성공 콜백 호출
      if (data.reviewId && variables.hospitalId) {
        onSuccess?.(data.reviewId, variables.hospitalId);
      }
    },
    onError: (error: Error) => {
      console.error('Submit review error:', error);
      onError?.(error);
    },
  });
}
