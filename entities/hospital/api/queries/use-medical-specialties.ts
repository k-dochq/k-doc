'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMedicalSpecialties } from './get-medical-specialties';

export function useMedicalSpecialties() {
  return useQuery({
    queryKey: ['medical-specialties'],
    queryFn: () => fetchMedicalSpecialties(),
    staleTime: 60 * 60 * 1000, // 1시간 - 데이터가 오래된 것으로 간주되기 전까지의 시간
    gcTime: 24 * 60 * 60 * 1000, // 24시간 - 캐시에서 제거되기 전까지의 시간
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
