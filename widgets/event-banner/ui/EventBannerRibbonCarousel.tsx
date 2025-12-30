'use client';

import { useActiveBanners } from 'entities/event-banner/api/queries/get-active-banners';
import { EventBannerRibbonContent } from './EventBannerRibbonContent';
import { EventBannerRibbonSkeleton } from './EventBannerRibbonSkeleton';
import { type EventBannerCarouselProps, type EventBannerWithImage } from '../model/types';

export function EventBannerRibbonCarousel({
  currentLocale,
  className = '',
}: EventBannerCarouselProps) {
  const { data: banners, isLoading, error } = useActiveBanners({ type: 'RIBBON' });

  // 로딩 중이면 스켈레톤 표시
  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <EventBannerRibbonSkeleton />
      </div>
    );
  }

  // 에러 또는 데이터 없으면 null 반환
  if (error || !banners || banners.length === 0) {
    return null;
  }

  // 현재 locale에 맞는 이미지가 있는 배너만 필터링
  // zh-Hant를 zh로 매핑 (데이터베이스는 zh를 사용)
  const dbLocale = currentLocale === 'zh-Hant' ? 'zh' : currentLocale;

  const validBanners: EventBannerWithImage[] = banners
    .map((banner) => {
      // 먼저 dbLocale에 해당하는 이미지 찾기
      let image = banner.EventBannerImage.find((img) => img.locale === dbLocale);

      // 없으면 en 이미지를 fallback으로 사용
      if (!image) {
        image = banner.EventBannerImage.find((img) => img.locale === 'en');
      }

      return image
        ? {
            id: banner.id,
            title: banner.title,
            linkUrl: banner.linkUrl,
            currentImage: {
              imageUrl: image.imageUrl,
              alt: image.alt,
              locale: image.locale,
            },
          }
        : null;
    })
    .filter((banner): banner is EventBannerWithImage => banner !== null);

  if (validBanners.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      <EventBannerRibbonContent banners={validBanners} currentLocale={currentLocale} />
    </div>
  );
}
