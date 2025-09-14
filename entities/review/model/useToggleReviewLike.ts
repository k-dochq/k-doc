'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { queryKeys } from 'shared/lib/query-keys';
import type { User } from '@supabase/supabase-js';

interface UseToggleReviewLikeParams {
  queryParams: {
    limit: number;
    sort?: string;
    category?: string;
  };
  user: User | null;
}

/**
 * 리뷰 좋아요 토글 뮤테이션 훅
 */
export function useToggleReviewLike({ queryParams, user }: UseToggleReviewLikeParams) {
  const queryClient = useQueryClient();
  const router = useLocalizedRouter();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      // 로그인 체크
      if (!user) {
        // 현재 페이지 URL을 redirect 파라미터로 설정
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
        return Promise.reject(new Error('로그인이 필요합니다'));
      }

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
    onSuccess: () => {
      // 리뷰 관련 모든 쿼리 invalidate (리스트, 상세, 좋아요한 리뷰 등)
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
        exact: false, // 모든 reviews 관련 쿼리를 invalidate
      });

      // 좋아요한 리뷰 리스트 쿼리도 별도로 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.liked.all(),
        exact: false, // 모든 liked reviews 쿼리를 invalidate
      });

      // 리뷰 좋아요 상태 쿼리도 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviewLike.all,
        exact: false, // 모든 review-like 쿼리를 invalidate
      });
    },
    onError: (error: Error) => {
      console.error('좋아요 처리 중 오류:', error.message);
      alert(error.message);
    },
  });
}
