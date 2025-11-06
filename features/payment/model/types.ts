/**
 * Payverse 결제 관련 타입 정의
 */

export interface PayversePaymentParams {
  mid: string;
  sign: string;
  clientKey: string;
  orderId: string;
  customerId: string;
  productName: string;
  requestCurrency: string;
  requestAmount: string;
  reqDate: string;
  returnUrl: string;
  webhookUrl: string;
  billkeyReq: 'Y' | 'N';
  mallReserved?: string;
}

export interface PayverseReturnParams {
  resultStatus?: string;
  resultCode?: string;
  resultMessage?: string;
  tid?: string;
  orderId?: string;
  mallReserved?: string;
}

declare global {
  interface Window {
    payVerse?: {
      requestUI: (params: PayversePaymentParams) => void;
    };
  }
}
