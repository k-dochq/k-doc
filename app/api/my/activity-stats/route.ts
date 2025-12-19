import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from 'shared/lib/auth/server';
import { prisma } from 'shared/lib/prisma';
import { routeErrorLogger } from 'shared/lib';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/my/activity-stats';
  const method = 'GET';

  try {
    // 사용자 인증 확인
    const authService = new AuthService();
    const user = await authService.getCurrentUser();

    // 내가 작성한 리뷰 개수 조회
    const myPostsCount = await prisma.review.count({
      where: {
        userId: user.id,
      },
    });

    // 상담 채팅 목록 개수 조회 (고유한 hospitalId 개수)
    const consultationChatGroups = await prisma.consultationMessage.groupBy({
      by: ['hospitalId'],
      where: {
        userId: user.id,
      },
    });

    const consultationChatCount = consultationChatGroups.length;

    return NextResponse.json({
      success: true,
      data: {
        myPostsCount,
        consultationChatCount,
      },
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    // 인증 에러 처리
    if (error instanceof Error && error.message.includes('not authenticated')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          requestId,
        },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch activity stats',
        requestId,
      },
      { status: 500 },
    );
  }
}
