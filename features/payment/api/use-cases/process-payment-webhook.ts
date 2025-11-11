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

      // 3-1. resultStatus 확인
      const isPaymentSuccess = webhookData.resultStatus === 'SUCCESS';

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
          status: isPaymentSuccess ? ('SUCCEEDED' as PaymentStatus) : ('FAILED' as PaymentStatus),
          paymentMethod: paymentMethod as unknown as Prisma.InputJsonValue,
          metadata: paymentMetadata as unknown as Prisma.InputJsonValue,
          failureReason: isPaymentSuccess ? null : webhookData.resultMessage,
          createdAt: new Date(),
          updatedAt: new Date(),
          Reservation: {
            connect: { id: reservation.id },
          },
        };

        await this.paymentRepository.create(paymentData, tx);
        console.log(
          `[Webhook] Payment 생성 완료 - tid: ${webhookData.tid}, status: ${isPaymentSuccess ? 'SUCCEEDED' : 'FAILED'}`,
        );

        if (isPaymentSuccess) {
          // 결제 성공 처리
          // 4-2. Reservation 상태 변경
          await this.reservationRepository.updateStatus(
            reservation.id,
            'CONFIRMED' as ReservationStatus,
            null,
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

          // 4-4. 상담 메시지 생성 (성공 메시지)
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
          console.log(`[Webhook] ConsultationMessage 생성 완료 (성공)`);
        } else {
          // 결제 실패 처리
          // 4-2. 히스토리 기록 (실패)
          const historyMetadata: ReservationStatusHistoryMetadata = {
            tid: webhookData.tid,
          };

          const historyData: Prisma.ReservationStatusHistoryCreateInput = {
            id: uuidv4(),
            fromStatus: 'PAYMENT_PENDING' as ReservationStatus,
            toStatus: 'PAYMENT_PENDING' as ReservationStatus,
            reason: `결제 실패: ${webhookData.resultMessage || 'Unknown error'}`,
            metadata: historyMetadata as Prisma.InputJsonValue,
            createdAt: new Date(),
            Reservation: {
              connect: { id: reservation.id },
            },
          };

          await tx.reservationStatusHistory.create({
            data: historyData,
          });
          console.log(`[Webhook] ReservationStatusHistory 생성 완료 (실패)`);

          // 4-3. 상담 메시지 생성 (실패 메시지)
          const failureMessage = this.generateFailureMessage(reservation, webhookData);

          const messageData: Prisma.ConsultationMessageCreateInput = {
            id: uuidv4(),
            senderType: 'ADMIN',
            content: failureMessage,
            createdAt: new Date(),
            User: {
              connect: { id: reservation.userId },
            },
            Hospital: {
              connect: { id: reservation.hospitalId },
            },
          };

          await this.consultationMessageRepository.createWithTransaction(messageData, tx);
          console.log(`[Webhook] ConsultationMessage 생성 완료 (실패)`);
        }
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
   * 다국어 결제 실패 메시지 생성
   */
  private generateFailureMessage(
    reservation: ReservationWithRelations,
    webhookData: PayverseWebhookRequest,
  ): string {
    // Prisma Json 타입을 명시적으로 변환
    const metadata = reservation.metadata as Prisma.JsonObject | null;
    const language = (metadata?.language as 'ko_KR' | 'en_US' | 'th_TH' | undefined) || 'ko_KR';

    // 병원명 추출
    const hospitalName = this.extractHospitalName(reservation.Hospital.name, language);

    // 날짜 포맷팅 (YYYY-MM-DD(요일))
    const formattedDate = this.formatDateWithDayOfWeek(reservation.reservationDate, language);

    // 금액 포맷팅 (센트 → USD)
    const formattedAmount = this.formatAmount(reservation.depositAmount);

    // 실패 메시지 템플릿 가져오기
    const template = PAYMENT_FAILURE_TEMPLATES[language];

    // 템플릿 변수 치환
    return template
      .replace(/{hospitalName}/g, hospitalName)
      .replace(/{procedureName}/g, reservation.procedureName)
      .replace(/{date}/g, formattedDate)
      .replace(/{time}/g, reservation.reservationTime)
      .replace(/{amount}/g, formattedAmount)
      .replace(/{errorMessage}/g, webhookData.resultMessage || 'Unknown error');
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

    // 병원명 추출
    const hospitalName = this.extractHospitalName(reservation.Hospital.name, language);

    // 날짜 포맷팅 (YYYY-MM-DD(요일))
    const formattedDate = this.formatDateWithDayOfWeek(reservation.reservationDate, language);

    // 금액 포맷팅 (센트 → USD)
    const formattedAmount = this.formatAmount(reservation.depositAmount);

    // 메시지 템플릿 가져오기
    const template = RESERVATION_CONFIRMATION_TEMPLATES[language];

    // 템플릿 변수 치환
    return template
      .replace(/{hospitalName}/g, hospitalName)
      .replace(/{procedureName}/g, reservation.procedureName)
      .replace(/{date}/g, formattedDate)
      .replace(/{time}/g, reservation.reservationTime)
      .replace(/{amount}/g, formattedAmount);
  }

  /**
   * 병원명 추출 (JSON에서 언어별로 추출)
   */
  private extractHospitalName(nameJson: unknown, language: 'ko_KR' | 'en_US' | 'th_TH'): string {
    if (typeof nameJson === 'string') {
      return nameJson;
    }

    if (typeof nameJson === 'object' && nameJson !== null) {
      const nameObj = nameJson as Record<string, unknown>;

      // 선택된 언어에 따라 병원명 추출
      switch (language) {
        case 'ko_KR':
          if (typeof nameObj.ko_KR === 'string' && nameObj.ko_KR.trim()) {
            return nameObj.ko_KR;
          }
          break;
        case 'en_US':
          if (typeof nameObj.en_US === 'string' && nameObj.en_US.trim()) {
            return nameObj.en_US;
          }
          break;
        case 'th_TH':
          if (typeof nameObj.th_TH === 'string' && nameObj.th_TH.trim()) {
            return nameObj.th_TH;
          }
          break;
      }

      // 선택된 언어에 해당하는 값이 없으면 다른 언어로 폴백
      if (typeof nameObj.ko_KR === 'string' && nameObj.ko_KR.trim()) {
        return nameObj.ko_KR;
      }
      if (typeof nameObj.en_US === 'string' && nameObj.en_US.trim()) {
        return nameObj.en_US;
      }
      if (typeof nameObj.th_TH === 'string' && nameObj.th_TH.trim()) {
        return nameObj.th_TH;
      }

      // 다른 문자열 값 찾기
      for (const value of Object.values(nameObj)) {
        if (typeof value === 'string' && value.trim()) {
          return value;
        }
      }
    }

    // 기본값 (언어별)
    switch (language) {
      case 'ko_KR':
        return '병원';
      case 'en_US':
        return 'Hospital';
      case 'th_TH':
        return 'โรงพยาบาล';
      default:
        return '병원';
    }
  }

  /**
   * 날짜를 YYYY-MM-DD(요일) 형식으로 포맷팅
   */
  private formatDateWithDayOfWeek(date: Date, language: 'ko_KR' | 'en_US' | 'th_TH'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    // 요일 계산
    const dayIndex = date.getDay();
    const dayOfWeekMap: Record<number, { ko_KR: string; en_US: string; th_TH: string }> = {
      0: { ko_KR: '일요일', en_US: 'Sunday', th_TH: 'อาทิตย์' },
      1: { ko_KR: '월요일', en_US: 'Monday', th_TH: 'จันทร์' },
      2: { ko_KR: '화요일', en_US: 'Tuesday', th_TH: 'อังคาร' },
      3: { ko_KR: '수요일', en_US: 'Wednesday', th_TH: 'พุธ' },
      4: { ko_KR: '목요일', en_US: 'Thursday', th_TH: 'พฤหัสบดี' },
      5: { ko_KR: '금요일', en_US: 'Friday', th_TH: 'ศุกร์' },
      6: { ko_KR: '토요일', en_US: 'Saturday', th_TH: 'เสาร์' },
    };

    const dayOfWeek = dayOfWeekMap[dayIndex][language];

    return `${dateStr}(${dayOfWeek})`;
  }

  /**
   * 금액을 달러 형식으로 포맷팅
   */
  private formatAmount(amount: number): string {
    // 달러 단위로 그대로 사용 (센트 변환 없음)
    return amount.toFixed(2);
  }
}

