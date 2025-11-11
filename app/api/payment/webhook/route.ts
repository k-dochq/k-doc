import { NextRequest, NextResponse } from 'next/server';
import { ProcessPaymentWebhookUseCase } from 'features/payment/api/use-cases/process-payment-webhook';
import { ProcessRefundWebhookUseCase } from 'features/payment/api/use-cases/process-refund-webhook';
import { PaymentRepository } from 'features/payment/api/infrastructure/repositories/payment-repository';
import { ReservationRepository } from 'features/payment/api/infrastructure/repositories/reservation-repository';
import { ConsultationMessageRepository } from 'features/consultation-message/api/infrastructure/repositories/consultation-message-repository';
import { routeErrorLogger } from 'shared/lib';
import type {
  PayverseWebhookRequest,
  PayverseWebhookResponse,
} from 'features/payment/api/entities/types';

/**
 * Payverse 결제 웹훅 API 라우트
 * 결제 완료(Sale) 및 환불 완료(Refund) 시 호출되는 엔드포인트
 *
 * 참고: https://docs.payverseglobal.com/ko/apisdk/v1.0.0/additional-feature-api/additional-feature/
 */
export async function POST(request: NextRequest): Promise<NextResponse<PayverseWebhookResponse>> {
  const endpoint = '/api/payment/webhook';
  const method = 'POST';

  try {
    const webhookData: PayverseWebhookRequest = await request.json();

    console.log(`[${new Date().toISOString()}] Payverse Webhook 수신:`, {
      type: webhookData.type,
      tid: webhookData.tid,
      orderId: webhookData.orderId,
      amount: webhookData.approvalAmount || webhookData.cancelAmount,
      resultStatus: webhookData.resultStatus,
    });

    // Dependency Injection
    const paymentRepo = new PaymentRepository();
    const reservationRepo = new ReservationRepository();
    const messageRepo = new ConsultationMessageRepository();

    let result;

    // type에 따른 분기 처리
    if (webhookData.type === 'Sale') {
      // 승인 웹훅 처리
      const saleUseCase = new ProcessPaymentWebhookUseCase(
        paymentRepo,
        reservationRepo,
        messageRepo,
      );
      result = await saleUseCase.execute(webhookData);
    } else if (webhookData.type === 'Refund') {
      // 환불 웹훅 처리
      const refundUseCase = new ProcessRefundWebhookUseCase(
        paymentRepo,
        reservationRepo,
        messageRepo,
      );
      result = await refundUseCase.execute(webhookData);
    } else {
      throw new Error(`Unknown webhook type: ${webhookData.type}`);
    }

    if (result.success) {
      console.log(`[${new Date().toISOString()}] Webhook 처리 성공:`, result.processedTid);
      return NextResponse.json({ receiveResult: 'SUCCESS' });
    } else {
      console.error(`[${new Date().toISOString()}] Webhook 처리 실패:`, result.error);

      routeErrorLogger.logError({
        error: new Error(result.error || 'WEBHOOK_PROCESSING_FAILED'),
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          receiveResult: 'FAIL',
          message: result.error,
        },
        { status: 400 },
      );
    }
  } catch (error) {
    routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    console.error(`[${new Date().toISOString()}] Webhook 처리 중 오류:`, error);

    return NextResponse.json(
      {
        receiveResult: 'FAIL',
        message: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
      },
      { status: 500 },
    );
  }
}
