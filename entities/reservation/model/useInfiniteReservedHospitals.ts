'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type GetUserReservedHospitalsResponse } from '../api/entities/types';

interface UseInfiniteReservedHospitalsParams extends Record<string, unknown> {
  limit?: number;
}

interface ReservedHospitalsApiResponse {
  success: boolean;
  data: GetUserReservedHospitalsResponse;
  error?: string;
}

async function fetchReservedHospitals({
  pageParam = 1,
  limit = 10,
}: {
  pageParam: number;
} & UseInfiniteReservedHospitalsParams): Promise<GetUserReservedHospitalsResponse> {
  const queryParams = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
  });

  const url = `/api/reservations/hospitals?${queryParams.toString()}`;

  const response = await fetch(url, {
    // Next.js 캐싱: 5분간 캐시, 그 후 재검증
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch reserved hospitals: ${response.status} ${response.statusText}`,
    );
  }

  const result: ReservedHospitalsApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch reserved hospitals');
  }

  return result.data;
}

export function useInfiniteReservedHospitals(params: UseInfiniteReservedHospitalsParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.reservations.hospitalsInfinite(params),
    queryFn: ({ pageParam }) => fetchReservedHospitals({ pageParam, ...params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있으면 현재 페이지 + 1, 없으면 undefined
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
