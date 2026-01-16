import { type EventBanner, type EventBannerImage, type EventBannerLocale } from '@prisma/client';
import { type Prisma } from '@prisma/client';
import { type Locale } from 'shared/config';

export interface EventBannerWithImages extends EventBanner {
  EventBannerImage: EventBannerImage[];
}

export interface EventBannerCarouselProps {
  currentLocale: Locale;
  className?: string;
}

// 다국어 제목 타입 (EventBanner title 필드용)
// Locale을 키로 사용하는 다국어 텍스트 타입
export type MultilingualTitle = Partial<Record<Locale, string>>;

// Prisma JsonValue를 MultilingualTitle로 변환하는 타입 가드
export function isMultilingualTitle(value: Prisma.JsonValue): value is MultilingualTitle {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const obj = value as Record<string, unknown>;
  // 최소한 ko, en, th, hi 중 하나는 있어야 함
  return (
    typeof obj.ko === 'string' ||
    typeof obj.en === 'string' ||
    typeof obj.th === 'string' ||
    typeof obj.hi === 'string'
  );
}

// MultilingualTitle에서 특정 locale의 텍스트를 안전하게 추출
export function getLocalizedTitle(title: Prisma.JsonValue, locale: Locale): string {
  if (isMultilingualTitle(title)) {
    // Locale을 키로 사용하여 텍스트 추출
    const text = title[locale];
    if (typeof text === 'string') {
      return text;
    }
    // Fallback: ko > en > th > zh-Hant > ja > hi 순서로 시도
    return title.ko || title.en || title.th || title['zh-Hant'] || title.ja || title.hi || '';
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
