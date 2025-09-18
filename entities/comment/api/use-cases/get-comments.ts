import { prisma } from 'shared/lib/prisma';
import { type LocalizedText } from 'shared/lib/localized-text';
import { type Comment, type CommentQueryParams } from '../../types';
import { type Prisma } from '@prisma/client';

interface GetCommentsParams extends CommentQueryParams {
  reviewId: string;
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

export async function getComments({ reviewId, cursor, limit = 10 }: GetCommentsParams): Promise<{
  comments: Comment[];
  total: number;
  hasMore: boolean;
  nextCursor?: string;
}> {
  try {
    // 전체 댓글 수 조회
    const total = await prisma.comment.count({
      where: {
        reviewId,
        isDeleted: false,
      },
    });

    // 댓글 조회 (최신순)
    const comments = await prisma.comment.findMany({
      where: {
        reviewId,
        isDeleted: false,
        ...(cursor && {
          createdAt: {
            lt: new Date(cursor),
          },
        }),
      },
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
      orderBy: {
        createdAt: 'desc',
      },
      take: limit + 1, // hasMore 판단을 위해 +1
    });

    const hasMore = comments.length > limit;
    const resultComments = hasMore ? comments.slice(0, limit) : comments;
    const nextCursor = hasMore
      ? resultComments[resultComments.length - 1]?.createdAt.toISOString()
      : undefined;

    return {
      comments: resultComments.map((comment: any): Comment => {
        const typedComment = comment as CommentWithUser;
        return {
          id: typedComment.id,
          content: typedComment.content as LocalizedText,
          userId: typedComment.userId,
          reviewId: typedComment.reviewId,
          createdAt: typedComment.createdAt,
          updatedAt: typedComment.updatedAt,
          isDeleted: typedComment.isDeleted,
          user: typedComment.User,
        };
      }),
      total,
      hasMore,
      nextCursor,
    };
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error('댓글을 불러오는 중 오류가 발생했습니다.');
  }
}
