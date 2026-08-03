import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from 'shared/config';

const IMAGE_BASE = '/images/event/pick_your_gift';

/** 이미지 폴더가 있는 로케일. 없으면 기본 로케일로 폴백한다. */
const LOCALES_WITH_IMAGES: readonly Locale[] = SUPPORTED_LOCALES;

export function getImageLocale(lang: Locale): Locale {
  return LOCALES_WITH_IMAGES.includes(lang) ? lang : DEFAULT_LOCALE;
}

export function getSectionImageSrc(lang: Locale, sectionId: string): string {
  return `${IMAGE_BASE}/${getImageLocale(lang)}/${sectionId}.webp`;
}
