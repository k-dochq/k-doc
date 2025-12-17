'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type GetReservationDetailResponse } from '../api/entities/types';

interface ReservationDetailApiResponse {
  success: boolean;
  data: GetReservationDetailResponse;
  error?: string;
}

async function fetchReservationDetail(
  reservationId: string,
): Promise<GetReservationDetailResponse> {
  const url = `/api/reservations/${reservationId}`;

  const response = await fetch(url, {
    // Next.js 캐싱: 5분간 캐시, 그 후 재검증
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch reservation detail: ${response.status} ${response.statusText}`,
    );
  }

  const result: ReservationDetailApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch reservation detail');
  }

  return result.data;
}

export function useReservationDetail(reservationId: string) {
  return useQuery({
    queryKey: queryKeys.reservations.detail(reservationId),
    queryFn: () => fetchReservationDetail(reservationId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!reservationId, // reservationId가 있을 때만 실행
  });
}
