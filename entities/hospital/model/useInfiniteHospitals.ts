'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { type MedicalSpecialtyType } from '@prisma/client';
import { queryKeys } from 'shared/lib/query-keys';
import { type GetHospitalsResponse } from '../api/entities/types';

interface UseInfiniteHospitalsParams {
  limit?: number;
  sortBy?: 'createdAt' | 'viewCount' | 'rating';
  sortOrder?: 'asc' | 'desc';
  specialtyType?: MedicalSpecialtyType;
  minRating?: number;
  initialData?: GetHospitalsResponse;
}

interface HospitalsApiResponse {
  success: boolean;
  data: GetHospitalsResponse;
  error?: string;
}

async function fetchHospitals({
  pageParam = 1,
  limit = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  specialtyType,
  minRating = 0,
}: {
  pageParam: number;
} & UseInfiniteHospitalsParams): Promise<GetHospitalsResponse> {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
    sortBy,
    sortOrder,
    minRating: minRating.toString(),
  });

  if (specialtyType) {
    params.append('specialtyType', specialtyType);
  }

  const response = await fetch(`/api/hospitals?${params.toString()}`, {
    // Next.js 캐싱: 5분간 캐시, 그 후 재검증
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch hospitals');
  }

  const result: HospitalsApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch hospitals');
  }

  return result.data;
}

export function useInfiniteHospitals(params: UseInfiniteHospitalsParams = {}) {
  // queryKey를 더 구체적으로 구성하여 파라미터 변경 시 새로운 쿼리로 인식되도록 함
  const filters = {
    limit: params.limit || 10,
    sortBy: params.sortBy || 'createdAt',
    sortOrder: params.sortOrder || 'desc',
    specialtyType: params.specialtyType || null,
    minRating: params.minRating || 0,
  };

  return useInfiniteQuery({
    queryKey: queryKeys.hospitals.infinite(filters),
    queryFn: ({ pageParam }) => fetchHospitals({ pageParam, ...params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있으면 현재 페이지 + 1, 없으면 undefined
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
