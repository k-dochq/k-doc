import { prisma } from 'shared/lib/prisma';
import { type LocalizedText } from 'shared/lib/localized-text';
import { type Comment, type CreateCommentData } from '../../types';
import { type Prisma } from '@prisma/client';

interface CreateCommentParams extends CreateCommentData {
  userId: string;
}

// Prisma에서 생성된 댓글 타입 정의
type CommentWithUser = Prisma.CommentGetPayload<{
  include: {
    User: {
      select: {
        id: true;
        displayName: true;
        name: true;
        nickName: true;
      };
    };
  };
}>;

export async function createComment({
  content,
  reviewId,
  userId,
}: CreateCommentParams): Promise<Comment> {
  try {
    // 트랜잭션으로 댓글 생성 및 리뷰의 commentCount 업데이트
    const result = await prisma.$transaction(async (tx) => {
      // 댓글 생성 - 현재 스키마 기준으로 필요한 모든 필드 포함
      const commentData: Prisma.CommentUncheckedCreateInput = {
        id: crypto.randomUUID(), // UUID 수동 생성
        content: content as Prisma.InputJsonValue,
        reviewId,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      };

      const comment = await tx.comment.create({
        data: commentData,
        include: {
          User: {
            select: {
              id: true,
              displayName: true,
              name: true,
              nickName: true,
            },
          },
        },
      });

      // 리뷰의 commentCount 증가
      await tx.review.update({
        where: { id: reviewId },
        data: {
          commentCount: {
            increment: 1,
          },
        },
      });

      return comment;
    });

    // Prisma 타입을 Comment 타입으로 변환
    const typedResult = result as CommentWithUser;

    return {
      id: typedResult.id,
      content: typedResult.content as LocalizedText,
      userId: typedResult.userId,
      reviewId: typedResult.reviewId,
      createdAt: typedResult.createdAt,
      updatedAt: typedResult.updatedAt,
      isDeleted: typedResult.isDeleted,
      user: typedResult.User,
    };
  } catch (error) {
    console.error('Error creating comment:', error);
    throw new Error('댓글 작성 중 오류가 발생했습니다.');
  }
}
