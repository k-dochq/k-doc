'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { type GetAllReviewsResponse } from './types';

interface UseInfiniteAllReviewsParams {
  limit?: number;
  medicalSpecialtyId?: string;
  sortBy?: 'latest' | 'popular';
  initialData?: GetAllReviewsResponse;
}

interface AllReviewsApiResponse {
  success: boolean;
  data: GetAllReviewsResponse;
  error?: string;
}

async function fetchAllReviews({
  pageParam = 1,
  limit = 10,
  medicalSpecialtyId,
  sortBy = 'latest',
}: {
  pageParam: number;
} & UseInfiniteAllReviewsParams): Promise<GetAllReviewsResponse> {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
    sortBy,
  });

  if (medicalSpecialtyId) {
    params.append('medicalSpecialtyId', medicalSpecialtyId);
  }

  const response = await fetch(`/api/reviews?${params.toString()}`, {
    // Next.js 캐싱: 5분간 캐시, 그 후 재검증
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: AllReviewsApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch reviews');
  }

  return result.data;
}

export function useInfiniteAllReviews({
  limit = 10,
  medicalSpecialtyId,
  sortBy = 'latest',
  initialData,
}: UseInfiniteAllReviewsParams = {}) {
  return useInfiniteQuery({
    queryKey: ['reviews', 'infinite', { limit, medicalSpecialtyId, sortBy }],
    queryFn: ({ pageParam }) =>
      fetchAllReviews({
        pageParam,
        limit,
        medicalSpecialtyId,
        sortBy,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분 (formerly cacheTime)
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...(initialData && {
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
    }),
  });
}
