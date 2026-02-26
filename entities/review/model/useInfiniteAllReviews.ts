'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type GetAllReviewsResponse } from './types';
import {
  type ReviewSortOption,
  REVIEW_SORT_OPTIONS,
} from 'shared/model/types/review-query';
import { fetchAllReviews } from '../api/queries/fetch-all-reviews';
import { generateRandomSeed } from 'shared/lib/utils/seed';

export interface UseInfiniteAllReviewsParams {
  limit?: number;
  category?: string;
  sort?: ReviewSortOption;
  hospitalId?: string;
  likedOnly?: boolean;
  initialData?: GetAllReviewsResponse;
}

export function useInfiniteAllReviews({
  limit = 10,
  category,
  sort = 'recommended',
  hospitalId,
  likedOnly = false,
  initialData,
}: UseInfiniteAllReviewsParams = {}) {
  const filters = { limit, category, sort, hospitalId, likedOnly };
  const seedRef = useRef<string>(generateRandomSeed());

  useEffect(() => {
    seedRef.current = generateRandomSeed();
  }, [sort, category, hospitalId, likedOnly, limit]);

  return useInfiniteQuery({
    queryKey: queryKeys.reviews.allInfinite(filters),
    queryFn: ({ pageParam }) =>
      fetchAllReviews({
        pageParam,
        limit,
        category,
        sort,
        seed: sort === REVIEW_SORT_OPTIONS.RECOMMENDED ? seedRef.current : undefined,
        hospitalId,
        likedOnly,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
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
