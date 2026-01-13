import { type Locale } from 'shared/config';

/**
 * 회사명을 언어에 따라 반환하는 함수
 * - 한국어(ko) 선택 시: 한국어 회사명 반환
 * - 한국어 외 다른 언어 선택 시: 영문 회사명 반환
 *
 * @param locale - 현재 선택된 언어
 * @returns 회사명 문자열
 */
export function getCompanyName(locale: Locale): string {
  return locale === 'ko' ? '주식회사 필만' : 'FILLMAN co., Ltd.';
}

/**
 * 대표이사 이름을 언어에 따라 반환하는 함수
 * - 한국어(ko) 선택 시: 한국어 이름 반환
 * - 한국어 외 다른 언어 선택 시: 영문 이름 반환
 *
 * @param locale - 현재 선택된 언어
 * @returns 대표이사 이름 문자열
 */
export function getCeoName(locale: Locale): string {
  return locale === 'ko' ? '우정호' : 'Woo Jung Ho';
}
