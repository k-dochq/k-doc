'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type CreateCommentData, type CreateCommentResponse } from 'entities/comment';

async function createComment({
  reviewId,
  content,
}: CreateCommentData): Promise<CreateCommentResponse['data']> {
  const response = await fetch(`/api/reviews/${reviewId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('로그인이 필요합니다.');
    }
    throw new Error('댓글 작성 중 오류가 발생했습니다.');
  }

  const result: CreateCommentResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || '댓글 작성 중 오류가 발생했습니다.');
  }

  return result.data;
}

interface UseCreateCommentOptions {
  reviewId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useCreateComment({ reviewId, onSuccess, onError }: UseCreateCommentOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: CreateCommentData['content']) => createComment({ reviewId, content }),
    onSuccess: (data) => {
      // 댓글 목록 쿼리 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.review(reviewId),
        exact: false,
      });

      // 리뷰 목록도 invalidate (commentCount 업데이트를 위해)
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.allInfinite({}),
        exact: false,
      });

      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
