import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from 'shared/lib/auth/server';
import { prisma } from 'shared/lib/prisma';
import { routeErrorLogger } from 'shared/lib';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/user';
  const method = 'GET';

  try {
    // 사용자 인증 확인
    const authService = new AuthService();
    const user = await authService.getCurrentUser();

    // Prisma를 사용하여 User 테이블에서 사용자 정보 조회
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        email: true,
        nickName: true,
        displayName: true,
        name: true,
        genderType: true,
        phoneNumber: true,
        raw_user_meta_data: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: userData,
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
        error: 'Failed to fetch user data',
        requestId,
      },
      { status: 500 },
    );
  }
}
