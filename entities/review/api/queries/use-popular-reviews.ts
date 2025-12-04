'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPopularReviews, type GetPopularReviewsParams } from './get-popular-reviews';

export function usePopularReviews(params: GetPopularReviewsParams = {}) {
  return useQuery({
    queryKey: ['popular-reviews', params.category, params.limit, params.hasBothImages],
    queryFn: () => fetchPopularReviews(params),
    placeholderData: (previousData) => previousData, // 이전 데이터를 placeholder로 유지
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
