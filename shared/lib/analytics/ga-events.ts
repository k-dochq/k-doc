import { sendGAEvent as nextSendGAEvent } from '@next/third-parties/google';
import { type Locale } from 'shared/config';

/**
 * GA 이벤트 타입 정의
 */
export type GAEventName = 'sign_up_click' | 'sign_up' | 'view_item';

/**
 * GA 이벤트 파라미터 타입 정의
 */
export interface GAEventParams {
  event_category?: string;
  event_label?: string;
  method?: string;
  value?: number;
  item_id?: string;
  item_name?: string;
  item_category?: string;
  language?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * 타입 안전한 GA 이벤트 전송 함수
 * @param eventName 이벤트 이름
 * @param parameters 이벤트 파라미터
 */
export function sendGAEvent(eventName: GAEventName, parameters?: GAEventParams): void {
  try {
    nextSendGAEvent('event', eventName, parameters || {});
  } catch (error) {
    console.warn('GA 이벤트 전송 실패:', error);
  }
}

/**
 * 회원가입 버튼 클릭 이벤트 전송
 * @param source 이벤트 발생 위치 (예: 'login_modal', 'header')
 */
export function trackSignUpClick(source: string = 'unknown'): void {
  sendGAEvent('sign_up_click', {
    event_category: 'engagement',
    event_label: `Sign Up Button Click - ${source}`,
    source,
  });
}

/**
 * 회원가입 완료 이벤트 전송
 * @param method 회원가입 방법 (예: 'email', 'google', 'apple')
 */
export function trackSignUpComplete(method: string = 'email'): void {
  sendGAEvent('sign_up', {
    event_category: 'conversion',
    event_label: 'Sign Up Completed',
    method,
  });
}

/**
 * 병원 상세 페이지 view_item 이벤트 전송
 * @param hospitalId 병원 UUID
 * @param hospitalName 병원명 (현재 언어)
 * @param lang 현재 페이지 언어 코드
 */
export function trackViewItem(hospitalId: string, hospitalName: string, lang: Locale): void {
  sendGAEvent('view_item', {
    item_id: hospitalId,
    item_name: hospitalName,
    item_category: 'Hospital',
    language: lang,
  });
}
