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
    const primaryLangFull = acceptLanguage.split(',')[0].split(';')[0].trim();

    // 먼저 전체 locale 코드 확인 (예: zh-Hant)
    if (isValidLocale(primaryLangFull)) {
      return normalizeLocale(primaryLangFull);
    }

    // 전체 locale 코드가 유효하지 않으면 primary language만 추출
    const primaryLang = primaryLangFull.split('-')[0];

    // zh인 경우 zh-Hant로 매핑
    if (primaryLang === 'zh') {
      return normalizeLocale('zh-Hant');
    }

    // ja인 경우 ja로 매핑
    if (primaryLang === 'ja') {
      return normalizeLocale('ja');
    }

    // ar인 경우 ar로 매핑
    if (primaryLang === 'ar') {
      return normalizeLocale('ar');
    }

    // 지원되는 locale인지 확인하고 반환
    if (isValidLocale(primaryLang)) {
      return normalizeLocale(primaryLang);
    }
  }

  // 3. 지원되지 않는 locale이거나 accept-language가 없는 경우 기본 locale 반환
  return normalizeLocale(DEFAULT_LOCALE);
}
