'use client';

import { useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { patchReviewInCache, toggleRecommendedState } from '../lib/patch-review-in-cache';

interface UseToggleReviewRecommendParams {
  queryParams?: {
    limit?: number;
    sort?: string;
    category?: string;
  };
  /** 낙관적 업데이트(recommendedUserIds patch)를 위한 현재 로그인 사용자 id */
  userId?: string;
}

interface ToggleReviewRecommendResponse {
  success: boolean;
  isRecommended: boolean;
}

type ReviewQuerySnapshot = ReturnType<QueryClient['getQueriesData']>;

function snapshotReviewQueries(queryClient: QueryClient): ReviewQuerySnapshot {
  return queryClient.getQueriesData({
    predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === 'reviews',
  });
}

function restoreReviewQueries(queryClient: QueryClient, snapshot: ReviewQuerySnapshot) {
  snapshot.forEach(([key, data]) => {
    queryClient.setQueryData(key, data);
  });
}

/**
 * 리뷰 추천 토글 뮤테이션 훅
 *
 * 좋아요 토글과 동일하게, 전체 목록을 invalidate/refetch하지 않고
 * 캐시에 있는 해당 리뷰만 낙관적으로(optimistic) patch한다.
 */
export function useToggleReviewRecommend({
  queryParams: _queryParams,
  userId,
}: UseToggleReviewRecommendParams = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string): Promise<ToggleReviewRecommendResponse> => {
      const response = await fetch(`/api/reviews/${reviewId}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('로그인이 필요합니다');
        }
        if (response.status === 404) {
          throw new Error('리뷰를 찾을 수 없습니다');
        }
        throw new Error('추천 처리 중 오류가 발생했습니다');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || '추천 처리 중 오류가 발생했습니다');
      }

      return result;
    },
    onMutate: (reviewId: string) => {
      const snapshot = snapshotReviewQueries(queryClient);

      if (userId) {
        patchReviewInCache(queryClient, reviewId, (review) => {
          const alreadyRecommended = review.recommendedUserIds.includes(userId);
          return toggleRecommendedState(review, userId, !alreadyRecommended);
        });
      }

      return { snapshot };
    },
    onSuccess: (data, reviewId) => {
      // 서버 응답(진짜 상태)으로 최종 반영 (recommendCount는 서버가 내려주지 않아 optimistic 값 유지)
      if (userId) {
        patchReviewInCache(queryClient, reviewId, (review) =>
          toggleRecommendedState(review, userId, data.isRecommended),
        );
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.byId(reviewId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviewRecommend.all,
        exact: false,
      });
    },
    onError: (error: Error, _reviewId, context) => {
      if (context?.snapshot) {
        restoreReviewQueries(queryClient, context.snapshot);
      }
      console.error('추천 처리 중 오류:', error.message);
    },
  });
}
