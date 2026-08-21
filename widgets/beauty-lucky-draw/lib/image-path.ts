import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from 'shared/config';

const IMAGE_BASE = '/images/event/beauty_lucky_draw';

/**
 * 이미지가 준비된 언어. 디자인팀에서 지원 언어 전부(9개)를 받았다.
 * 일부 언어가 빠지면 여기서 제외하면 기본 언어 이미지로 대체된다.
 */
const LOCALES_WITH_IMAGES: readonly Locale[] = SUPPORTED_LOCALES;

export function getImageLocale(lang: Locale): Locale {
  return LOCALES_WITH_IMAGES.includes(lang) ? lang : DEFAULT_LOCALE;
}

/**
 * 현재 언어의 섹션 이미지 경로.
 *
 * 언어별 폴더를 따로 두고 경로만 갈아끼우므로, 브라우저는 선택된 언어의 이미지만 내려받는다.
 */
export function getSectionImageSrc(lang: Locale, sectionId: string): string {
  return `${IMAGE_BASE}/${getImageLocale(lang)}/${sectionId}.webp`;
}
