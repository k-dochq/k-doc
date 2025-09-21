import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from 'shared/lib/auth/server';
import { prisma } from 'shared/lib/prisma';
import { routeErrorLogger } from 'shared/lib';

interface UpdateUserRequest {
  nickName?: string;
  displayName?: string;
  name?: string;
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/user/update';
  const method = 'PUT';

  try {
    // 사용자 인증 확인
    const authService = new AuthService();
    const user = await authService.getCurrentUser();

    // 요청 본문 파싱
    const body: UpdateUserRequest = await request.json();
    const { nickName, displayName, name } = body;

    // 업데이트할 필드가 없는 경우
    if (!nickName && !displayName && !name) {
      return NextResponse.json(
        {
          success: false,
          error: 'No fields to update',
        },
        { status: 400 },
      );
    }

    // 업데이트할 데이터 준비
    const updateData: Partial<UpdateUserRequest> = {};
    if (nickName !== undefined) updateData.nickName = nickName;
    if (displayName !== undefined) updateData.displayName = displayName;
    if (name !== undefined) updateData.name = name;

    // Prisma를 사용하여 User 테이블에서 사용자 정보 업데이트
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: updateData,
      select: {
        id: true,
        email: true,
        nickName: true,
        displayName: true,
        name: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedUser,
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
        error: 'Failed to update user data',
        requestId,
      },
      { status: 500 },
    );
  }
}
