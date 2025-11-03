'use client';

import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 2,
    align: 'start',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(banners.length / 2);

  useEffect(() => {
    if (!emblaApi) return;

    setCurrentPage(Math.floor(emblaApi.selectedScrollSnap() / 2));

    emblaApi.on('select', () => {
      setCurrentPage(Math.floor(emblaApi.selectedScrollSnap() / 2));
    });
  }, [emblaApi]);

  // Auto play 기능
  useEffect(() => {
    if (!emblaApi || banners.length <= 2) {
      return;
    }

    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 2500); // 2.5초 간격

    return () => clearInterval(interval);
  }, [emblaApi, banners.length]);

  return (
    <div className={`w-full ${className}`}>
      <div className='relative overflow-hidden rounded-xl'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex gap-[11px]'>
            {banners.map((banner) => (
              <div key={banner.id} className='min-w-0 flex-[0_0_calc(50%-5.5px)]'>
                <EventBannerItem
                  id={banner.id}
                  title={banner.title}
                  linkUrl={banner.linkUrl}
                  imageUrl={banner.currentImage.imageUrl}
                  alt={banner.currentImage.alt}
                  currentLocale={currentLocale}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <EventBannerPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
