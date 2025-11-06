'use client';

import { useCallback } from 'react';
import { PAYVERSE_CONFIG } from '../config/payverse';
import type { PayversePaymentParams } from './types';

/**
 * Payverse 결제 요청 훅
 */
export function usePayment() {
  /**
   * 서버 API를 통해 서명 생성
   * 보안을 위해 서버 사이드에서만 SecretKey를 사용하여 서명을 생성합니다.
   */
  const generateSign = useCallback(
    async (params: {
      orderId: string;
      requestAmount: string;
      reqDate: string;
    }): Promise<string> => {
      try {
        const response = await fetch('/api/payment/generate-sign', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: params.orderId,
            amount: params.requestAmount,
            reqDate: params.reqDate,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to generate sign');
        }

        const data = await response.json();
        return data.data.sign;
      } catch (error) {
        console.error('Failed to generate sign:', error);
        throw error;
      }
    },
    [],
  );

  /**
   * 결제 요청 실행
   */
  const requestPayment = useCallback(
    async (orderInfo: {
      orderId: string;
      customerId: string;
      productName: string;
      amount: number;
      currency?: string;
      returnUrl?: string;
      webhookUrl?: string;
    }) => {
      // SDK가 로드되었는지 확인
      if (!window.payVerse) {
        console.error('Payverse SDK is not loaded');
        return;
      }

      // 현재 시간을 reqDate 형식으로 변환 (YYYYMMDDHHmmss)
      const now = new Date();
      const reqDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

      // returnUrl 및 webhookUrl 생성
      const baseUrl = window.location.origin;
      const locale = window.location.pathname.split('/')[1] || 'ko';
      const returnUrl = orderInfo.returnUrl || `${baseUrl}/${locale}/payment/return`;
      const webhookUrl = orderInfo.webhookUrl || `${baseUrl}/api/payment/webhook`;

      // 서명 생성에 사용할 파라미터
      const signParams = {
        orderId: orderInfo.orderId,
        requestAmount: String(orderInfo.amount),
        reqDate,
      };

      console.log(
        '🔍 [Payment Debug] 서명 생성 요청 파라미터:',
        JSON.stringify(
          {
            ...signParams,
            mid: PAYVERSE_CONFIG.MID,
            secretKey: PAYVERSE_CONFIG.SECRET_KEY.substring(0, 4) + '***', // 보안을 위해 일부만 표시
          },
          null,
          2,
        ),
      );

      // 서버 API를 통해 서명 생성
      const sign = await generateSign(signParams);

      console.log('✅ [Payment Debug] 생성된 서명:', sign);

      // 결제 파라미터 구성
      const paymentParams: PayversePaymentParams = {
        mid: PAYVERSE_CONFIG.MID,
        sign,
        clientKey: PAYVERSE_CONFIG.CLIENT_KEY,
        orderId: orderInfo.orderId,
        customerId: orderInfo.customerId,
        productName: orderInfo.productName,
        requestCurrency: orderInfo.currency || PAYVERSE_CONFIG.CURRENCY,
        requestAmount: String(orderInfo.amount),
        reqDate,
        returnUrl,
        webhookUrl,
        billkeyReq: 'N',
        mallReserved: '',
      };

      console.log(
        '🚀 [Payment Debug] Payverse SDK에 전달할 파라미터:',
        JSON.stringify(
          {
            ...paymentParams,
            clientKey: paymentParams.clientKey.substring(0, 4) + '***', // 보안을 위해 일부만 표시
            sign: sign.substring(0, 16) + '...', // 서명의 일부만 표시
          },
          null,
          2,
        ),
      );

      console.log(
        '🔍 [Payment Debug] 서명 검증용 Plain Text 예상값:',
        JSON.stringify(
          {
            plainText: `||${PAYVERSE_CONFIG.SECRET_KEY}||${PAYVERSE_CONFIG.MID}||${paymentParams.orderId}||${paymentParams.requestAmount}||${paymentParams.reqDate}||`,
            usedParams: {
              secretKey: PAYVERSE_CONFIG.SECRET_KEY.substring(0, 4) + '***',
              mid: PAYVERSE_CONFIG.MID,
              orderId: paymentParams.orderId,
              amount: paymentParams.requestAmount,
              reqDate: paymentParams.reqDate,
            },
          },
          null,
          2,
        ),
      );

      // Payverse SDK 호출
      window.payVerse.requestUI(paymentParams);
    },
    [generateSign],
  );

  return {
    requestPayment,
  };
}
