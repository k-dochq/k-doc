'use client';

import { useQuery } from '@tanstack/react-query';
import { type ReviewImage } from './types';

interface ReviewImagesApiResponse {
  success: boolean;
  data?: {
    reviewId: string;
    images: {
      before: ReviewImage[];
      after: ReviewImage[];
    };
  };
  error?: string;
}

export interface UseReviewImagesParams {
  reviewId: string;
  enabled?: boolean;
}

async function fetchReviewImages(reviewId: string) {
  const response = await fetch(`/api/reviews/${reviewId}/images`, {
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: ReviewImagesApiResponse = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to fetch review images');
  }

  return result.data.images;
}

export function useReviewImages({ reviewId, enabled = true }: UseReviewImagesParams) {
  return useQuery({
    queryKey: ['review-images', reviewId],
    queryFn: () => fetchReviewImages(reviewId),
    enabled: enabled && !!reviewId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
