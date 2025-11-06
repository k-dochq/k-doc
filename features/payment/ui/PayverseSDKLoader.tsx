'use client';

import { useEffect } from 'react';

/**
 * Payverse SDK 로더 컴포넌트
 * 환경 변수에 따라 테스트/운영 환경의 SDK를 동적으로 로드합니다.
 */
export function PayverseSDKLoader() {
  useEffect(() => {
    // 환경 변수 확인
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

    // SDK URL 결정
    const sdkUrl =
      environment === 'production'
        ? 'https://ui.payverseglobal.com/js/payments.js'
        : 'https://ui-snd.payverseglobal.com/js/payments.js';

    // 이미 로드된 스크립트인지 확인
    if (document.querySelector(`script[src="${sdkUrl}"]`)) {
      return;
    }

    // 스크립트 생성 및 로드
    const script = document.createElement('script');
    script.src = sdkUrl;
    script.async = true;
    script.onload = () => {
      console.log('Payverse SDK loaded successfully');

      // Payverse SDK가 window.alert를 사용하는 것을 방지하기 위해 오버라이드
      const originalAlert = window.alert;
      window.alert = (message?: string) => {
        console.warn('[Payverse Alert Blocked]', message);
        // alert를 표시하지 않고 콘솔에만 로그
      };
    };
    script.onerror = () => {
      console.error('Failed to load Payverse SDK');
    };

    document.head.appendChild(script);

    // 클린업 함수: 컴포넌트 언마운트 시 스크립트 제거 (선택사항)
    return () => {
      const existingScript = document.querySelector(`script[src="${sdkUrl}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}
