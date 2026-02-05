import { type Locale } from 'shared/config';
import { type DatabaseLocale } from 'shared/lib/localized-text';

/**
 * Locale을 DatabaseLocale로 변환하는 함수
 * @param locale - Locale 값 ('ko', 'en', 'th', 'zh-Hant', 'ja', 'hi', 'tl')
 * @returns DatabaseLocale 값 ('ko_KR', 'en_US', 'th_TH', 'zh_TW', 'ja_JP', 'hi_IN', 'tl_PH')
 */
export function localeToDatabaseLocale(locale: Locale): DatabaseLocale {
  switch (locale) {
    case 'ko':
      return 'ko_KR';
    case 'en':
      return 'en_US';
    case 'th':
      return 'th_TH';
    case 'zh-Hant':
      return 'zh_TW';
    case 'ja':
      return 'ja_JP';
    case 'hi':
      return 'hi_IN';
    case 'tl':
      return 'tl_PH';
    case 'ar':
      return 'ar_SA';
    case 'ru':
      return 'ru_RU';
    default:
      return 'en_US';
  }
}

/**
 * DatabaseLocale을 Locale로 변환하는 함수
 * @param databaseLocale - DatabaseLocale 값 ('ko_KR', 'en_US', 'th_TH', 'zh_TW', 'ja_JP', 'hi_IN', 'tl_PH')
 * @returns Locale 값 ('ko', 'en', 'th', 'zh-Hant', 'ja', 'hi', 'tl')
 */
export function databaseLocaleToLocale(databaseLocale: DatabaseLocale): Locale {
  switch (databaseLocale) {
    case 'ko_KR':
      return 'ko';
    case 'en_US':
      return 'en';
    case 'th_TH':
      return 'th';
    case 'zh_TW':
      return 'zh-Hant';
    case 'ja_JP':
      return 'ja';
    case 'hi_IN':
      return 'hi';
    case 'tl_PH':
      return 'tl';
    case 'ar_SA':
      return 'ar';
    case 'ru_RU':
      return 'ru';
    default:
      return 'en';
  }
}
