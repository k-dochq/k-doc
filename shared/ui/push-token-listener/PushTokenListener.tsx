'use client';

import { useEffect } from 'react';
import type { PushTokenEventDetail } from 'shared/types/push-token';
import type { PushTokenRegisterResponse } from 'shared/types/push-token-api';

export function PushTokenListener() {
  useEffect(() => {
    // React Native 환경(웹뷰)이 아닌 경우 실행하지 않음
    if (typeof window === 'undefined') return;

    // 웹뷰 환경 감지 (React Native WebView에서만 실행)
    const isWebView = window.ReactNativeWebView !== undefined;
    if (!isWebView) {
      console.log('PushTokenListener: 웹뷰 환경이 아니므로 실행하지 않습니다');
      return;
    }

    console.log('PushTokenListener: 웹뷰 환경에서 푸시 토큰 리스너를 시작합니다');

    function onToken(e: CustomEvent<PushTokenEventDetail>) {
      const { token, platform, appVersion } = e.detail;
      if (!token) return;

      console.log('푸시 토큰 수신:', {
        token: token.substring(0, 20) + '...',
        platform,
        appVersion,
      });

      // 서버에 푸시 토큰 등록
      fetch('/api/push/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 쿠키 포함
        body: JSON.stringify({ token, platform, appVersion }),
      })
        .then((response) => response.json())
        .then((data: PushTokenRegisterResponse) => {
          if (data.success) {
            console.log('푸시 토큰 등록 성공:', data.message);
          } else {
            console.error('푸시 토큰 등록 실패:', data.error);
          }
        })
        .catch((error) => {
          console.error('푸시 토큰 등록 요청 실패:', error);
        });
    }

    // 이벤트 리스너 등록
    window.addEventListener('expo:push-token', onToken);

    // 정리 함수
    return () => {
      window.removeEventListener('expo:push-token', onToken);
    };
  }, []);

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
}
