import { NextRequest, NextResponse } from 'next/server';
import { routeErrorLogger } from 'shared/lib';
import {
  AuthService,
  LikedHospitalsRepository,
  GetLikedHospitalsUseCase,
  likedHospitalsRequestSchema,
} from '../../../../features/favorites-tabs/api-server';

/**
 * 좋아요한 병원 목록 조회 Route Handler
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/hospitals/liked';
  const method = 'GET';

  try {
    // 1. URL 파라미터 추출 및 검증
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    // 2. 입력 검증
    const validationResult = likedHospitalsRequestSchema.safeParse({ page, limit });
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request parameters',
          details: validationResult.error.issues,
        },
        { status: 400 },
      );
    }

    // 3. 의존성 주입을 통한 인스턴스 생성
    const authService = new AuthService();
    const likedHospitalsRepository = new LikedHospitalsRepository();
    const getLikedHospitalsUseCase = new GetLikedHospitalsUseCase(
      authService,
      likedHospitalsRepository,
    );

    // 4. Use Case 실행
    const result = await getLikedHospitalsUseCase.execute(validationResult.data);

    // 5. 결과 처리
    if (!result.success) {
      if (result.error === 'Unauthorized') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const errorMessage = result.error || 'Failed to fetch liked hospitals';
      const requestId = routeErrorLogger.logError({
        error: new Error(errorMessage),
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          error: errorMessage,
          requestId,
        },
        { status: 500 },
      );
    }

    // 6. 성공 응답
    return NextResponse.json({
      hospitals: result.hospitals,
      totalCount: result.totalCount,
      hasNextPage: result.hasNextPage,
      nextPage: result.nextPage,
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      {
        error: 'Internal server error',
        requestId,
      },
      { status: 500 },
    );
  }
}
