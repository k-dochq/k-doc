export const SUPPORTED_LOCALES = ['en', 'ko', 'th'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

// 정적 생성용 언어
export const STATIC_GENERATION_LOCALES = [] as const;

export type StaticGenerationLocale = (typeof STATIC_GENERATION_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  th: 'ไทย',
};

export const isValidLocale = (locale: string): locale is Locale => {
  return SUPPORTED_LOCALES.includes(locale as Locale);
};
