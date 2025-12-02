'use client';

import { useActiveBanners } from 'entities/event-banner/api/queries/get-active-banners';
import { EventBannerMainContentV2 } from './EventBannerMainContentV2';
import { type EventBannerCarouselProps, type EventBannerWithImage } from '../model/types';

// 로딩용 static 배너 이미지
const LOADING_BANNERS: EventBannerWithImage[] = [
  {
    id: 'loading-1',
    title: {},
    linkUrl: null,
    currentImage: {
      imageUrl: '/images/banner_1.png',
      alt: 'Loading banner 1',
      locale: 'ko',
    },
  },
  {
    id: 'loading-2',
    title: {},
    linkUrl: null,
    currentImage: {
      imageUrl: '/images/banner_main_2.png',
      alt: 'Loading banner 2',
      locale: 'ko',
    },
  },
  {
    id: 'loading-3',
    title: {},
    linkUrl: null,
    currentImage: {
      imageUrl: '/images/banner_main_3.png',
      alt: 'Loading banner 3',
      locale: 'ko',
    },
  },
  {
    id: 'loading-4',
    title: {},
    linkUrl: null,
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
  const { data: banners, isLoading, error } = useActiveBanners({ type: 'MAIN' });

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
  if (error || !banners || banners.length === 0) {
    return null;
  }

  // 임시로 하드코딩된 이미지 사용
  return (
    <div className='relative z-10'>
      <EventBannerMainContentV2
        banners={LOADING_BANNERS}
        currentLocale={currentLocale}
        className={className}
        isBlur={false}
      />
    </div>
  );
}
