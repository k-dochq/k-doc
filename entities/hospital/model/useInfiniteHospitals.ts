'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { type MedicalSpecialtyType } from '@prisma/client';
import { queryKeys } from 'shared/lib/query-keys';
import { type GetHospitalsResponse } from '../api/entities/types';
import {
  type HospitalSortOption,
  type SortOrderOption,
  DEFAULT_HOSPITAL_QUERY_PARAMS,
} from 'shared/model/types/hospital-query';
import { buildHospitalQueryString } from 'shared/lib/hospital-query-utils';

interface UseInfiniteHospitalsParams extends Record<string, unknown> {
  limit?: number;
  sortBy?: HospitalSortOption;
  sortOrder?: SortOrderOption;
  category?: MedicalSpecialtyType;
  search?: string;
}

interface HospitalsApiResponse {
  success: boolean;
  data: GetHospitalsResponse;
  error?: string;
}

async function fetchHospitals({
  pageParam = 1,
  limit = DEFAULT_HOSPITAL_QUERY_PARAMS.limit,
  sortBy = DEFAULT_HOSPITAL_QUERY_PARAMS.sort,
  sortOrder = DEFAULT_HOSPITAL_QUERY_PARAMS.sortOrder,
  category,
  search,
}: {
  pageParam: number;
} & UseInfiniteHospitalsParams): Promise<GetHospitalsResponse> {
  // 타입 안전한 쿼리 스트링 생성
  const queryParams = {
    page: pageParam,
    limit,
    sort: sortBy,
    sortOrder,
    category,
    search,
  };

  const queryString = buildHospitalQueryString(queryParams);
  const url = `/api/hospitals${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    // Next.js 캐싱: 5분간 캐시, 그 후 재검증
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch hospitals: ${response.status} ${response.statusText}`);
  }

  const result: HospitalsApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch hospitals');
  }

  return result.data;
}

export function useInfiniteHospitals(params: UseInfiniteHospitalsParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.hospitals.infinite(params),
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
