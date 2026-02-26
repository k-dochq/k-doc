'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type GetUserReservationsResponse } from '../api/entities/types';

interface UseInfiniteReservationsParams extends Record<string, unknown> {
  limit?: number;
  /** 리뷰 작성 여부 필터 (true: 작성한 병원만, false: 미작성 병원만, undefined: 전체) */
  hasReviewed?: boolean;
}

interface ReservationsApiResponse {
  success: boolean;
  data: GetUserReservationsResponse;
  error?: string;
}

async function fetchReservations({
  pageParam = 1,
  limit = 10,
  hasReviewed,
}: {
  pageParam: number;
} & UseInfiniteReservationsParams): Promise<GetUserReservationsResponse> {
  const queryParams = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
  });
  if (hasReviewed !== undefined) {
    queryParams.append('hasReviewed', String(hasReviewed));
  }

  const url = `/api/reservations?${queryParams.toString()}`;

  const response = await fetch(url, {
    // Next.js 캐싱: 5분간 캐시, 그 후 재검증
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch reservations: ${response.status} ${response.statusText}`);
  }

  const result: ReservationsApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch reservations');
  }

  return result.data;
}

export function useInfiniteReservations(params: UseInfiniteReservationsParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.reservations.infinite(params),
    queryFn: ({ pageParam }) => fetchReservations({ pageParam, ...params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있으면 현재 페이지 + 1, 없으면 undefined
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
