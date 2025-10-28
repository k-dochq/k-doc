import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from 'shared/lib/auth/server';
import { routeErrorLogger } from 'shared/lib';
import { getUserReservedHospitals } from 'entities/reservation/api/use-cases';
import { type GetUserReservedHospitalsResponse } from 'entities/reservation/api/entities';

/**
 * 사용자의 예약 병원 목록 조회 API
 * GET /api/reservations/hospitals?page=1&limit=10
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/reservations/hospitals';
  const method = 'GET';

  try {
    // 사용자 인증 확인
    const authService = new AuthService();
    const user = await authService.getCurrentUser();

    // 쿼리 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // 페이지 및 limit 유효성 검사
    if (page < 1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid page parameter',
        },
        { status: 400 },
      );
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid limit parameter (must be between 1 and 100)',
        },
        { status: 400 },
      );
    }

    // UseCase 실행
    const result: GetUserReservedHospitalsResponse = await getUserReservedHospitals({
      userId: user.id,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      data: result,
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
        error: 'Failed to fetch reserved hospitals',
        requestId,
      },
      { status: 500 },
    );
  }
}
