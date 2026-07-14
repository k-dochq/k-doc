'use client';

import { useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import {
  patchReviewInCache,
  toggleLikedState,
  findReviewInCache,
  removeReviewFromLikedOnlyLists,
} from '../lib/patch-review-in-cache';

interface UseToggleReviewLikeParams {
  queryParams?: {
    limit?: number;
    sort?: string;
    category?: string;
  };
  /** 낙관적 업데이트(likedUserIds patch)를 위한 현재 로그인 사용자 id */
  userId?: string;
}

interface ToggleReviewLikeResponse {
  success: boolean;
  isLiked: boolean;
  likeCount: number;
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
 * 리뷰 좋아요 토글 뮤테이션 훅
 *
 * 좋아요 토글 시 전체 목록을 invalidate/refetch하지 않고, 캐시에 있는
 * 해당 리뷰만 낙관적으로(optimistic) patch한다. 목록 전체를 다시 불러오면
 * (추천순 랜덤 정렬과 결합될 때) 화면이 다시 마운트되는 것처럼 보이는
 * 문제가 있어, 클릭 즉시 하트 상태만 바뀌고 나머지 화면은 그대로 유지된다.
 */
export function useToggleReviewLike({
  queryParams: _queryParams,
  userId,
}: UseToggleReviewLikeParams = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string): Promise<ToggleReviewLikeResponse> => {
      // API 호출
      const response = await fetch(`/api/reviews/${reviewId}/like`, {
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
        throw new Error('좋아요 처리 중 오류가 발생했습니다');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || '좋아요 처리 중 오류가 발생했습니다');
      }

      return result;
    },
    onMutate: (reviewId: string) => {
      const snapshot = snapshotReviewQueries(queryClient);

      if (userId) {
        const current = findReviewInCache(queryClient, reviewId);
        const alreadyLiked = current?.likedUserIds.includes(userId) ?? false;
        const nextIsLiked = !alreadyLiked;

        patchReviewInCache(queryClient, reviewId, (review) =>
          toggleLikedState(review, userId, nextIsLiked),
        );

        // 찜(좋아요) 취소 시, 찜한 리뷰만 모아 보여주는 목록에서는 즉시 제거한다.
        if (!nextIsLiked) {
          removeReviewFromLikedOnlyLists(queryClient, reviewId);
        }
      }

      return { snapshot };
    },
    onSuccess: (data, reviewId) => {
      // 서버 응답(진짜 상태)으로 최종 반영 (optimistic 값과 다를 경우 보정)
      if (userId) {
        patchReviewInCache(queryClient, reviewId, (review) =>
          toggleLikedState(review, userId, data.isLiked),
        );

        if (!data.isLiked) {
          removeReviewFromLikedOnlyLists(queryClient, reviewId);
        }
      }

      // 리뷰 상세 페이지가 별도로 열려 있을 수 있으므로 해당 쿼리만 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.byId(reviewId),
      });

      // 리뷰 좋아요 상태(상세 하트 버튼) 쿼리도 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviewLike.all,
        exact: false,
      });
    },
    onError: (error: Error, _reviewId, context) => {
      // 실패 시 optimistic update 롤백
      if (context?.snapshot) {
        restoreReviewQueries(queryClient, context.snapshot);
      }
      console.error('좋아요 처리 중 오류:', error.message);
      // alert 대신 에러를 상위 컴포넌트에서 처리하도록 함
      // 401 에러는 상위 컴포넌트에서 LoginRequiredModal로 처리됨
    },
  });
}
