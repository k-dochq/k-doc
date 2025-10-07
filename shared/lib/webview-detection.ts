/**
 * 웹뷰 환경 감지 유틸리티 함수들
 */

import type { WebViewWindow } from 'shared/model/types/social-login';

/**
 * 현재 환경이 Expo WebView인지 확인합니다.
 * React Native WebView에서는 window.ReactNativeWebView가 존재합니다.
 */
export function isExpoWebView(): boolean {
  if (typeof window === 'undefined') return false;

  // RN WebView에서는 window.ReactNativeWebView가 존재
  const webViewWindow = window as WebViewWindow;
  return !!webViewWindow.ReactNativeWebView;
}

/**
 * 현재 환경이 일반 브라우저인지 확인합니다.
 */
export function isBrowser(): boolean {
  if (typeof window === 'undefined') return false;

  return !isExpoWebView();
}
