import { type Prisma } from '@prisma/client';
import { type Locale } from 'shared/config';

// LocalizedText 타입 정의
export type LocalizedText = {
  ko_KR?: string;
  en_US?: string;
  th_TH?: string;
  zh_TW?: string;
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

  const localeKey =
    locale === 'ko' ? 'ko_KR' : locale === 'en' ? 'en_US' : locale === 'th' ? 'th_TH' : 'zh_TW';
  const shortLocaleKey = locale; // ko, en, th, zh-Hant

  if (typeof jsonValue === 'object' && jsonValue !== null && !Array.isArray(jsonValue)) {
    const localizedText = jsonValue as Record<string, unknown>;

    // 모든 값이 빈 문자열인지 확인
    const allKeys = ['ko_KR', 'en_US', 'th_TH', 'zh_TW', 'ko', 'en', 'th', 'zh-Hant'];
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

    // 먼저 긴 형식 (ko_KR, en_US, th_TH, zh_TW) 확인
    if (localizedText[localeKey] && typeof localizedText[localeKey] === 'string') {
      const value = localizedText[localeKey] as string;
      return value.trim() !== '' ? value : '';
    }

    // 짧은 형식 (ko, en, th, zh-Hant) 확인
    if (localizedText[shortLocaleKey] && typeof localizedText[shortLocaleKey] === 'string') {
      const value = localizedText[shortLocaleKey] as string;
      return value.trim() !== '' ? value : '';
    }

    // zh-Hant locale인데 zh_TW가 없으면 영어로 fallback
    if (locale === 'zh-Hant') {
      if (localizedText['en_US'] && typeof localizedText['en_US'] === 'string') {
        const value = localizedText['en_US'] as string;
        if (value.trim() !== '') {
          return value;
        }
      }
      // en_US도 없으면 'en' 확인
      if (localizedText['en'] && typeof localizedText['en'] === 'string') {
        const value = localizedText['en'] as string;
        if (value.trim() !== '') {
          return value;
        }
      }
    }

    // fallback: 첫 번째 사용 가능한 값 반환 (긴 형식 우선)
    const fallbackOrder = [
      'ko_KR',
      'en_US',
      'th_TH',
      'zh_TW', // 긴 형식
      'ko',
      'en',
      'th',
      'zh-Hant', // 짧은 형식
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
 * Locale을 alt 필드 값(ko_KR, en_US, th_TH, zh_TW)으로 변환
 * @param locale - Locale 값 ('ko', 'en', 'th', 'zh-Hant')
 * @returns alt 필드 값 ('ko_KR', 'en_US', 'th_TH', 'zh_TW')
 */
export function localeToAltValue(locale: Locale): 'ko_KR' | 'en_US' | 'th_TH' | 'zh_TW' {
  switch (locale) {
    case 'ko':
      return 'ko_KR';
    case 'en':
      return 'en_US';
    case 'th':
      return 'th_TH';
    case 'zh-Hant':
      return 'zh_TW';
    default:
      return 'en_US';
  }
}
