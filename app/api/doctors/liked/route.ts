import { NextRequest, NextResponse } from 'next/server';
import { routeErrorLogger } from 'shared/lib';
import { AuthService } from 'shared/lib/auth/server';
import { LikedDoctorsRepository, GetLikedDoctorsUseCase } from 'features/favorites-tabs/api-server';
import { likedDoctorsRequestSchema } from 'features/favorites-tabs/api/entities/schemas';

/**
 * 좋아요한 의사 목록 조회 Route Handler
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/doctors/liked';
  const method = 'GET';

  try {
    // 1. URL 파라미터 추출 및 검증
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    // 2. 입력 검증
    const validationResult = likedDoctorsRequestSchema.safeParse({ page, limit });
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request parameters',
          details: validationResult.error.issues,
        },
        { status: 400 },
      );
    }

    // 3. 의존성 주입을 통한 인스턴스 생성
    const authService = new AuthService();
    const likedDoctorsRepository = new LikedDoctorsRepository();
    const getLikedDoctorsUseCase = new GetLikedDoctorsUseCase(authService, likedDoctorsRepository);

    // 4. Use Case 실행
    const result = await getLikedDoctorsUseCase.execute(validationResult.data);

    // 5. 결과 처리
    if (!result.success) {
      if (result.error === 'Unauthorized') {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }

      const errorMessage = result.error || 'Failed to fetch liked doctors';
      const requestId = routeErrorLogger.logError({
        error: new Error(errorMessage),
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          requestId,
        },
        { status: 500 },
      );
    }

    // 6. 성공 응답
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error instanceof Error ? error : new Error('Unknown error'),
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        requestId,
      },
      { status: 500 },
    );
  }
}
