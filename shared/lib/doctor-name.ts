import { type Prisma } from '@prisma/client';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from './localized-text';
import { type LocalizedText, getLocalizedTextByLocale } from 'shared/model/types/common';

/**
 * 의사 이름을 추출하는 함수 (Prisma.JsonValue 타입)
 * - 한국어(ko) 선택 시: 한국어(ko_KR)로 표시
 * - 한국어 외 다른 언어 선택 시: 영어(en_US)로 표시
 *
 * @param jsonValue - Prisma.JsonValue 타입의 의사 이름
 * @param locale - 현재 선택된 언어
 * @returns 추출된 의사 이름 문자열
 */
export function getDoctorNameFromJsonValue(
  jsonValue: Prisma.JsonValue | null | undefined,
  locale: Locale,
): string {
  // locale이 'ko'이면 'ko'로, 그 외에는 'en'으로 변환하여 extractLocalizedText 호출
  const targetLocale = locale === 'ko' ? 'ko' : 'en';
  return extractLocalizedText(jsonValue, targetLocale);
}

/**
 * 의사 이름을 추출하는 함수 (LocalizedText 타입)
 * - 한국어(ko) 선택 시: 한국어(ko_KR)로 표시
 * - 한국어 외 다른 언어 선택 시: 영어(en_US)로 표시
 *
 * @param text - LocalizedText 타입의 의사 이름
 * @param locale - 현재 선택된 언어
 * @returns 추출된 의사 이름 문자열
 */
export function getDoctorNameFromLocalizedText(text: LocalizedText, locale: Locale): string {
  // locale이 'ko'이면 'ko'로, 그 외에는 'en'으로 변환하여 getLocalizedTextByLocale 호출
  const targetLocale = locale === 'ko' ? 'ko' : 'en';
  return getLocalizedTextByLocale(text, targetLocale);
}
