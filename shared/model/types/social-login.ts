/**
 * 소셜로그인 관련 타입 정의
 */

export type SocialProvider = 'google' | 'apple';

/**
 * Expo 앱으로 전송할 로그인 요청 메시지 타입
 */
export interface ExpoLoginRequest {
  source: 'kdoc-web';
  type: 'LOGIN_REQUEST';
  provider: SocialProvider;
  redirectPath?: string;
  locale?: string;
}

/**
 * 웹뷰 환경에서 사용되는 window 객체 확장 타입
 */
export interface WebViewWindow extends Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
}

/**
 * 소셜로그인 버튼 컴포넌트의 공통 props
 */
export interface SocialLoginButtonProps {
  lang: string;
  dict: Record<string, unknown>;
  redirectTo?: string;
  className?: string;
}
