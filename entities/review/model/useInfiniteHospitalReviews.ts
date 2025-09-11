'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type GetHospitalReviewsResponse } from './types';

interface UseInfiniteHospitalReviewsParams {
  hospitalId: string;
  limit?: number;
  initialData?: GetHospitalReviewsResponse;
}

interface HospitalReviewsApiResponse {
  success: boolean;
  data: GetHospitalReviewsResponse;
  error?: string;
}

async function fetchHospitalReviews({
  pageParam = 1,
  hospitalId,
  limit = 10,
}: {
  pageParam: number;
} & UseInfiniteHospitalReviewsParams): Promise<GetHospitalReviewsResponse> {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`/api/hospitals/${hospitalId}/reviews?${params.toString()}`, {
    // Next.js 캐싱: 5분간 캐시, 그 후 재검증
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch hospital reviews');
  }

  const result: HospitalReviewsApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch hospital reviews');
  }

  return result.data;
}

export function useInfiniteHospitalReviews(params: UseInfiniteHospitalReviewsParams) {
  // queryKey를 더 구체적으로 구성하여 파라미터 변경 시 새로운 쿼리로 인식되도록 함
  const filters = {
    limit: params.limit || 10,
  };

  return useInfiniteQuery({
    queryKey: queryKeys.reviews.hospitalInfinite(params.hospitalId, filters),
    queryFn: ({ pageParam }) => fetchHospitalReviews({ pageParam, ...params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있으면 현재 페이지 + 1, 없으면 undefined
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
