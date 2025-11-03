/**
 * 웹뷰와 React Native 간 통신을 위한 유틸리티 함수들
 */

import type { NotificationPermissionResponse } from 'shared/model/types/webview-communication';
import { isExpoWebView } from 'shared/lib/webview-detection';

// 단일 pending promise 관리
let pendingRequest: {
  resolve: (response: NotificationPermissionResponse) => void;
  reject: (error: Error) => void;
  timeout: NodeJS.Timeout;
} | null = null;

// 응답 리스너 초기화 (한 번만 실행)
let isListenerInitialized = false;

function initResponseListener() {
  if (isListenerInitialized || typeof window === 'undefined') return;

  const webViewWindow = window as any;

  // React Native WebView에서 injectJavaScript로 호출될 전역 핸들러 등록
  webViewWindow.__handleNotificationPermissionResponse = (
    response: NotificationPermissionResponse,
  ) => {
    if (response.type === 'NOTIFICATION_PERMISSION_RESPONSE') {
      if (pendingRequest) {
        clearTimeout(pendingRequest.timeout);
        pendingRequest.resolve(response);
        pendingRequest = null;
      }
    }
  };

  isListenerInitialized = true;
}

/**
 * React Native 앱에서 알림 권한 상태를 확인합니다.
 * @returns 알림 권한 상태 정보
 * @throws 일반 브라우저 환경이거나 타임아웃 발생 시 에러
 */
export function requestNotificationPermission(): Promise<NotificationPermissionResponse> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window is not available'));
  }

  const webViewWindow = window as any;
  if (!webViewWindow.ReactNativeWebView?.postMessage) {
    return Promise.reject(new Error('Not in React Native WebView environment'));
  }

  // 이미 대기 중인 요청이 있으면 에러
  if (pendingRequest) {
    return Promise.reject(new Error('Another request is already pending'));
  }

  initResponseListener();

  return new Promise((resolve, reject) => {
    // 타임아웃 설정 (5초)
    const timeout = setTimeout(() => {
      pendingRequest = null;
      reject(new Error('Request timeout'));
    }, 5000);

    pendingRequest = { resolve, reject, timeout };

    const request = {
      source: 'kdoc-web',
      type: 'NOTIFICATION_PERMISSION_REQUEST',
    };

    webViewWindow.ReactNativeWebView.postMessage(JSON.stringify(request));
  });
}

/**
 * React Native 앱의 알림 설정 화면을 엽니다.
 * @throws 일반 브라우저 환경일 때 에러
 */
export function openNotificationSettings(): void {
  if (typeof window === 'undefined') {
    console.warn('Window is not available');
    return;
  }

  const webViewWindow = window as any;
  if (!webViewWindow.ReactNativeWebView?.postMessage) {
    console.warn('Not in React Native WebView environment');
    return;
  }

  const request = {
    source: 'kdoc-web',
    type: 'OPEN_NOTIFICATION_SETTINGS_REQUEST',
  };

  webViewWindow.ReactNativeWebView.postMessage(JSON.stringify(request));
}
