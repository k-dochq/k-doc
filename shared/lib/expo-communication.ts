/**
 * Expo 앱과의 통신을 위한 유틸리티 함수들
 */

import type { ExpoLoginRequest, WebViewWindow } from 'shared/model/types/social-login';

/**
 * Expo 앱으로 로그인 요청 메시지를 전송합니다.
 * @param provider 소셜로그인 제공자
 * @param redirectPath 로그인 후 리다이렉트할 경로
 */
export function sendLoginRequestToExpo(
  provider: ExpoLoginRequest['provider'],
  redirectPath?: string,
): void {
  if (typeof window === 'undefined') {
    console.warn('sendLoginRequestToExpo: window is not available');
    return;
  }

  const payload: ExpoLoginRequest = {
    source: 'kdoc-web',
    type: 'LOGIN_REQUEST',
    provider,
    redirectPath: redirectPath ?? window.location.pathname + window.location.search,
  };

  try {
    const webViewWindow = window as WebViewWindow;
    if (webViewWindow.ReactNativeWebView?.postMessage) {
      webViewWindow.ReactNativeWebView.postMessage(JSON.stringify(payload));
    } else {
      console.warn('ReactNativeWebView is not available');
    }
  } catch (error) {
    console.error('Failed to send message to Expo app:', error);
  }
}

/**
 * 웹뷰에서 리다이렉트 경로를 쿠키에 저장합니다.
 * @param redirectPath 저장할 리다이렉트 경로
 */
export function setRedirectPathCookie(redirectPath: string): void {
  if (typeof document === 'undefined') {
    console.warn('setRedirectPathCookie: document is not available');
    return;
  }

  try {
    document.cookie = `auth_redirect_path=${encodeURIComponent(redirectPath)}; Path=/; Max-Age=600; SameSite=Lax; Secure`;
  } catch (error) {
    console.error('Failed to set redirect path cookie:', error);
  }
}
