import { type EventBanner, type EventBannerImage, type EventBannerLocale } from '@prisma/client';
import { type Prisma } from '@prisma/client';

export interface EventBannerWithImages extends EventBanner {
  EventBannerImage: EventBannerImage[];
}

export interface EventBannerCarouselProps {
  currentLocale: 'ko' | 'en' | 'th';
  className?: string;
}

// 다국어 제목 타입 (EventBanner title 필드용)
export type MultilingualTitle = {
  ko: string;
  en: string;
  th: string;
};

// Prisma JsonValue를 MultilingualTitle로 변환하는 타입 가드
export function isMultilingualTitle(value: Prisma.JsonValue): value is MultilingualTitle {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const obj = value as Record<string, unknown>;
  return typeof obj.ko === 'string' && typeof obj.en === 'string' && typeof obj.th === 'string';
}

// MultilingualTitle에서 특정 locale의 텍스트를 안전하게 추출
export function getLocalizedTitle(title: Prisma.JsonValue, locale: 'ko' | 'en' | 'th'): string {
  if (isMultilingualTitle(title)) {
    return title[locale] || '';
  }
  return '';
}

export interface EventBannerWithImage {
  id: string;
  title: Prisma.JsonValue;
  linkUrl: string | null;
  currentImage: {
    imageUrl: string;
    alt: string | null;
    locale: EventBannerLocale;
  };
}
