'use client';

import { useQuery } from '@tanstack/react-query';

export interface HospitalReviewStats {
  averageRating: number;
  reviewCount: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface HospitalReviewStatsApiResponse {
  success: boolean;
  data: HospitalReviewStats;
  error?: string;
}

async function fetchHospitalReviewStats(hospitalId: string): Promise<HospitalReviewStats> {
  const response = await fetch(`/api/hospitals/${hospitalId}/review-stats`);

  if (!response.ok) {
    throw new Error('Failed to fetch hospital review stats');
  }

  const result: HospitalReviewStatsApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch hospital review stats');
  }

  return result.data;
}

export function useHospitalReviewStats(hospitalId: string) {
  return useQuery({
    queryKey: ['hospital-review-stats', hospitalId],
    queryFn: () => fetchHospitalReviewStats(hospitalId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
