'use client';

import { useActiveBanners } from 'entities/event-banner/api/queries/get-active-banners';
import { EventBannerMainContentV2 } from './EventBannerMainContentV2';
import { type EventBannerCarouselProps, type EventBannerWithImage } from '../model/types';
import { LOADING_MAIN_BANNERS } from 'widgets/event-banner/model/loading-main-banners';

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
  // zh-Hant를 zh로 매핑 (데이터베이스는 zh를 사용)
  const dbLocale = currentLocale === 'zh-Hant' ? 'zh' : currentLocale;

  return (
    banners
      .map((banner) => {
        let image = banner.EventBannerImage.find((img) => img.locale === dbLocale);

        // 없으면 en 이미지를 fallback으로 사용
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

export function EventBannerMainCarouselV2({
  currentLocale,
  className = '',
}: EventBannerCarouselProps) {
  const { data: banners, isLoading, error } = useActiveBanners({ type: 'MAIN' });

  const validBanners = mapBannersToLocalizedImages({
    banners: banners ?? [],
    currentLocale,
  });

  const loadingBanners = mapBannersToLocalizedImages({
    banners: LOADING_MAIN_BANNERS,
    currentLocale,
  });

  // 로딩 중: 하드코딩 로딩 배너(별도 파일) 사용
  if (isLoading) {
    return (
      <div className='relative z-10'>
        <EventBannerMainContentV2
          banners={loadingBanners}
          currentLocale={currentLocale}
          className={className}
        />
      </div>
    );
  }

  // 에러이면 null
  if (error) {
    return null;
  }

  // 데이터가 없으면 로딩 배너 fallback
  const bannersToRender = validBanners.length > 0 ? validBanners : loadingBanners;

  return (
    <div className='relative z-10'>
      <EventBannerMainContentV2
        banners={bannersToRender}
        currentLocale={currentLocale}
        className={className}
      />
    </div>
  );
}
