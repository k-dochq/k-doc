'use client';

import { useActiveBanners } from 'entities/event-banner/api/queries/get-active-banners';
import { EventBannerRibbonContent } from './EventBannerRibbonContent';
import { type EventBannerCarouselProps, type EventBannerWithImage } from '../model/types';
import { LOADING_RIBBON_BANNERS } from 'widgets/event-banner/model/loading-ribbon-banners';

function mapBannersToLocalizedImages({
  banners,
  currentLocale,
}: {
  banners: Array<{
    id: string;
    title: unknown;
    linkUrl: string | null;
    EventBannerImage: Array<{ locale: string; imageUrl: string; alt: string | null }>;
  }>;
  currentLocale: EventBannerCarouselProps['currentLocale'];
}): EventBannerWithImage[] {
  const dbLocale = currentLocale === 'zh-Hant' ? 'zh' : currentLocale;

  return (
    banners
      .map((banner) => {
        let image = banner.EventBannerImage.find((img) => img.locale === dbLocale);
        if (!image) {
          image = banner.EventBannerImage.find((img) => img.locale === 'en');
        }
        return image
          ? {
              id: banner.id,
              title: banner.title as EventBannerWithImage['title'],
              linkUrl: banner.linkUrl,
              currentImage: {
                imageUrl: image.imageUrl,
                alt: image.alt,
                locale: image.locale as EventBannerWithImage['currentImage']['locale'],
              },
            }
          : null;
      })
      .filter((banner): banner is EventBannerWithImage => banner !== null) ?? []
  );
}

export function EventBannerRibbonCarousel({
  currentLocale,
  className = '',
}: EventBannerCarouselProps) {
  const { data: banners, isLoading, error } = useActiveBanners({ type: 'RIBBON' });

  const validBanners = mapBannersToLocalizedImages({
    banners: banners ?? [],
    currentLocale,
  });

  const loadingBanners = mapBannersToLocalizedImages({
    banners: LOADING_RIBBON_BANNERS,
    currentLocale,
  });

  // 로딩 중: 하드코딩 로딩 배너 사용
  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <EventBannerRibbonContent banners={loadingBanners} currentLocale={currentLocale} />
      </div>
    );
  }

  // 에러이면 null
  if (error) {
    return null;
  }

  // 데이터가 없으면 로딩 배너 fallback
  const bannersToRender = validBanners.length > 0 ? validBanners : loadingBanners;

  if (bannersToRender.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      <EventBannerRibbonContent banners={bannersToRender} currentLocale={currentLocale} />
    </div>
  );
}
