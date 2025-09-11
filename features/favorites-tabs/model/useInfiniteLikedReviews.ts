'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import type { ReviewCardData } from 'entities/review/model/types';

interface UseInfiniteLikedReviewsOptions {
  limit?: number;
}

interface LikedReviewsResponse {
  reviews: ReviewCardData[];
  nextCursor?: string;
  hasMore: boolean;
}

// 좋아요한 리뷰 목록 조회 함수
async function fetchLikedReviews(cursor?: string, limit = 10): Promise<LikedReviewsResponse> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    ...(cursor && { cursor }),
  });

  const response = await fetch(`/api/reviews/liked?${params}`);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('로그인이 필요합니다');
    }
    throw new Error('좋아요한 리뷰를 불러오는 중 오류가 발생했습니다');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || '좋아요한 리뷰를 불러오는 중 오류가 발생했습니다');
  }

  return result.data;
}

export function useInfiniteLikedReviews({ limit = 10 }: UseInfiniteLikedReviewsOptions = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.reviews.liked.list({ limit }),
    queryFn: ({ pageParam }) => fetchLikedReviews(pageParam, limit),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    staleTime: 30 * 1000, // 30초
    gcTime: 5 * 60 * 1000, // 5분
    retry: (failureCount, error) => {
      // 401 에러는 재시도하지 않음
      if (error.message.includes('로그인이 필요합니다')) {
        return false;
      }
      return failureCount < 2;
    },
  });
}
