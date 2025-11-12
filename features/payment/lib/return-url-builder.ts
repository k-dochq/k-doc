/**
 * Payverse 결제 returnUrl 생성 유틸리티
 *
 * React Native Expo 환경에서는 앱 스킴 경로로,
 * 웹 환경에서는 HTTP/HTTPS URL로 returnUrl을 생성합니다.
 */

import { isExpoWebView } from 'shared/lib/webview-detection';

/**
 * 앱 스킴 설정
 */
const APP_SCHEME = 'kdoc';

/**
 * returnUrl 생성 옵션
 */
export interface BuildReturnUrlOptions {
  /** 사용자 지정 returnUrl (우선순위 최우선) */
  customReturnUrl?: string;
  /** 로케일 (기본값: 'en') */
  locale?: string;
}

/**
 * React Native Expo 환경에서 앱 스킴 경로로 returnUrl 생성
 */
function buildAppSchemeReturnUrl(locale: string = 'en'): string {
  // 앱 스킴 경로: kdoc://payment/return
  return `${APP_SCHEME}://payment/return`;
}

/**
 * 웹 환경에서 HTTP/HTTPS URL로 returnUrl 생성
 */
function buildWebReturnUrl(locale: string = 'en'): string {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 기본값 반환
    return `/payment/return`;
  }

  const baseUrl = window.location.origin;
  return `${baseUrl}/${locale}/payment/return`;
}

/**
 * Payverse 결제용 returnUrl 생성
 *
 * @param options - returnUrl 생성 옵션
 * @returns 생성된 returnUrl
 *
 * @example
 * ```ts
 * // React Native Expo 환경
 * const returnUrl = buildReturnUrl(); // "kdoc://payment/return"
 *
 * // 웹 환경
 * const returnUrl = buildReturnUrl({ locale: 'en' }); // "https://example.com/en/payment/return"
 *
 * // 사용자 지정 URL
 * const returnUrl = buildReturnUrl({ customReturnUrl: '/custom/path' }); // "https://example.com/custom/path"
 * ```
 */
export function buildReturnUrl(options: BuildReturnUrlOptions = {}): string {
  const { customReturnUrl, locale = 'en' } = options;

  // 사용자 지정 returnUrl이 있으면 우선 사용
  if (customReturnUrl) {
    // 절대 URL인 경우 그대로 반환
    if (customReturnUrl.startsWith('http://') || customReturnUrl.startsWith('https://')) {
      return customReturnUrl;
    }

    // 앱 스킴 URL인 경우 그대로 반환
    if (customReturnUrl.startsWith(`${APP_SCHEME}://`)) {
      return customReturnUrl;
    }

    // 상대 경로인 경우 환경에 따라 처리
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin;
      return `${baseUrl}${customReturnUrl.startsWith('/') ? customReturnUrl : `/${customReturnUrl}`}`;
    }

    return customReturnUrl;
  }

  // React Native Expo 환경인지 확인
  if (isExpoWebView()) {
    return buildAppSchemeReturnUrl(locale);
  }

  // 웹 환경
  return buildWebReturnUrl(locale);
}
