import { v4 as uuidv4 } from 'uuid';
import { type Prisma, type ReservationStatus } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { PAYVERSE_CONFIG, PAYVERSE_API_ENDPOINTS } from 'features/payment/config/payverse';
import { generatePayverseCancelSign } from 'features/payment/lib/sign-generator';
import type { IPaymentRepository } from '../infrastructure/repositories/payment-repository';
import type { IReservationRepository } from '../infrastructure/repositories/reservation-repository';
import type { IConsultationMessageRepository } from 'features/consultation-message/api/infrastructure/repositories/consultation-message-repository';
import type { Locale } from 'shared/config';
import type { PayverseCancelResponse } from '../entities/types';

export interface ICancelReservationUseCase {
  execute(
    reservationId: string,
    userId: string,
    locale: Locale,
  ): Promise<{
    success: boolean;
    requiresWebhook: boolean;
    message: string;
    error?: string;
  }>;
}

export class CancelReservationUseCase implements ICancelReservationUseCase {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly reservationRepository: IReservationRepository,
    private readonly consultationMessageRepository: IConsultationMessageRepository,
  ) {}

  async execute(
    reservationId: string,
    userId: string,
    locale: Locale,
  ): Promise<{
    success: boolean;
    requiresWebhook: boolean;
    message: string;
    error?: string;
  }> {
    try {
      // 1. 예약 조회 및 권한 확인
      const reservation = await this.reservationRepository.findById(reservationId);
      if (!reservation) {
        throw new Error('RESERVATION_NOT_FOUND');
      }

      // 권한 확인: 예약한 사용자만 취소 가능
      if (reservation.userId !== userId) {
        throw new Error('UNAUTHORIZED_CANCEL');
      }

      // 이미 취소된 예약인지 확인
      if (reservation.status === 'CANCELLED') {
        throw new Error('ALREADY_CANCELLED');
      }

      // 2. 결제 정보 확인
      const payment = await this.paymentRepository.findByReservationId(reservationId);

      // 3. 결제 상태에 따른 분기 처리
      if (!payment || payment.status !== 'SUCCEEDED') {
        // 결제가 없거나 실패한 경우: 즉시 예약 취소
        return await this.cancelReservationImmediately(reservation, locale);
      } else {
        // 결제가 성공한 경우: PayVerse 취소 API 호출
        return await this.requestPayverseCancel(reservation, payment, locale);
      }
    } catch (error) {
      console.error('[CancelReservation] 오류:', error);
      return {
        success: false,
        requiresWebhook: false,
        message: '',
        error: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
      };
    }
  }

  /**
   * 결제가 없거나 실패한 경우 즉시 예약 취소
   */
  private async cancelReservationImmediately(
    reservation: Awaited<ReturnType<IReservationRepository['findById']>>,
    locale: Locale,
  ): Promise<{
    success: boolean;
    requiresWebhook: boolean;
    message: string;
    error?: string;
  }> {
    if (!reservation) {
      throw new Error('RESERVATION_NOT_FOUND');
    }

    // 트랜잭션으로 예약 취소 및 메시지 생성
    await prisma.$transaction(async (tx) => {
      // 1. Reservation 상태 변경
      await this.reservationRepository.updateStatus(
        reservation.id,
        'CANCELLED' as ReservationStatus,
        'User requested cancellation (no payment)',
        tx,
      );

      // 2. ReservationStatusHistory 기록
      await tx.reservationStatusHistory.create({
        data: {
          id: uuidv4(),
          reservationId: reservation.id,
          fromStatus: reservation.status,
          toStatus: 'CANCELLED' as ReservationStatus,
          reason: 'User requested cancellation (no payment)',
          createdAt: new Date(),
        },
      });

      // 3. 상담 메시지 생성 (결제 미완료 취소 메시지)
      const cancelMessage = this.generateNoPaymentCancelMessage(reservation, locale);
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
          content: cancelMessage,
          createdAt: new Date(),
        },
        tx,
      );
    });

    return {
      success: true,
      requiresWebhook: false,
      message: 'Reservation cancelled successfully (no payment)',
    };
  }

  /**
   * PayVerse 취소 API 호출
   */
  private async requestPayverseCancel(
    reservation: Awaited<ReturnType<IReservationRepository['findById']>>,
    payment: Awaited<ReturnType<IPaymentRepository['findByReservationId']>>,
    locale: Locale,
  ): Promise<{
    success: boolean;
    requiresWebhook: boolean;
    message: string;
    error?: string;
  }> {
    if (!reservation || !payment) {
      throw new Error('RESERVATION_OR_PAYMENT_NOT_FOUND');
    }

    // 현재 시간을 reqDate 형식으로 변환 (YYYYMMDDHHmmss)
    const now = new Date();
    const reqDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

    // 금액 처리: 소수점 마지막 자리가 '0'인 경우 제거
    const amountStr = String(payment.amount);
    const normalizedAmount = amountStr.endsWith('.0') ? amountStr.slice(0, -2) : amountStr;

    // 취소 서명 생성
    const sign = generatePayverseCancelSign(
      PAYVERSE_CONFIG.SECRET_KEY,
      PAYVERSE_CONFIG.MID,
      normalizedAmount,
      reqDate,
    );

    // PayVerse 취소 API 요청
    const cancelRequest = {
      reqDate,
      tid: payment.tid,
      currency: payment.currency,
      amount: normalizedAmount,
      cancelReason: 'User requested cancellation',
      sign,
    };

    console.log('[CancelReservation] PayVerse 취소 API 요청:', {
      endpoint: PAYVERSE_API_ENDPOINTS.cancel,
      tid: payment.tid,
      amount: normalizedAmount,
    });

    const response = await fetch(PAYVERSE_API_ENDPOINTS.cancel, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Charset: 'UTF-8',
        mid: PAYVERSE_CONFIG.MID,
        clientKey: PAYVERSE_CONFIG.CLIENT_KEY,
      },
      body: JSON.stringify(cancelRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[CancelReservation] PayVerse API 오류:', errorText);
      throw new Error(`PAYVERSE_API_ERROR: ${response.status} - ${errorText}`);
    }

    const cancelResponse: PayverseCancelResponse = await response.json();
    console.log('[CancelReservation] PayVerse 취소 응답:', cancelResponse);

    // 취소 접수 메시지 생성 (트랜잭션)
    await prisma.$transaction(async (tx) => {
      const processingMessage = this.generateCancelProcessingMessage(reservation, locale);
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
          content: processingMessage,
          createdAt: new Date(),
        },
        tx,
      );
    });

    // resultStatus에 따라 웹훅 대기 여부 결정
    const requiresWebhook =
      cancelResponse.resultStatus === 'PROCESSING' || cancelResponse.resultStatus === 'PENDING';

    return {
      success: true,
      requiresWebhook,
      message: cancelResponse.resultMessage,
    };
  }

  /**
   * 결제 미완료 취소 메시지 생성 (다국어)
   */
  private generateNoPaymentCancelMessage(
    reservation: Awaited<ReturnType<IReservationRepository['findById']>>,
    locale: Locale,
  ): string {
    const messages: Record<Locale, string> = {
      ko: '결제가 완료되지 않아 예약만 취소되었습니다.',
      en: 'Only the reservation was cancelled as payment was not completed.',
      th: 'ยกเลิกเฉพาะการจองเนื่องจากการชำระเงินยังไม่เสร็จสมบูรณ์ค่ะ',
    };

    return messages[locale] || messages.ko;
  }

  /**
   * 취소 접수 메시지 생성 (다국어)
   */
  private generateCancelProcessingMessage(
    reservation: Awaited<ReturnType<IReservationRepository['findById']>>,
    locale: Locale,
  ): string {
    const messages: Record<Locale, string> = {
      ko: `예약 취소가 정상적으로 접수되었습니다.

결제 취소(환불)는 결제사 승인 절차에 따라 순차적으로 처리되며,
완료 시 별도 알림을 드리겠습니다.`,
      en: `Your reservation cancellation has been successfully received.

The payment cancellation (refund) is being processed sequentially according to the payment provider's approval procedure.
A separate notification will be sent once the process is completed.`,
      th: `การยกเลิกการจองของคุณได้รับการดำเนินการเรียบร้อยแล้วค่ะ

การยกเลิกการชำระเงิน (คืนเงิน) จะดำเนินการตามขั้นตอนการอนุมัติของผู้ให้บริการชำระเงิน
เมื่อดำเนินการเสร็จสิ้นแล้ว ระบบจะแจ้งเตือนให้ทราบอีกครั้งค่ะ`,
    };

    return messages[locale] || messages.ko;
  }
}
