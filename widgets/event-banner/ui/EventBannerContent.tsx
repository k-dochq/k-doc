'use client';

import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { EventBannerItem } from './EventBannerItem';
import { EventBannerPagination } from './EventBannerPagination';
import { type EventBannerWithImage } from '../model/types';

export interface EventBannerContentProps {
  banners: EventBannerWithImage[];
  currentLocale: 'ko' | 'en' | 'th';
  className?: string;
}

export function EventBannerContent({
  banners,
  currentLocale,
  className = '',
}: EventBannerContentProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = banners.length;

  useEffect(() => {
    if (!api) return;

    const updatePage = () => {
      const slideIndex = api.selectedScrollSnap();
      // 각 슬라이드가 하나의 페이지
      // 슬라이드 0 → 페이지 0
      // 슬라이드 1 → 페이지 1
      // 슬라이드 2 → 페이지 2
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
    }, 2500); // 2.5초 간격

    return () => clearInterval(interval);
  }, [api, banners.length]);

  // 페이지 클릭 핸들러
  const handlePageClick = (page: number) => {
    if (!api) return;
    // 페이지 번호가 곧 슬라이드 인덱스
    api.scrollTo(page);
  };

  return (
    <div className={`w-full ${className}`}>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: 'start',
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-[11px]'>
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className='basis-1/2 pl-[11px]'>
              <EventBannerItem
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

      <EventBannerPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={handlePageClick}
      />
    </div>
  );
}
