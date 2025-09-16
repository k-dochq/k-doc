'use client';

import { useQuery } from '@tanstack/react-query';
import { type Hospital } from '../api/entities/types';
import { type GetHospitalDetailResponse } from '../api/use-cases/get-hospital-detail';

interface HospitalDetailApiResponse {
  success: boolean;
  data: GetHospitalDetailResponse;
  error?: string;
}

async function fetchHospitalDetail(hospitalId: string): Promise<GetHospitalDetailResponse> {
  const response = await fetch(`/api/hospitals/${hospitalId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: HospitalDetailApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch hospital detail');
  }

  return result.data;
}

export function useHospitalDetail(hospitalId: string) {
  return useQuery({
    queryKey: ['hospital', 'detail', hospitalId],
    queryFn: () => fetchHospitalDetail(hospitalId),
    enabled: !!hospitalId,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
