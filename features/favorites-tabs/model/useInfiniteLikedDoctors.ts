'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import type { LikedDoctorsRequest, LikedDoctorsResult } from '../api/entities/types';

/**
 * 좋아요한 의사 목록 조회 함수
 */
async function fetchLikedDoctors({
  pageParam = 1,
  limit = 10,
}: {
  pageParam: number;
  limit: number;
}): Promise<LikedDoctorsResult> {
  const url = new URL('/api/doctors/liked', window.location.origin);
  url.searchParams.set('page', pageParam.toString());
  url.searchParams.set('limit', limit.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('로그인이 필요합니다');
    }
    throw new Error('좋아요한 의사 목록을 불러올 수 없습니다');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || '좋아요한 의사 목록을 불러올 수 없습니다');
  }

  return result.data;
}

export interface LikedDoctorsParams {
  limit?: number;
}

export function useInfiniteLikedDoctors(params: LikedDoctorsParams = {}) {
  const { limit = 10 } = params;

  return useInfiniteQuery({
    queryKey: queryKeys.doctors.liked.list({ limit }),
    queryFn: ({ pageParam }) =>
      fetchLikedDoctors({
        pageParam,
        limit,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분 (formerly cacheTime)
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
