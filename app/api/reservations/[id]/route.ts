import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from 'shared/lib/auth/server';
import { routeErrorLogger } from 'shared/lib';
import { getReservationDetail } from 'entities/reservation/api/use-cases';
import { type GetReservationDetailResponse } from 'entities/reservation/api/entities';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * 예약 상세 정보 조회 API
 * GET /api/reservations/:id
 */
export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { id: reservationId } = await params;
  const endpoint = `/api/reservations/${reservationId}`;
  const method = 'GET';

  try {
    // 사용자 인증 확인
    const authService = new AuthService();
    const user = await authService.getCurrentUser();

    // UseCase 실행
    const result: GetReservationDetailResponse = await getReservationDetail({
      reservationId,
      userId: user.id,
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

    // 예약을 찾을 수 없는 경우
    if (error instanceof Error && error.message.includes('예약을 찾을 수 없습니다')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reservation not found',
          requestId,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch reservation detail',
        requestId,
      },
      { status: 500 },
    );
  }
}
