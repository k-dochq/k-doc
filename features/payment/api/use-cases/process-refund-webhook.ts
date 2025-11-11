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
  ReservationStatusHistoryMetadata,
  ReservationWithRelations,
} from '../entities/types';

export interface IProcessRefundWebhookUseCase {
  execute(webhookData: PayverseWebhookRequest): Promise<ProcessPaymentWebhookResult>;
}

export class ProcessRefundWebhookUseCase implements IProcessRefundWebhookUseCase {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly reservationRepository: IReservationRepository,
    private readonly consultationMessageRepository: IConsultationMessageRepository,
  ) {}

  async execute(webhookData: PayverseWebhookRequest): Promise<ProcessPaymentWebhookResult> {
    try {
      // 1. 서명 검증 (cancelDay 사용)
      if (!webhookData.cancelDay) {
        throw new Error('MISSING_CANCEL_DAY');
      }

      const isValid = verifyWebhookSign(
        PAYVERSE_CONFIG.SECRET_KEY,
        webhookData.mid,
        webhookData.orderId,
        webhookData.requestAmount,
        webhookData.cancelDay,
        webhookData.sign,
      );

      if (!isValid) {
        throw new Error('INVALID_SIGNATURE');
      }

      console.log(`[RefundWebhook] 서명 검증 성공 - tid: ${webhookData.tid}`);

      // 2. 원본 결제 정보 조회 (tid 또는 cancelTid로)
      // 웹훅의 tid는 원본 승인 TID일 수 있고, cancelTid는 취소 TID일 수 있음
      let payment = await this.paymentRepository.findByTid(webhookData.tid);

      // tid로 찾지 못한 경우, orderId로 예약을 찾아서 결제 정보 조회
      if (!payment) {
        const reservation = await this.reservationRepository.findById(webhookData.orderId);
        if (reservation && reservation.Payment.length > 0) {
          // 가장 최근 결제 정보 사용
          payment = reservation.Payment[0];
        }
      }

      if (!payment) {
        throw new Error(`PAYMENT_NOT_FOUND: ${webhookData.tid}`);
      }

      // 3. 예약 조회
      const reservation = await this.reservationRepository.findById(webhookData.orderId);
      if (!reservation) {
        throw new Error(`RESERVATION_NOT_FOUND: ${webhookData.orderId}`);
      }

      console.log(`[RefundWebhook] 예약 조회 성공 - reservationId: ${reservation.id}`);

      // 4. 환불 결과에 따른 처리
      const isRefundSuccess = webhookData.resultStatus === 'SUCCESS';

      // 5. 트랜잭션으로 모든 작업 처리
      await prisma.$transaction(async (tx) => {
        if (isRefundSuccess) {
          // 환불 성공: Payment → REFUNDED, Reservation → CANCELLED
          await this.paymentRepository.updateStatus(
            payment.id,
            'REFUNDED' as PaymentStatus,
            {
              cancelTid: webhookData.tid,
              cancelDay: webhookData.cancelDay,
              cancelTime: webhookData.cancelTime,
              resultCode: webhookData.resultCode,
              resultMessage: webhookData.resultMessage,
            } as Prisma.InputJsonValue,
            tx,
          );

          await this.reservationRepository.updateStatus(
            reservation.id,
            'CANCELLED' as ReservationStatus,
            'Refund completed',
            tx,
          );

          // ReservationStatusHistory 기록
          const historyMetadata: ReservationStatusHistoryMetadata = {
            tid: webhookData.tid,
            language: this.extractLanguageFromReservation(reservation),
          };

          await tx.reservationStatusHistory.create({
            data: {
              id: uuidv4(),
              reservationId: reservation.id,
              fromStatus: reservation.status,
              toStatus: 'CANCELLED' as ReservationStatus,
              reason: 'Refund completed',
              metadata: historyMetadata as Prisma.InputJsonValue,
              createdAt: new Date(),
            },
          });

          // 상담 메시지 생성 (환불 성공)
          const successMessage = this.generateRefundSuccessMessage(reservation);
          await this.consultationMessageRepository.createWithTransaction(
            {
              id: uuidv4(),
              User: {
                connect: { id: reservation.userId },
              },
              Hospital: {
                connect: { id: reservation.hospitalId },
              },
              senderType: 'ADMIN',
              content: successMessage,
              createdAt: new Date(),
            },
            tx,
          );

          console.log(`[RefundWebhook] 환불 성공 처리 완료 - reservationId: ${reservation.id}`);
        } else {
          // 환불 실패: 실패 메시지만 추가
          const failureMessage = this.generateRefundFailureMessage(
            reservation,
            webhookData.resultMessage,
          );
          await this.consultationMessageRepository.createWithTransaction(
            {
              id: uuidv4(),
              User: {
                connect: { id: reservation.userId },
              },
              Hospital: {
                connect: { id: reservation.hospitalId },
              },
              senderType: 'ADMIN',
              content: failureMessage,
              createdAt: new Date(),
            },
            tx,
          );

          console.log(`[RefundWebhook] 환불 실패 메시지 추가 - reservationId: ${reservation.id}`);
        }
      });

      console.log(`[RefundWebhook] 전체 처리 완료 - tid: ${webhookData.tid}`);
      return { success: true, processedTid: webhookData.tid };
    } catch (error) {
      console.error('[RefundWebhook] 처리 중 오류:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
      };
    }
  }

  /**
   * 예약에서 언어 정보 추출
   */
  private extractLanguageFromReservation(
    reservation: ReservationWithRelations,
  ): 'ko_KR' | 'en_US' | 'th_TH' {
    const metadata = reservation.metadata as Prisma.JsonObject | null;
    const language = (metadata?.language as 'ko_KR' | 'en_US' | 'th_TH' | undefined) || 'ko_KR';
    return language;
  }

  /**
   * 환불 성공 메시지 생성 (다국어)
   */
  private generateRefundSuccessMessage(reservation: ReservationWithRelations): string {
    const language = this.extractLanguageFromReservation(reservation);

    const messages: Record<'ko_KR' | 'en_US' | 'th_TH', string> = {
      ko_KR: `예약이 정상적으로 취소되었습니다.

환불이 완료되었습니다.`,
      en_US: `Your reservation has been successfully cancelled.

The refund has been completed.`,
      th_TH: `การจองของคุณถูกยกเลิกเรียบร้อยแล้วค่ะ

การคืนเงินเสร็จสมบูรณ์แล้วค่ะ`,
    };

    return messages[language] || messages.ko_KR;
  }

  /**
   * 환불 실패 메시지 생성 (다국어)
   */
  private generateRefundFailureMessage(
    reservation: ReservationWithRelations,
    errorMessage: string,
  ): string {
    const language = this.extractLanguageFromReservation(reservation);

    const messages: Record<'ko_KR' | 'en_US' | 'th_TH', string> = {
      ko_KR: `환불 처리 중 오류가 발생했습니다.

PG사 오류: ${errorMessage}

고객센터로 문의해주시기 바랍니다.`,
      en_US: `An error occurred during the refund process.

Payment gateway error: ${errorMessage}

Please contact customer service.`,
      th_TH: `เกิดข้อผิดพลาดในระหว่างการคืนเงินค่ะ

ข้อผิดพลาดจากระบบชำระเงิน: ${errorMessage}

กรุณาติดต่อฝ่ายบริการลูกค้าค่ะ`,
    };

    return messages[language] || messages.ko_KR;
  }
}
