import { v4 as uuidv4 } from 'uuid';
import { type Prisma, type PaymentStatus, type ReservationStatus } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { PAYVERSE_CONFIG } from 'features/payment/config/payverse';
import { verifyWebhookSign } from 'features/payment/lib/sign-generator';
import type { IPaymentRepository } from '../infrastructure/repositories/payment-repository';
import type { IReservationRepository } from '../infrastructure/repositories/reservation-repository';
import type { IConsultationMessageRepository } from 'features/consultation-message/api/infrastructure/repositories/consultation-message-repository';
import type {
  PayverseWebhookRequest,
  ProcessPaymentWebhookResult,
  PaymentMetadata,
  PaymentMethodData,
  ReservationStatusHistoryMetadata,
  ReservationWithRelations,
} from '../entities/types';

export interface IProcessPaymentWebhookUseCase {
  execute(webhookData: PayverseWebhookRequest): Promise<ProcessPaymentWebhookResult>;
}

export class ProcessPaymentWebhookUseCase implements IProcessPaymentWebhookUseCase {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly reservationRepository: IReservationRepository,
    private readonly consultationMessageRepository: IConsultationMessageRepository,
  ) {}

  async execute(webhookData: PayverseWebhookRequest): Promise<ProcessPaymentWebhookResult> {
    try {
      // 1. 서명 검증
      const day = webhookData.type === 'Sale' ? webhookData.approvalDay! : webhookData.cancelDay!;

      if (!day) {
        throw new Error('MISSING_APPROVAL_OR_CANCEL_DAY');
      }

      const isValid = verifyWebhookSign(
        PAYVERSE_CONFIG.SECRET_KEY,
        webhookData.mid,
        webhookData.orderId,
        webhookData.requestAmount,
        day,
        webhookData.sign,
      );

      if (!isValid) {
        throw new Error('INVALID_SIGNATURE');
      }

      console.log(`[Webhook] 서명 검증 성공 - tid: ${webhookData.tid}`);

      // 2. 중복 처리 방지 (tid 체크)
      const existingPayment = await this.paymentRepository.findByTid(webhookData.tid);
      if (existingPayment) {
        console.log(`[Webhook] 중복 처리 방지 - 이미 처리된 tid: ${webhookData.tid}`);
        return { success: true, processedTid: webhookData.tid };
      }

      // 3. 예약 조회
      const reservation = await this.reservationRepository.findById(webhookData.orderId);
      if (!reservation) {
        throw new Error(`RESERVATION_NOT_FOUND: ${webhookData.orderId}`);
      }

      console.log(`[Webhook] 예약 조회 성공 - reservationId: ${reservation.id}`);

      // 4. 트랜잭션 실행
      await prisma.$transaction(async (tx) => {
        // 4-1. Payment 생성
        const paymentMetadata: PaymentMetadata = {
          tid: webhookData.tid,
          type: webhookData.type,
          approvalDay: webhookData.approvalDay,
          approvalTime: webhookData.approvalTime,
          cancelDay: webhookData.cancelDay,
          cancelTime: webhookData.cancelTime,
        };

        const paymentMethod: PaymentMethodData = {
          schemeGroup: webhookData.schemeGroup,
          schemeCode: webhookData.schemeCode,
          approvalNo: webhookData.approvalNo,
        };

        const paymentData: Prisma.PaymentCreateInput = {
          id: uuidv4(),
          tid: webhookData.tid,
          amount: parseInt(webhookData.approvalAmount || webhookData.cancelAmount || '0'),
          currency: webhookData.approvalCurrency || webhookData.cancelCurrency || 'USD',
          status: 'SUCCEEDED' as PaymentStatus,
          paymentMethod: paymentMethod as unknown as Prisma.InputJsonValue,
          metadata: paymentMetadata as unknown as Prisma.InputJsonValue,
          createdAt: new Date(),
          updatedAt: new Date(),
          Reservation: {
            connect: { id: reservation.id },
          },
        };

        await this.paymentRepository.create(paymentData, tx);
        console.log(`[Webhook] Payment 생성 완료 - tid: ${webhookData.tid}`);

        // 4-2. Reservation 상태 변경
        await this.reservationRepository.updateStatus(
          reservation.id,
          'CONFIRMED' as ReservationStatus,
          tx,
        );
        console.log(`[Webhook] Reservation 상태 변경: PAYMENT_PENDING → CONFIRMED`);

        // 4-3. 히스토리 기록
        const historyMetadata: ReservationStatusHistoryMetadata = {
          tid: webhookData.tid,
          approvalNo: webhookData.approvalNo,
        };

        const historyData: Prisma.ReservationStatusHistoryCreateInput = {
          id: uuidv4(),
          fromStatus: 'PAYMENT_PENDING' as ReservationStatus,
          toStatus: 'CONFIRMED' as ReservationStatus,
          reason: '결제 완료',
          metadata: historyMetadata as Prisma.InputJsonValue,
          createdAt: new Date(),
          Reservation: {
            connect: { id: reservation.id },
          },
        };

        await tx.reservationStatusHistory.create({
          data: historyData,
        });
        console.log(`[Webhook] ReservationStatusHistory 생성 완료`);

        // 4-4. 상담 메시지 생성
        const completionMessage = this.generateCompletionMessage(reservation, webhookData);

        const messageData: Prisma.ConsultationMessageCreateInput = {
          id: uuidv4(),
          senderType: 'ADMIN',
          content: completionMessage,
          createdAt: new Date(),
          User: {
            connect: { id: reservation.userId },
          },
          Hospital: {
            connect: { id: reservation.hospitalId },
          },
        };

        await this.consultationMessageRepository.createWithTransaction(messageData, tx);
        console.log(`[Webhook] ConsultationMessage 생성 완료`);
      });

      console.log(`[Webhook] 전체 처리 완료 - tid: ${webhookData.tid}`);
      return { success: true, processedTid: webhookData.tid };
    } catch (error) {
      console.error('[Webhook] 처리 중 오류:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
      };
    }
  }

  /**
   * 다국어 결제 완료 메시지 생성
   */
  private generateCompletionMessage(
    reservation: ReservationWithRelations,
    webhookData: PayverseWebhookRequest,
  ): string {
    // Prisma Json 타입을 명시적으로 변환
    const metadata = reservation.metadata as Prisma.JsonObject | null;
    const language = (metadata?.language as 'ko_KR' | 'en_US' | 'th_TH' | undefined) || 'ko_KR';

    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0];
    };

    const messages: Record<'ko_KR' | 'en_US' | 'th_TH', string> = {
      ko_KR: `✅ 결제가 완료되었습니다.

예약번호: ${reservation.id}
시술명: ${reservation.procedureName}
예약일시: ${formatDate(reservation.reservationDate)} ${reservation.reservationTime}
결제금액: ${webhookData.approvalAmount} ${webhookData.approvalCurrency}
승인번호: ${webhookData.approvalNo || 'N/A'}

예약이 확정되었습니다.`,
      en_US: `✅ Payment completed.

Reservation ID: ${reservation.id}
Procedure: ${reservation.procedureName}
Date/Time: ${formatDate(reservation.reservationDate)} ${reservation.reservationTime}
Amount: ${webhookData.approvalAmount} ${webhookData.approvalCurrency}
Approval No: ${webhookData.approvalNo || 'N/A'}

Your reservation is confirmed.`,
      th_TH: `✅ ชำระเงินเสร็จสมบูรณ์

หมายเลขการจอง: ${reservation.id}
ขั้นตอน: ${reservation.procedureName}
วันที่/เวลา: ${formatDate(reservation.reservationDate)} ${reservation.reservationTime}
จำนวนเงิน: ${webhookData.approvalAmount} ${webhookData.approvalCurrency}
เลขที่อนุมัติ: ${webhookData.approvalNo || 'N/A'}

การจองของคุณได้รับการยืนยันแล้ว`,
    };

    return messages[language];
  }
}
