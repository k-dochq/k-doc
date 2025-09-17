'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPopularReviews, type GetPopularReviewsParams } from './get-popular-reviews';

export function usePopularReviews(params: GetPopularReviewsParams = {}) {
  return useQuery({
    queryKey: ['popular-reviews', params.category, params.limit, params.hasBothImages],
    queryFn: () => fetchPopularReviews(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
