'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import type { ConsultationHospitalResponse } from 'features/consultation-hospitals/api/entities/types';

// 상담중인 병원 타입 (API 타입 재사용)
export type ConsultationHospital = ConsultationHospitalResponse;

// API 함수
const fetchConsultationHospitals = async (): Promise<ConsultationHospital[]> => {
  const response = await fetch('/api/consultation-hospitals');

  if (!response.ok) {
    throw new Error('Failed to fetch consultation hospitals');
  }

  const result = await response.json();
  return result.data || [];
};

// 상담중인 병원 목록 훅
export function useConsultationHospitals() {
  return useQuery<ConsultationHospital[], Error>({
    queryKey: queryKeys.consultationHospitals.all(),
    queryFn: fetchConsultationHospitals,
    staleTime: 30 * 1000, // 30초
    gcTime: 5 * 60 * 1000, // 5분
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
