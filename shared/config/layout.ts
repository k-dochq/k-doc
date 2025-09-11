/**
 * 레이아웃 관련 상수 정의
 */

// 모바일 앱의 최대 너비 (px)
export const MAX_MOBILE_WIDTH = 500;

// Tailwind CSS 클래스로 사용할 수 있는 형태
export const MAX_MOBILE_WIDTH_CLASS = `max-w-[${MAX_MOBILE_WIDTH}px]`;

// 레이아웃 관련 상수들
export const LAYOUT = {
  MAX_MOBILE_WIDTH,
  MAX_MOBILE_WIDTH_CLASS,
} as const;
