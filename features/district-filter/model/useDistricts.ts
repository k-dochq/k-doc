'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { fetchParentDistricts, fetchChildDistricts } from '../api/districts';

/**
 * 상위 지역 목록 조회 훅
 */
export function useParentDistricts() {
  return useQuery({
    queryKey: queryKeys.districts.parentDistricts(),
    queryFn: fetchParentDistricts,
    staleTime: 30 * 60 * 1000, // 30분
    gcTime: 60 * 60 * 1000, // 1시간
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * 하위 지역 목록 조회 훅
 */
export function useChildDistricts(parentId: string | null) {
  return useQuery({
    queryKey: queryKeys.districts.childDistricts(parentId!),
    queryFn: () => fetchChildDistricts(parentId!),
    enabled: !!parentId, // parentId가 있을 때만 실행
    staleTime: 30 * 60 * 1000, // 30분
    gcTime: 60 * 60 * 1000, // 1시간
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
