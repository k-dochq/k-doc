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

    // 먼저 긴 형식 (ko_KR, en_US, th_TH) 확인
    if (localizedText[localeKey] && typeof localizedText[localeKey] === 'string') {
      return localizedText[localeKey] as string;
    }

    // 짧은 형식 (ko, en, th) 확인
    if (localizedText[shortLocaleKey] && typeof localizedText[shortLocaleKey] === 'string') {
      return localizedText[shortLocaleKey] as string;
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
        return localizedText[key] as string;
      }
    }
  }

  return String(jsonValue);
}
