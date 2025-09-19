'use client';

import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FavoritesTabHeader } from './FavoritesTabHeader';
import { FavoritesHospitalsTab } from './FavoritesHospitalsTab';
import { FavoritesReviewsTab } from './FavoritesReviewsTab';

interface FavoritesTabsProps {
  lang: Locale;
  dict: Dictionary;
}

export function FavoritesTabs({ lang, dict }: FavoritesTabsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: dict.favorites?.hospitals || '병원' },
    { id: 1, label: dict.favorites?.reviews || '시술후기' },
  ];

  // Carousel API 연결
  useEffect(() => {
    if (!api) {
      return;
    }

    setActiveTab(api.selectedScrollSnap());

    api.on('select', () => {
      setActiveTab(api.selectedScrollSnap());
    });
  }, [api]);

  // 탭 클릭 핸들러
  const handleTabClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className='w-full'>
      {/* 탭 헤더 */}
      <FavoritesTabHeader tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />

      {/* Carousel 기반 컨텐츠 */}
      <Carousel
        setApi={setApi}
        className='w-full'
        opts={{
          loop: false, // 탭은 무한 루프 비활성화
          align: 'start',
          skipSnaps: false,
          dragFree: false,
        }}
      >
        <CarouselContent className='ml-0'>
          {/* 병원 탭 */}
          <CarouselItem className='min-h-[60vh] basis-full pl-0'>
            <FavoritesHospitalsTab lang={lang} dict={dict} />
          </CarouselItem>

          {/* 시술후기 탭 */}
          <CarouselItem className='min-h-[60vh] basis-full pl-0'>
            <div className=''>
              <FavoritesReviewsTab lang={lang} dict={dict} />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
