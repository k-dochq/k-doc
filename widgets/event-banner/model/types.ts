import { type EventBanner, type EventBannerImage } from '@prisma/client';

export interface EventBannerWithImages extends EventBanner {
  EventBannerImage: EventBannerImage[];
}

export interface EventBannerCarouselProps {
  currentLocale: 'ko' | 'en' | 'th';
  className?: string;
}
