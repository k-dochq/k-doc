'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPopularReviewsV2, type GetPopularReviewsV2Params } from './get-popular-reviews-v2';

export function usePopularReviewsV2(params: GetPopularReviewsV2Params = {}) {
  return useQuery({
    queryKey: [
      'popular-reviews-v2',
      params.category,
      params.hospitalId,
      params.limit,
      params.hasBothImages,
    ],
    queryFn: () => fetchPopularReviewsV2(params),
    placeholderData: (previousData) => previousData, // 이전 데이터를 placeholder로 유지
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
