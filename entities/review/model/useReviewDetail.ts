'use client';

import { useQuery } from '@tanstack/react-query';
import { type GetReviewDetailResponse } from '../api/use-cases/get-review-detail';

export interface UseReviewDetailParams {
  reviewId: string;
  enabled?: boolean;
}

interface ReviewDetailApiResponse {
  success: boolean;
  data: GetReviewDetailResponse;
  error?: string;
}

async function fetchReviewDetail(reviewId: string): Promise<GetReviewDetailResponse> {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    // Next.js 캐싱: 5분간 캐시, 그 후 재검증
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: ReviewDetailApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch review detail');
  }

  return result.data;
}

export function useReviewDetail({ reviewId, enabled = true }: UseReviewDetailParams) {
  return useQuery({
    queryKey: ['review-detail', reviewId],
    queryFn: () => fetchReviewDetail(reviewId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: enabled && !!reviewId, // reviewId가 있고 enabled가 true일 때만 실행
  });
}
