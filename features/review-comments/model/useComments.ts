'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type CommentListResponse } from 'entities/comment';

interface UseCommentsOptions {
  reviewId: string;
  enabled?: boolean;
}

async function fetchComments({
  reviewId,
  cursor,
  limit = 10,
}: {
  reviewId: string;
  cursor?: string;
  limit?: number;
}): Promise<CommentListResponse['data']> {
  const params = new URLSearchParams();
  if (cursor) params.append('cursor', cursor);
  params.append('limit', limit.toString());

  const response = await fetch(`/api/reviews/${reviewId}/comments?${params.toString()}`);

  if (!response.ok) {
    throw new Error('댓글을 불러오는 중 오류가 발생했습니다.');
  }

  const result: CommentListResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || '댓글을 불러오는 중 오류가 발생했습니다.');
  }

  return result.data;
}

export function useComments({ reviewId, enabled = true }: UseCommentsOptions) {
  return useInfiniteQuery({
    queryKey: queryKeys.comments.reviewInfinite(reviewId, {}),
    queryFn: ({ pageParam }) =>
      fetchComments({
        reviewId,
        cursor: pageParam,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: enabled && !!reviewId,
    staleTime: 30 * 1000, // 30초
    gcTime: 5 * 60 * 1000, // 5분
  });
}
