import { type Prisma } from '@prisma/client';
import { type Locale } from 'shared/config';

// LocalizedText 타입 정의
export type LocalizedText = {
  ko_KR?: string;
  en_US?: string;
  th_TH?: string;
};

// LocalizedText에서 문자열 추출 헬퍼 함수
export function extractLocalizedText(
  jsonValue: Prisma.JsonValue | null | undefined,
  locale: Locale,
): string {
  if (!jsonValue) return '';
  if (typeof jsonValue === 'string') return jsonValue;
  if (typeof jsonValue === 'number' || typeof jsonValue === 'boolean') {
    return String(jsonValue);
  }

  const localeKey = locale === 'ko' ? 'ko_KR' : locale === 'en' ? 'en_US' : 'th_TH';
  const shortLocaleKey = locale; // ko, en, th

  if (typeof jsonValue === 'object' && jsonValue !== null && !Array.isArray(jsonValue)) {
    const localizedText = jsonValue as Record<string, unknown>;

    // 모든 값이 빈 문자열인지 확인
    const allKeys = ['ko_KR', 'en_US', 'th_TH', 'ko', 'en', 'th'];
    const hasNonEmptyValue = allKeys.some(
      (key) =>
        localizedText[key] &&
        typeof localizedText[key] === 'string' &&
        (localizedText[key] as string).trim() !== '',
    );

    // 모든 값이 빈 문자열이면 빈 문자열 반환
    if (!hasNonEmptyValue) {
      return '';
    }

    // 먼저 긴 형식 (ko_KR, en_US, th_TH) 확인
    if (localizedText[localeKey] && typeof localizedText[localeKey] === 'string') {
      const value = localizedText[localeKey] as string;
      return value.trim() !== '' ? value : '';
    }

    // 짧은 형식 (ko, en, th) 확인
    if (localizedText[shortLocaleKey] && typeof localizedText[shortLocaleKey] === 'string') {
      const value = localizedText[shortLocaleKey] as string;
      return value.trim() !== '' ? value : '';
    }

    // fallback: 첫 번째 사용 가능한 값 반환 (긴 형식 우선)
    const fallbackOrder = [
      'ko_KR',
      'en_US',
      'th_TH', // 긴 형식
      'ko',
      'en',
      'th', // 짧은 형식
    ];

    for (const key of fallbackOrder) {
      if (localizedText[key] && typeof localizedText[key] === 'string') {
        const value = localizedText[key] as string;
        if (value.trim() !== '') {
          return value;
        }
      }
    }
  }

  return String(jsonValue);
}

/**
 * Locale을 alt 필드 값(ko_KR, en_US, th_TH)으로 변환
 * @param locale - Locale 값 ('ko', 'en', 'th')
 * @returns alt 필드 값 ('ko_KR', 'en_US', 'th_TH')
 */
export function localeToAltValue(locale: Locale): 'ko_KR' | 'en_US' | 'th_TH' {
  switch (locale) {
    case 'ko':
      return 'ko_KR';
    case 'en':
      return 'en_US';
    case 'th':
      return 'th_TH';
    default:
      return 'en_US';
  }
}
