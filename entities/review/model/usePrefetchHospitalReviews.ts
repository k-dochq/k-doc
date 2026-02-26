'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { fetchAllReviews } from '../api/queries/fetch-all-reviews';
import { createHospitalReviewsInfiniteQueryParams } from '../lib/query-params';

interface UsePrefetchHospitalReviewsParams {
  hospitalId: string;
  sort?: ReviewSortOption;
  limit?: number;
  enabled?: boolean;
}

/**
 * 병원 리뷰 무한 스크롤 데이터 prefetch 훅
 * 병원 상세 페이지에서 리뷰 페이지로 이동할 때 빠른 로딩을 위해 사용
 */
export function usePrefetchHospitalReviews({
  hospitalId,
  sort = REVIEW_SORT_OPTIONS.POPULAR,
  limit = 10,
  enabled = true,
}: UsePrefetchHospitalReviewsParams) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || !hospitalId) return;

    const prefetchHospitalReviews = async () => {
      try {
        // 공통 쿼리 파라미터 생성
        const queryParams = createHospitalReviewsInfiniteQueryParams(hospitalId, sort, limit);

        await queryClient.prefetchInfiniteQuery({
          queryKey: queryKeys.reviews.allInfinite(queryParams),
          queryFn: ({ pageParam = 1 }) =>
            fetchAllReviews({
              pageParam,
              ...queryParams,
            }),
          initialPageParam: 1,
        });
      } catch (error) {
        console.warn('Failed to prefetch hospital reviews:', error);
      }
    };

    prefetchHospitalReviews();
  }, [queryClient, hospitalId, sort, limit, enabled]);
}
