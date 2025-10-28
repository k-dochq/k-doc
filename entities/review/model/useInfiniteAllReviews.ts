'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type GetAllReviewsResponse } from './types';

interface UseInfiniteAllReviewsParams {
  limit?: number;
  category?: string;
  sort?: 'popular' | 'recommended' | 'latest';
  hospitalId?: string;
  likedOnly?: boolean;
  initialData?: GetAllReviewsResponse;
}

interface AllReviewsApiResponse {
  success: boolean;
  data: GetAllReviewsResponse;
  error?: string;
}

export async function fetchAllReviews({
  pageParam = 1,
  limit = 10,
  category,
  sort = 'popular',
  hospitalId,
  likedOnly = false,
}: {
  pageParam: number;
} & UseInfiniteAllReviewsParams): Promise<GetAllReviewsResponse> {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
    sort,
  });

  if (category) {
    params.append('category', category);
  }

  if (hospitalId) {
    params.append('hospitalId', hospitalId);
  }

  if (likedOnly) {
    params.append('likedOnly', 'true');
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
  category,
  sort = 'popular',
  hospitalId,
  likedOnly = false,
  initialData,
}: UseInfiniteAllReviewsParams = {}) {
  const filters = { limit, category, sort, hospitalId, likedOnly };

  return useInfiniteQuery({
    queryKey: queryKeys.reviews.allInfinite(filters),
    queryFn: ({ pageParam }) =>
      fetchAllReviews({
        pageParam,
        limit,
        category,
        sort,
        hospitalId,
        likedOnly,
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
