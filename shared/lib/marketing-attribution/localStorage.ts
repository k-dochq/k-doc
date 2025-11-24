'use client';

import type { MarketingAttribution } from './types';

const FIRST_TOUCH_KEY = 'first_touch';
const FIRST_TOUCH_SAVED_KEY = 'first_touch_saved';

/**
 * LocalStorage에서 first_touch 데이터를 읽어옵니다.
 * @returns MarketingAttribution 객체 또는 null
 */
export function getFirstTouch(): MarketingAttribution | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(FIRST_TOUCH_KEY);
    if (!stored) return null;

    return JSON.parse(stored) as MarketingAttribution;
  } catch (error) {
    console.error('Failed to read first_touch from localStorage:', error);
    return null;
  }
}

/**
 * first_touch_saved 플래그가 있는지 확인합니다.
 * @returns 플래그 존재 여부
 */
export function hasFirstTouchSaved(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const saved = localStorage.getItem(FIRST_TOUCH_SAVED_KEY);
    return saved === 'true';
  } catch (error) {
    console.error('Failed to check first_touch_saved flag:', error);
    return false;
  }
}

/**
 * first_touch 데이터를 LocalStorage에 저장합니다.
 * @param attribution 저장할 MarketingAttribution 객체
 * @returns 저장 성공 여부
 */
export function saveFirstTouch(attribution: MarketingAttribution): boolean {
  if (typeof window === 'undefined') return false;

  // 이미 저장된 경우 저장하지 않음
  if (hasFirstTouchSaved()) {
    return false;
  }

  try {
    // first_touch 데이터 저장
    localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(attribution));
    // 저장 플래그 설정
    localStorage.setItem(FIRST_TOUCH_SAVED_KEY, 'true');
    return true;
  } catch (error) {
    // LocalStorage 접근 실패 시 조용히 실패 (사파리 등)
    console.error('Failed to save first_touch to localStorage:', error);
    return false;
  }
}

/**
 * first_touch 데이터와 플래그를 모두 삭제합니다.
 * (회원가입 완료 후 사용)
 */
export function clearFirstTouch(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(FIRST_TOUCH_KEY);
    localStorage.removeItem(FIRST_TOUCH_SAVED_KEY);
  } catch (error) {
    console.error('Failed to clear first_touch from localStorage:', error);
  }
}
