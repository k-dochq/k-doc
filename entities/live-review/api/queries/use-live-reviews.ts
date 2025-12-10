'use client';

import { useQuery } from '@tanstack/react-query';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type LiveReviewData } from '../use-cases/get-live-reviews';

export interface GetLiveReviewsParams {
  category?: MedicalSpecialtyType | 'ALL';
  hospitalId?: string;
  limit?: number;
  page?: number;
}

export interface GetLiveReviewsApiResponse {
  success: boolean;
  data: {
    liveReviews: LiveReviewData[];
    page: number;
    limit: number;
  };
}

export async function fetchLiveReviews(
  params: GetLiveReviewsParams = {},
): Promise<LiveReviewData[]> {
  const { category = 'ALL', hospitalId, limit = 3, page = 1 } = params;

  const searchParams = new URLSearchParams();
  searchParams.set('category', category);
  if (hospitalId) {
    searchParams.set('hospitalId', hospitalId);
  }
  searchParams.set('limit', limit.toString());
  searchParams.set('page', page.toString());

  const response = await fetch(`/api/live-reviews?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch live reviews');
  }

  const result: GetLiveReviewsApiResponse = await response.json();

  if (!result.success) {
    throw new Error('Failed to fetch live reviews');
  }

  return result.data.liveReviews;
}

export function useLiveReviews(
  params: GetLiveReviewsParams = {},
  options?: {
    initialData?: LiveReviewData[];
  },
) {
  return useQuery({
    queryKey: ['live-reviews', params.category, params.hospitalId, params.limit, params.page],
    queryFn: () => fetchLiveReviews(params),
    initialData: options?.initialData,
    placeholderData: (previousData) => previousData, // 이전 데이터를 placeholder로 유지
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false, // 창 포커스 시 자동 refetch 방지
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
