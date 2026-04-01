'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { type GetAllReviewsResponse } from '../../model/types';

interface UseInfiniteSearchReviewsParams {
  query: string;
  limit?: number;
}

async function fetchSearchReviews({
  query,
  page,
  limit = 10,
}: {
  query: string;
  page: number;
  limit?: number;
}): Promise<GetAllReviewsResponse> {
  const params = new URLSearchParams({ q: query, page: String(page), limit: String(limit) });
  const response = await fetch(`/api/v2/search/reviews?${params.toString()}`);

  if (!response.ok) throw new Error('Failed to search reviews');

  const result = (await response.json()) as { success: boolean; data: GetAllReviewsResponse };
  if (!result.success) throw new Error('Failed to search reviews');
  return result.data;
}

export function useInfiniteSearchReviews({ query, limit = 10 }: UseInfiniteSearchReviewsParams) {
  return useInfiniteQuery({
    queryKey: ['reviews', 'v2', 'search', 'infinite', { query, limit }],
    queryFn: ({ pageParam }) => fetchSearchReviews({ query, page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined),
    enabled: query.length > 0,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
}
