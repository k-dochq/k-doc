export const SUPPORTED_LOCALES = ['en', 'ko', 'th', 'zh-Hant', 'ja', 'hi', 'tl', 'ar', 'ru'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

// 정적 생성용 언어
export const STATIC_GENERATION_LOCALES = [] as const;

export type StaticGenerationLocale = (typeof STATIC_GENERATION_LOCALES)[number];

// Coming soon 언어 (아직 완전히 지원되지 않는 언어)
export const COMING_SOON_LOCALES = [] as const;

export type ComingSoonLocale = (typeof COMING_SOON_LOCALES)[number];

// 모든 언어 타입 (지원되는 언어 + coming soon 언어)
export type AllLocale = Locale | ComingSoonLocale;

export const DEFAULT_LOCALE: Locale = 'en';

// 지원되는 언어 라벨
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  th: 'ไทย',
  'zh-Hant': '繁體中文',
  ja: '日本語',
  hi: 'हिन्दी',
  tl: 'Filipino',
  ar: 'العربية',
  ru: 'Русский',
};

// Coming soon 언어 라벨
export const COMING_SOON_LOCALE_LABELS: Record<ComingSoonLocale, string> = {};

// 모든 언어 라벨 (지원되는 언어 + coming soon 언어)
export const ALL_LOCALE_LABELS: Record<AllLocale, string> = {
  ...LOCALE_LABELS,
  ...COMING_SOON_LOCALE_LABELS,
};

export const isValidLocale = (locale: string): locale is Locale => {
  return SUPPORTED_LOCALES.includes(locale as Locale);
};

export const isComingSoonLocale = (locale: string): locale is ComingSoonLocale => {
  return COMING_SOON_LOCALES.includes(locale as ComingSoonLocale);
};

export const isAllLocale = (locale: string): locale is AllLocale => {
  return isValidLocale(locale) || isComingSoonLocale(locale);
};
