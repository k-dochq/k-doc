'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type ReviewCardData } from './types';

async function fetchReviewDetail(reviewId: string): Promise<ReviewCardData> {
  const response = await fetch(`/api/reviews/${reviewId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch review detail');
  }
  const json = await response.json();
  return json.data.review as ReviewCardData;
}

export function useGetReviewDetail(reviewId: string, initialData?: ReviewCardData) {
  return useQuery({
    queryKey: queryKeys.reviews.byId(reviewId),
    queryFn: () => fetchReviewDetail(reviewId),
    initialData,
    staleTime: 0,
  });
}
