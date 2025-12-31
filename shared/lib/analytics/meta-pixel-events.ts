/**
 * Meta Pixel 이벤트 트래킹 유틸리티
 * Facebook Pixel (Meta Pixel) 이벤트를 타입 안전하게 전송합니다.
 */

// Meta Pixel의 fbq 함수 타입 선언
declare global {
  interface Window {
    fbq?: (
      command: 'track' | 'trackCustom' | 'init' | 'set',
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

/**
 * Meta Pixel 이벤트 파라미터 타입 정의
 */
export interface MetaPixelEventParams {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  content_category?: string;
  [key: string]: string | string[] | number | boolean | undefined;
}

/**
 * Meta Pixel 이벤트를 전송하는 함수
 * @param eventName 이벤트 이름 (예: 'ViewContent', 'AddToCart', 'Purchase')
 * @param params 이벤트 파라미터
 */
export function trackMetaPixelEvent(eventName: string, params?: MetaPixelEventParams): void {
  if (typeof window === 'undefined') {
    console.warn('Meta Pixel: window is not available');
    return;
  }

  if (!window.fbq) {
    console.warn('Meta Pixel: fbq is not initialized. Make sure MetaPixel component is loaded.');
    return;
  }

  try {
    window.fbq('track', eventName, params || {});
  } catch (error) {
    console.warn('Meta Pixel 이벤트 전송 실패:', error);
  }
}

/**
 * 병원 상세 페이지 ViewContent 이벤트 전송
 * @param hospitalId 병원 UUID
 * @param hospitalName 병원명 (현재 언어)
 */
export function trackHospitalViewContent(hospitalId: string, hospitalName: string): void {
  trackMetaPixelEvent('ViewContent', {
    content_name: hospitalName,
    content_ids: [hospitalId],
    content_type: 'product',
    content_category: 'Hospital',
  });
}
