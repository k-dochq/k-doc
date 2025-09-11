'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { LikedHospital, LikedHospitalsResult } from '../api/entities/types';

interface LikedHospitalsParams {
  limit?: number;
}

interface LikedHospitalsResponse {
  hospitals: LikedHospital[];
  totalCount: number;
  hasNextPage: boolean;
  nextPage: number | null;
}

async function fetchLikedHospitals({
  pageParam = 1,
  limit = 10,
}: {
  pageParam: number;
  limit: number;
}): Promise<LikedHospitalsResponse> {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`/api/hospitals/liked?${params.toString()}`);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('로그인이 필요합니다.');
    }
    throw new Error('좋아요한 병원을 불러오는데 실패했습니다.');
  }

  return response.json();
}

export function useInfiniteLikedHospitals(params: LikedHospitalsParams = {}) {
  const { limit = 10 } = params;

  return useInfiniteQuery({
    queryKey: ['hospitals', 'liked', { limit }],
    queryFn: ({ pageParam = 1 }) => fetchLikedHospitals({ pageParam, limit }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
