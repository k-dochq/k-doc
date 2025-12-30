'use client';

import { useAllBanners } from 'entities/event-banner/api/queries/get-active-banners';
import { EventBannerMainContentV2 } from './EventBannerMainContentV2';
import { type EventBannerCarouselProps, type EventBannerWithImage } from '../model/types';

// 로딩용 static 배너 이미지
const LOADING_BANNERS: EventBannerWithImage[] = [
  {
    id: 'loading-1',
    title: {},
    linkUrl: '/hospital/c9556a91-9a3d-4cc3-8bd0-9cd763b72a33',
    currentImage: {
      imageUrl: '/images/banner_1.png',
      alt: 'Loading banner 1',
      locale: 'ko',
    },
  },
  {
    id: 'loading-2',
    title: {},
    linkUrl: '/event/package',
    currentImage: {
      imageUrl: '/images/banner_main_2.png',
      alt: 'Loading banner 2',
      locale: 'ko',
    },
  },
  {
    id: 'loading-3',
    title: {},
    linkUrl: '/hospital/5fcc9f87-40db-49f0-9d91-2d83689d0c5c',
    currentImage: {
      imageUrl: '/images/banner_main_3.png',
      alt: 'Loading banner 3',
      locale: 'ko',
    },
  },
  {
    id: 'loading-4',
    title: {},
    linkUrl: '/hospital/ffda0620-c254-44db-8b13-ef4ef5d368e5',
    currentImage: {
      imageUrl: '/images/banner_main_4.png',
      alt: 'Loading banner 4',
      locale: 'ko',
    },
  },
];

export function EventBannerMainCarouselV2({
  currentLocale,
  className = '',
}: EventBannerCarouselProps) {
  const { data: banners, isLoading, error } = useAllBanners({ type: 'MAIN' });

  // 로딩 중이면 blur 처리된 static 이미지로 EventBannerMainContentV2 표시
  if (isLoading) {
    return (
      <div className='relative z-10'>
        <EventBannerMainContentV2
          banners={LOADING_BANNERS}
          currentLocale={currentLocale}
          className={className}
          isBlur={true}
        />
      </div>
    );
  }

  // 에러 또는 데이터 없으면 null 반환
  if (error) {
    return null;
  }

  const validBanners: EventBannerWithImage[] =
    banners
      ?.map((banner) => {
        // zh-Hant를 zh로 매핑 (데이터베이스는 zh를 사용)
        const dbLocale = currentLocale === 'zh-Hant' ? 'zh' : currentLocale;

        // 먼저 currentLocale에 해당하는 이미지 찾기
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
      .filter((banner): banner is EventBannerWithImage => banner !== null) ?? [];

  // 데이터가 없으면 LOADING_BANNERS fallback
  const bannersToRender = validBanners.length > 0 ? validBanners : LOADING_BANNERS;

  // 임시로 하드코딩된 이미지 사용
  return (
    <div className='relative z-10'>
      <EventBannerMainContentV2
        banners={bannersToRender}
        currentLocale={currentLocale}
        className={className}
        isBlur={validBanners.length === 0}
      />
    </div>
  );
}
