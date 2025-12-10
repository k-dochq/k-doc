'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { getHospitalVideos } from '../api/use-cases/get-hospital-videos';

export function useHospitalVideos(hospitalId: string) {
  return useQuery({
    queryKey: queryKeys.hospitals.detailVideos
      ? queryKeys.hospitals.detailVideos(hospitalId)
      : ['hospital', 'videos', hospitalId],
    queryFn: () => getHospitalVideos(hospitalId),
    enabled: !!hospitalId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 15000),
  });
}
