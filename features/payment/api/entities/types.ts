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
  language: 'ko_KR' | 'en_US' | 'th_TH';
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
