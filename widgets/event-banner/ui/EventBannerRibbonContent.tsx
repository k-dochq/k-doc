'use client';

import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { EventBannerRibbonItem } from './EventBannerRibbonItem';
import { EventBannerRibbonPagination } from './EventBannerRibbonPagination';
import { type EventBannerWithImage } from '../model/types';

export interface EventBannerRibbonContentProps {
  banners: EventBannerWithImage[];
  currentLocale: 'ko' | 'en' | 'th';
  className?: string;
}

export function EventBannerRibbonContent({
  banners,
  currentLocale,
  className = '',
}: EventBannerRibbonContentProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = banners.length;

  useEffect(() => {
    if (!api) return;

    const updatePage = () => {
      const slideIndex = api.selectedScrollSnap();
      const page = slideIndex % totalPages;
      setCurrentPage(page);
    };

    updatePage();
    api.on('select', updatePage);

    return () => {
      api.off('select', updatePage);
    };
  }, [api, totalPages]);

  // 자동재생 기능
  useEffect(() => {
    if (!api || banners.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        // loop가 true이면 처음으로 돌아감
        api.scrollTo(0);
      }
    }, 2000); // 2초 간격

    return () => clearInterval(interval);
  }, [api, banners.length]);

  return (
    <div className={`relative w-full ${className}`}>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: 'start',
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-0'>
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className='basis-full pl-0'>
              <EventBannerRibbonItem
                id={banner.id}
                title={banner.title}
                linkUrl={banner.linkUrl}
                imageUrl={banner.currentImage.imageUrl}
                alt={banner.currentImage.alt}
                currentLocale={currentLocale}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {totalPages > 1 && (
        <EventBannerRibbonPagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
