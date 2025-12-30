'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type GetHospitalDetailResponse } from '../use-cases/get-hospital-detail';

export interface GetHospitalDetailApiResponse {
  success: boolean;
  data: GetHospitalDetailResponse;
}

/**
 * API route를 통해 병원 상세 정보를 조회합니다.
 */
export async function fetchHospitalDetail(id: string): Promise<GetHospitalDetailResponse> {
  const response = await fetch(`/api/hospitals/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch hospital detail');
  }

  const result: GetHospitalDetailApiResponse = await response.json();

  if (!result.success) {
    throw new Error('Failed to fetch hospital detail');
  }

  return result.data;
}

/**
 * 병원 상세 정보를 조회하는 TanStack Query hook입니다.
 */
export function useHospitalDetail(hospitalId: string) {
  return useQuery({
    queryKey: queryKeys.hospitals.detail(hospitalId),
    queryFn: () => fetchHospitalDetail(hospitalId),
    placeholderData: (previousData) => previousData, // 이전 데이터를 placeholder로 유지
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
