import { type Prisma, type PaymentStatus, type ReservationStatus } from '@prisma/client';

/**
 * Payverse 웹훅 요청 타입
 * 참고: https://docs.payverseglobal.com/ko/apisdk/v1.0.0/additional-feature-api/additional-feature/
 */
export interface PayverseWebhookRequest {
  type: 'Sale' | 'Refund';
  mid: string;
  tid: string;
  schemeGroup: string;
  schemeCode: string;
  orderId: string;
  productName: string;
  requestCurrency: string;
  requestAmount: string;
  installmentMonths?: string;
  resultStatus: 'SUCCESS' | 'DECLINE';
  resultCode: string;
  resultMessage: string;
  approvalNo?: string;
  approvalCurrency?: string;
  cancelCurrency?: string;
  approvalAmount?: string;
  cancelAmount?: string;
  approvalDay?: string;
  cancelDay?: string;
  approvalTime?: string;
  cancelTime?: string;
  mallReserved?: string;
  billKey?: string;
  sign: string;
}

/**
 * Payverse 웹훅 응답 타입
 */
export interface PayverseWebhookResponse {
  receiveResult: 'SUCCESS' | 'FAIL';
  message?: string;
}

/**
 * 웹훅 처리 결과 타입
 */
export interface ProcessPaymentWebhookResult {
  success: boolean;
  processedTid?: string;
  error?: string;
}

/**
 * Payment metadata 타입 (Prisma Json 필드)
 */
export interface PaymentMetadata {
  tid: string;
  type: 'Sale' | 'Refund';
  approvalDay?: string;
  approvalTime?: string;
  cancelDay?: string;
  cancelTime?: string;
}

/**
 * Payment paymentMethod 타입 (Prisma Json 필드)
 */
export interface PaymentMethodData {
  schemeGroup: string;
  schemeCode: string;
  approvalNo?: string;
}

/**
 * Reservation metadata 타입 (Prisma Json 필드)
 */
export interface ReservationMetadata {
  category?: string;
  language: 'ko_KR' | 'en_US' | 'th_TH' | 'tl_PH';
  customGuideText?: string;
  customDetails?: string;
  customNotice?: string;
  buttonText?: string;
}

/**
 * ReservationStatusHistory metadata 타입 (Prisma Json 필드)
 */
export interface ReservationStatusHistoryMetadata {
  tid?: string;
  approvalNo?: string;
  createdBy?: string;
  language?: string;
}

/**
 * Prisma 타입 활용한 엔티티
 */
export type PaymentWithRelations = Prisma.PaymentGetPayload<{
  include: {
    Reservation: true;
  };
}>;

export type ReservationWithRelations = Prisma.ReservationGetPayload<{
  include: {
    User: true;
    Hospital: true;
    Payment: true;
    ReservationStatusHistory: true;
  };
}>;

/**
 * Payverse 취소 요청 파라미터
 * 참고: https://docs.payverseglobal.com/ko/apisdk/v1.0.0/additional-feature-api/additional-feature/
 */
export interface PayverseCancelRequest {
  reqDate: string; // YYYYMMDDHHmmss 형식
  tid: string; // 승인 거래 시 PayVerse로부터 응답 받은 TID
  currency: string; // 통화 코드 (승인 요청한 통화와 동일)
  amount: string; // 취소 요청 금액 (소수점 마지막 자리가 '0'인 경우 제거)
  bankNm?: string; // 고객이 환불받을 은행명 (PV01 일부 SchemeGroup 필수)
  accountNo?: string; // 고객이 환불받을 계좌정보 (PV01 일부 SchemeGroup 필수)
  accountHolder?: string; // 예금주 명칭 (PV01 일부 SchemeGroup 필수)
  telNo?: string; // 환불받을 고객의 연락처 (PV01 일부 SchemeGroup 필수)
  email?: string; // 환불받을 고객의 email 정보
  mallReserved?: string; // 가맹점 정보 필드
  cancelWorker?: string; // 취소 요청을 진행한 작업자의 정보
  cancelReason?: string; // 취소 요청에 대한 사유
  sign: string; // 위변조 검증 데이터
}

/**
 * Payverse 취소 응답
 */
export interface PayverseCancelResponse {
  resultStatus: 'SUCCESS' | 'PROCESSING' | 'PENDING' | 'DECLINE' | 'FAILED';
  resultCode: string;
  resultMessage: string;
  cancelTid?: string; // 취소 요청에 대하여 발급하는 TID
  cancelDay?: string; // resultStatus가 "SUCCESS"인 경우 포함, 취소 처리된 일자
  cancelTime?: string; // resultStatus가 "SUCCESS"인 경우 포함, 취소 처리된 시간
  mallReserved?: string; // Request Parameter에서 요청한 정보
}
