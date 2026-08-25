import { type EventBannerLocale } from '@prisma/client';
import { type Locale } from 'shared/config';

/** 웹 로케일 → DB 로케일. DB 는 `zh` 를 쓴다(기존 배너 관례) */
export function toDbLocale(lang: Locale): EventBannerLocale {
  return (lang === 'zh-Hant' ? 'zh' : lang) as EventBannerLocale;
}

/**
 * 언어별 텍스트에서 현재 언어 값을 고른다. 없으면 en, 그다음 아무 값으로 폴백.
 * 어드민에서 일부 언어만 입력해도 페이지가 비지 않게 한다.
 */
export function pickLocalizedText(
  value: unknown,
  lang: Locale,
): string {
  if (!value || typeof value !== 'object') return '';
  const map = value as Record<string, string>;
  return map[toDbLocale(lang)] || map.en || Object.values(map).find(Boolean) || '';
}
