import { type Locale } from 'shared/config';

interface Thumbnail {
  id: string;
  locale: string;
  imageUrl: string;
  alt: string | null;
}

/**
 * YoutubeVideo의 썸네일을 locale에 맞게 선택하는 함수
 * Fallback 순서: 현재 locale -> en -> th -> ko
 * @param thumbnails 썸네일 배열
 * @param locale 현재 locale
 * @returns 선택된 썸네일 또는 null
 */
export function getYoutubeVideoThumbnail(
  thumbnails: Thumbnail[],
  locale: Locale,
): Thumbnail | null {
  if (!thumbnails || thumbnails.length === 0) {
    return null;
  }

  // Fallback 순서: 현재 locale -> en -> th -> ko
  const fallbackOrder: Locale[] = [locale, 'en', 'th', 'ko'];

  for (const fallbackLocale of fallbackOrder) {
    const thumbnail = thumbnails.find((thumb) => thumb.locale === fallbackLocale);
    if (thumbnail) {
      return thumbnail;
    }
  }

  // 모든 fallback이 실패하면 첫 번째 썸네일 반환
  return thumbnails[0] || null;
}
