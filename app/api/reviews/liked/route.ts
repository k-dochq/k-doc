import { NextRequest, NextResponse } from 'next/server';
import { routeErrorLogger } from 'shared/lib';
import { AuthService } from 'shared/lib/auth/server';
import { LikedReviewsRepository, GetLikedReviewsUseCase } from 'features/favorites-tabs/api-server';
import { likedReviewsRequestSchema } from 'features/favorites-tabs/api/entities/schemas';

/**
 * 좋아요한 리뷰 목록 조회 Route Handler
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/reviews/liked';
  const method = 'GET';

  try {
    // 1. URL 파라미터 추출 및 검증
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor') || undefined;
    const limit = parseInt(url.searchParams.get('limit') || '10');

    // 2. 입력 검증
    const validationResult = likedReviewsRequestSchema.safeParse({ cursor, limit });
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
    const likedReviewsRepository = new LikedReviewsRepository();
    const getLikedReviewsUseCase = new GetLikedReviewsUseCase(authService, likedReviewsRepository);

    // 4. Use Case 실행
    const result = await getLikedReviewsUseCase.execute(validationResult.data);

    // 5. 결과 처리
    if (!result.success) {
      if (result.error === 'Unauthorized') {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }

      const useCaseError = new Error(`GetLikedReviewsUseCase failed: ${result.error}`);
      const requestId = routeErrorLogger.logError({
        error: useCaseError,
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to get liked reviews',
          requestId,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result.data,
      },
      { status: 200 },
    );
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
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
