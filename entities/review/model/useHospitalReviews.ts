'use client';

import { useQuery } from '@tanstack/react-query';
import { type ReviewCardData } from '../model/types';

interface UseHospitalReviewsParams {
  hospitalId: string;
  page?: number;
  limit?: number;
  excludeReviewId?: string;
}

interface HospitalReviewsResponse {
  success: boolean;
  data: {
    reviews: ReviewCardData[];
    total: number;
    hasMore: boolean;
  };
}

async function fetchHospitalReviews({
  hospitalId,
  page = 1,
  limit = 10,
  excludeReviewId,
}: UseHospitalReviewsParams): Promise<HospitalReviewsResponse> {
  // 클라이언트 사이드에서만 실행되도록 보호
  if (typeof window === 'undefined') {
    throw new Error('fetchHospitalReviews can only be called on the client side');
  }

  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (excludeReviewId) {
    searchParams.append('excludeReviewId', excludeReviewId);
  }

  const response = await fetch(`/api/hospitals/${hospitalId}/reviews?${searchParams}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch hospital reviews');
  }

  return response.json();
}

export function useHospitalReviews({
  hospitalId,
  page = 1,
  limit = 10,
  excludeReviewId,
}: UseHospitalReviewsParams) {
  return useQuery({
    queryKey: ['hospital-reviews', hospitalId, { page, limit, excludeReviewId }],
    queryFn: () => fetchHospitalReviews({ hospitalId, page, limit, excludeReviewId }),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!hospitalId, // hospitalId가 있을 때만 실행
  });
}
