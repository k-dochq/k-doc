import 'server-only';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale, isValidLocale } from 'shared/config';
import { NextRequest } from 'next/server';

/**
 * Locale을 정규화하는 함수
 * 한국어(ko)는 영어(en)로 변환합니다.
 */
function normalizeLocale(locale: Locale): Locale {
  return locale === 'ko' ? 'en' : locale;
}

export function getLocaleFromRequest(request: NextRequest): Locale {
  // 1. 쿠키에서 locale 확인 (사용자가 선택한 언어)
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return normalizeLocale(cookieLocale);
  }

  // 2. Browser Accept-Language 헤더에서 감지
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    // 가장 우선순위 높은 언어 코드 추출 (예: 'ko,en;q=0.9')
    const primaryLang = acceptLanguage.split(',')[0].split('-')[0];

    // 지원되는 locale인지 확인하고 반환
    if (isValidLocale(primaryLang)) {
      return normalizeLocale(primaryLang);
    }
  }

  // 3. 지원되지 않는 locale이거나 accept-language가 없는 경우 기본 locale 반환
  return normalizeLocale(DEFAULT_LOCALE);
}
