'use client';

import { useQuery } from '@tanstack/react-query';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type HospitalCardData } from 'shared/model/types';

export interface GetBestHospitalsParams {
  category?: MedicalSpecialtyType | 'ALL';
  limit?: number;
}

export interface GetBestHospitalsResponse {
  success: boolean;
  data: HospitalCardData[];
}

export async function fetchBestHospitals(
  params: GetBestHospitalsParams = {},
): Promise<HospitalCardData[]> {
  const { category = 'ALL', limit = 5 } = params;

  const searchParams = new URLSearchParams();
  searchParams.set('category', category);
  searchParams.set('limit', limit.toString());

  const response = await fetch(`/api/hospitals/best?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch best hospitals');
  }

  const result: GetBestHospitalsResponse = await response.json();

  if (!result.success) {
    throw new Error('Failed to fetch best hospitals');
  }

  return result.data;
}

export function useBestHospitals(
  params: GetBestHospitalsParams = {},
  options?: {
    initialData?: HospitalCardData[];
  },
) {
  return useQuery({
    queryKey: ['best-hospitals', params.category, params.limit],
    queryFn: () => fetchBestHospitals(params),
    initialData: options?.initialData,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false, // 창 포커스 시 자동 refetch 방지
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
