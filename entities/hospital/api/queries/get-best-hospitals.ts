'use client';

import { useQuery } from '@tanstack/react-query';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type BestHospital } from 'shared/model/types';

export interface GetBestHospitalsParams {
  category?: MedicalSpecialtyType | 'ALL';
  limit?: number;
}

export interface GetBestHospitalsResponse {
  success: boolean;
  data: BestHospital[];
}

export async function fetchBestHospitals(
  params: GetBestHospitalsParams = {},
): Promise<BestHospital[]> {
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

export function useBestHospitals(params: GetBestHospitalsParams = {}) {
  return useQuery({
    queryKey: ['best-hospitals', params.category, params.limit],
    queryFn: () => fetchBestHospitals(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
