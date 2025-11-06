'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePayment } from '../model/usePayment';
import type { Dictionary } from 'shared/model/types';

interface PaymentHandlerProps {
  orderId: string;
  customerId: string;
  productName: string;
  amount: number;
  dict: Dictionary;
  redirectUrl?: string;
  onError?: (error: Error, message?: string) => void;
}

type LoadingState = 'idle' | 'sdk-loading' | 'sign-generating' | 'window-opening' | 'complete';

/**
 * 결제 처리를 자동으로 수행하는 컴포넌트
 * SDK 로드 확인 후 자동으로 결제 요청을 실행합니다.
 */
export function PaymentHandler({
  orderId,
  customerId,
  productName,
  amount,
  dict,
  redirectUrl,
  onError,
}: PaymentHandlerProps) {
  const { requestPayment } = usePayment();
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<Error | null>(null);
  const [sdkLoadTimeout, setSdkLoadTimeout] = useState<NodeJS.Timeout | null>(null);

  // SDK 로드 확인 및 타임아웃 처리
  const checkSDKLoaded = useCallback((): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      // 이미 로드되어 있는지 확인
      if (typeof window !== 'undefined' && window.payVerse) {
        resolve(true);
        return;
      }

      // 타임아웃 설정 (30초)
      const timeout = setTimeout(() => {
        reject(new Error('SDK_TIMEOUT'));
      }, 30000);

      setSdkLoadTimeout(timeout);

      // SDK 로드 확인 (0.5초마다 체크)
      const checkInterval = setInterval(() => {
        if (typeof window !== 'undefined' && window.payVerse) {
          clearInterval(checkInterval);
          clearTimeout(timeout);
          setSdkLoadTimeout(null);
          resolve(true);
        }
      }, 500);

      // cleanup을 위한 timeout도 저장
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 30000);
    });
  }, []);

  // 결제 요청 실행
  const executePayment = useCallback(async () => {
    try {
      // 1. SDK 로드 확인
      setLoadingState('sdk-loading');
      await checkSDKLoaded();

      // 2. 서명 생성 단계
      setLoadingState('sign-generating');

      // 3. 결제창 호출 단계
      setLoadingState('window-opening');

      // 4. 결제 요청 실행
      await requestPayment({
        orderId,
        customerId,
        productName,
        amount,
        redirectUrl,
      });

      setLoadingState('complete');
    } catch (err) {
      const error = err as Error;
      setError(error);
      setLoadingState('idle');

      // 에러 메시지 결정
      let errorMessage = dict.payment.error.unknownError;

      if (error.message === 'SDK_TIMEOUT') {
        errorMessage = dict.payment.error.sdkTimeout;
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = dict.payment.error.signNetworkError;
      } else if (error.message.includes('timeout')) {
        errorMessage = dict.payment.error.signTimeout;
      } else if (error.message.includes('sign') || error.message.includes('signature')) {
        errorMessage = dict.payment.error.signGenerationFailed;
      } else if (error.message.includes('SDK') || error.message.includes('payVerse')) {
        errorMessage = dict.payment.error.sdkNotLoaded;
      }

      onError?.(error, errorMessage);
    }
  }, [
    orderId,
    customerId,
    productName,
    amount,
    redirectUrl,
    requestPayment,
    checkSDKLoaded,
    dict,
    onError,
  ]);

  // 컴포넌트 마운트 시 자동 실행
  useEffect(() => {
    // 오프라인 상태 확인
    if (typeof window !== 'undefined' && !navigator.onLine) {
      const offlineError = new Error('NETWORK_OFFLINE');
      setError(offlineError);
      onError?.(offlineError, dict.payment.error.signNetworkError);
      return;
    }

    executePayment();

    // cleanup: 타임아웃 제거
    return () => {
      if (sdkLoadTimeout) {
        clearTimeout(sdkLoadTimeout);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 컴포넌트는 UI를 렌더링하지 않음 (상태만 관리)
  return null;
}
