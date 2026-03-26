import { prisma } from 'shared/lib/prisma';

interface DeleteCommentParams {
  commentId: string;
  userId: string;
}

export async function deleteComment({ commentId, userId }: DeleteCommentParams): Promise<void> {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { userId: true, reviewId: true, isDeleted: true },
  });

  if (!comment || comment.isDeleted) {
    throw new Error('댓글을 찾을 수 없습니다.');
  }

  if (comment.userId !== userId) {
    throw new Error('본인이 작성한 댓글만 삭제할 수 있습니다.');
  }

  await prisma.$transaction(async (tx) => {
    await tx.comment.update({
      where: { id: commentId },
      data: { isDeleted: true, updatedAt: new Date() },
    });

    await tx.review.update({
      where: { id: comment.reviewId },
      data: { commentCount: { decrement: 1 } },
    });
  });
}
