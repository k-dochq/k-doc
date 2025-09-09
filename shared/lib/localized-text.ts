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

  if (typeof jsonValue === 'object' && jsonValue !== null && !Array.isArray(jsonValue)) {
    const localizedText = jsonValue as LocalizedText;
    if (localizedText[localeKey]) {
      return localizedText[localeKey];
    }

    // fallback: 첫 번째 사용 가능한 값 반환
    return localizedText.ko_KR || localizedText.en_US || localizedText.th_TH || '';
  }

  return String(jsonValue);
}