/**
 * 예약 확정 메시지 템플릿 (언어별)
 */
const RESERVATION_CONFIRMATION_TEMPLATES: Record<'ko_KR' | 'en_US' | 'th_TH', string> = {
  ko_KR: `예약 확정

[ 상세 내용 ]
- 병원명: {hospitalName}
- 시술명: {procedureName}
- 시술 예약 날짜: {date}
- 시술 예약 시간: {time}
- 예약금: {amount} USD

[ 유의사항 ]
- 입금 기한 내 입금이 확인되지 않는 경우 예약은 자동 취소됩니다.
- 예약금은 예약 확정 대행 비용입니다.
- 시술 비용은 현장 상담 후 결정되며 현장에서 결제 진행하셔야 합니다.
- 시술 진행여부와 관련 없이 예약금은 환불되지 않습니다.`,
  en_US: `Reservation Confirmed

[ Details ]
- Hospital: {hospitalName}
- Procedure: {procedureName}
- Reservation Date: {date}
- Reservation Time: {time}
- Deposit: {amount} USD

[ Important Notes ]
- Reservation will be automatically cancelled if payment is not received by the deadline.
- Deposit is a reservation confirmation fee.
- Procedure cost will be determined after on-site consultation and payment will be made on-site.
- Deposit is non-refundable regardless of procedure completion.`,
  th_TH: `ยืนยันการจอง

[ รายละเอียด ]
- โรงพยาบาล: {hospitalName}
- ขั้นตอน: {procedureName}
- วันที่จอง: {date}
- เวลาจอง: {time}
- ค่ามัดจำ: {amount} USD

[ ข้อควรระวัง ]
- การจองจะถูกยกเลิกโดยอัตโนมัติหากไม่ได้รับเงินภายในกำหนดเวลา
- ค่ามัดจำเป็นค่าธรรมเนียมการยืนยันการจอง
- ค่าใช้จ่ายในการทำหัตถการจะถูกกำหนดหลังจากการปรึกษาที่สถานที่และการชำระเงินจะทำที่สถานที่
- ค่ามัดจำไม่สามารถคืนเงินได้ไม่ว่าจะทำหัตถการเสร็จหรือไม่`,
};

