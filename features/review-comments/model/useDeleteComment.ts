'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';

async function deleteComment({
  reviewId,
  commentId,
}: {
  reviewId: string;
  commentId: string;
}): Promise<void> {
  const response = await fetch(`/api/reviews/${reviewId}/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('로그인이 필요합니다.');
    if (response.status === 403) throw new Error('본인이 작성한 댓글만 삭제할 수 있습니다.');
    throw new Error('댓글 삭제 중 오류가 발생했습니다.');
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || '댓글 삭제 중 오류가 발생했습니다.');
  }
}

interface UseDeleteCommentOptions {
  reviewId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useDeleteComment({ reviewId, onSuccess, onError }: UseDeleteCommentOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment({ reviewId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.review(reviewId),
        exact: false,
      });
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
