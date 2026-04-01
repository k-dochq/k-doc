'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type ReviewSortOption } from 'shared/model/types/review-query';
import { type GetAllReviewsResponse } from '../../model/types';

interface UseInfiniteSearchReviewsParams {
  query: string;
  limit?: number;
  categories?: MedicalSpecialtyType[];
  sort?: ReviewSortOption;
}

async function fetchSearchReviews({
  query,
  page,
  limit = 10,
  categories,
  sort,
}: {
  query: string;
  page: number;
  limit?: number;
  categories?: MedicalSpecialtyType[];
  sort?: ReviewSortOption;
}): Promise<GetAllReviewsResponse> {
  const params = new URLSearchParams({ q: query, page: String(page), limit: String(limit) });
  if (categories && categories.length > 0) params.set('categories', categories.join(','));
  if (sort) params.set('sort', sort);
  const response = await fetch(`/api/v2/search/reviews?${params.toString()}`);

  if (!response.ok) throw new Error('Failed to search reviews');

  const result = (await response.json()) as { success: boolean; data: GetAllReviewsResponse };
  if (!result.success) throw new Error('Failed to search reviews');
  return result.data;
}

export function useInfiniteSearchReviews({ query, limit = 10, categories, sort }: UseInfiniteSearchReviewsParams) {
  return useInfiniteQuery({
    queryKey: ['reviews', 'v2', 'search', 'infinite', { query, limit, categories, sort }],
    queryFn: ({ pageParam }) => fetchSearchReviews({ query, page: pageParam, limit, categories, sort }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined),
    enabled: query.length > 0,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
}