/**
 * 결제 실패 메시지 템플릿 (언어별)
 */
const PAYMENT_FAILURE_TEMPLATES: Record<'ko_KR' | 'en_US' | 'th_TH', string> = {
  ko_KR: `결제 실패 안내

[ 상세 내용 ]
- 병원명: {hospitalName}
- 시술명: {procedureName}
- 시술 예약 날짜: {date}
- 시술 예약 시간: {time}
- 예약금: {amount} USD

[ 결제 실패 사유 ]
{errorMessage}

[ 안내 사항 ]
- 결제가 실패하여 예약이 확정되지 않았습니다.
- 예약을 유지하시려면 다시 결제를 진행해주세요.
- 결제 실패 사유를 확인하시고 문제를 해결한 후 재시도해주세요.
- 문의사항이 있으시면 고객센터로 연락주시기 바랍니다.`,
  en_US: `Payment Failed

[ Details ]
- Hospital: {hospitalName}
- Procedure: {procedureName}
- Reservation Date: {date}
- Reservation Time: {time}
- Deposit: {amount} USD

[ Payment Failure Reason ]
{errorMessage}

[ Notice ]
- Your reservation has not been confirmed due to payment failure.
- Please proceed with payment again to maintain your reservation.
- Please check the payment failure reason and retry after resolving the issue.
- If you have any questions, please contact customer service.`,
  th_TH: `การชำระเงินล้มเหลว

[ รายละเอียด ]
- โรงพยาบาล: {hospitalName}
- ขั้นตอน: {procedureName}
- วันที่จอง: {date}
- เวลาจอง: {time}
- ค่ามัดจำ: {amount} USD

[ เหตุผลที่การชำระเงินล้มเหลว ]
{errorMessage}

[ หมายเหตุ ]
- การจองของคุณยังไม่ได้รับการยืนยันเนื่องจากการชำระเงินล้มเหลว
- กรุณาดำเนินการชำระเงินอีกครั้งเพื่อรักษาการจองของคุณ
- กรุณาตรวจสอบเหตุผลที่การชำระเงินล้มเหลวและลองใหม่อีกครั้งหลังจากแก้ไขปัญหา
- หากคุณมีคำถามกรุณาติดต่อฝ่ายบริการลูกค้า`,
};
