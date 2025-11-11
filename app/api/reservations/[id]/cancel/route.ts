import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { CancelReservationUseCase } from 'features/payment/api/use-cases/cancel-reservation';
import { PaymentRepository } from 'features/payment/api/infrastructure/repositories/payment-repository';
import { ReservationRepository } from 'features/payment/api/infrastructure/repositories/reservation-repository';
import { ConsultationMessageRepository } from 'features/consultation-message/api/infrastructure/repositories/consultation-message-repository';
import { routeErrorLogger } from 'shared/lib';
import type { Locale } from 'shared/config';

/**
 * 요청에서 locale 추출
 */
function extractLocaleFromRequest(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const referer = request.headers.get('referer') || '';

  // Referer URL에서 locale 추출
  const refererMatch = referer.match(/\/(ko|en|th)\//);
  if (refererMatch) {
    return refererMatch[1] as Locale;
  }

  // Accept-Language 헤더에서 locale 추출
  if (acceptLanguage.includes('ko')) return 'ko';
  if (acceptLanguage.includes('th')) return 'th';
  if (acceptLanguage.includes('en')) return 'en';

  // 기본값
  return 'en';
}

/**
 * 예약 취소 API 라우트
 * 사용자가 예약 취소 요청을 보내는 엔드포인트
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const endpoint = '/api/reservations/[id]/cancel';
  const method = 'POST';

  try {
    // 1. 인증 확인
    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session?.user?.id) {
      const unauthorizedError = new Error('UNAUTHORIZED');
      const requestId = routeErrorLogger.logError({
        error: unauthorizedError,
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'UNAUTHORIZED',
          message: 'Authentication required',
          requestId,
        },
        { status: 401 },
      );
    }

    // 2. Locale 추출
    const locale = extractLocaleFromRequest(request);

    // 3. 예약 ID 추출
    const { id: reservationId } = await params;

    if (!reservationId) {
      const missingIdError = new Error('Missing reservation ID');
      const requestId = routeErrorLogger.logError({
        error: missingIdError,
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'MISSING_RESERVATION_ID',
          message: 'Reservation ID is required',
          requestId,
        },
        { status: 400 },
      );
    }

    // 4. Dependency Injection
    const paymentRepo = new PaymentRepository();
    const reservationRepo = new ReservationRepository();
    const messageRepo = new ConsultationMessageRepository();

    // 5. Use Case 실행
    const useCase = new CancelReservationUseCase(paymentRepo, reservationRepo, messageRepo);
    const result = await useCase.execute(reservationId, session.user.id, locale);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: {
          requiresWebhook: result.requiresWebhook,
          message: result.message,
        },
      });
    } else {
      const requestId = routeErrorLogger.logError({
        error: new Error(result.error || 'CANCEL_FAILED'),
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          error: result.error || 'CANCEL_FAILED',
          message: result.error || 'Failed to cancel reservation',
          requestId,
        },
        { status: 400 },
      );
    }
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    console.error(`[${new Date().toISOString()}] 예약 취소 처리 중 오류:`, error);

    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error',
        requestId,
      },
      { status: 500 },
    );
  }
}
