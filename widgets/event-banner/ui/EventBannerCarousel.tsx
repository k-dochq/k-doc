'use client';

import { useState, useEffect } from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { LocaleLink } from 'shared/ui/locale-link';
import { useActiveBanners } from 'entities/event-banner/api/queries/get-active-banners';
import { EventBannerSkeleton } from './EventBannerSkeleton';
import { type EventBannerCarouselProps } from '../model/types';

export function EventBannerCarousel({ currentLocale, className = '' }: EventBannerCarouselProps) {
  const { data: banners, isLoading, error } = useActiveBanners();

  // 로딩 중이면 스켈레톤 표시
  if (isLoading) {
    return (
      <div className='mt-8 px-5'>
        <EventBannerSkeleton />
      </div>
    );
  }

  // 에러 또는 데이터 없으면 null 반환
  if (error || !banners || banners.length === 0) {
    return null;
  }

  // 현재 locale에 맞는 이미지가 있는 배너만 필터링
  const validBanners = banners
    .map((banner) => {
      const image = banner.EventBannerImage.find((img) => img.locale === currentLocale);
      return image ? { ...banner, currentImage: image } : null;
    })
    .filter((banner): banner is NonNullable<typeof banner> => banner !== null);

  if (validBanners.length === 0) {
    return null;
  }

  return (
    <div className='mt-8 px-5'>
      <EventBannerContent
        banners={validBanners}
        currentLocale={currentLocale}
        className={className}
      />
    </div>
  );
}

interface EventBannerContentProps {
  banners: Array<{
    id: string;
    title: any;
    linkUrl: string;
    currentImage: {
      imageUrl: string;
      alt: string | null;
      locale: string;
    };
  }>;
  currentLocale: string;
  className?: string;
}

function EventBannerContent({ banners, currentLocale, className = '' }: EventBannerContentProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    setCurrentSlide(emblaApi.selectedScrollSnap());

    emblaApi.on('select', () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  // Auto play 기능
  useEffect(() => {
    if (!emblaApi || banners.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000); // 5초 간격

    return () => clearInterval(interval);
  }, [emblaApi, banners.length]);

  return (
    <div className={`w-full ${className}`}>
      <div className='relative overflow-hidden rounded-xl'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex'>
            {banners.map((banner) => (
              <div key={banner.id} className='min-w-0 flex-[0_0_100%]'>
                <LocaleLink href={banner.linkUrl} className='block'>
                  <div className='relative aspect-[335/140] w-full'>
                    <img
                      src={banner.currentImage.imageUrl}
                      alt={
                        banner.currentImage.alt ||
                        (banner.title as any)?.[currentLocale] ||
                        'Event Banner'
                      }
                      className='h-full w-full object-cover'
                    />
                  </div>
                </LocaleLink>
              </div>
            ))}
          </div>
        </div>

        {/* 페이징 인디케이터 */}
        <div className='absolute right-3 bottom-3'>
          <div className='flex items-center justify-center gap-0.5 rounded-full bg-black/60 px-2 py-1 text-[10px] leading-[12px]'>
            <span className='shrink-0 text-white'>{currentSlide + 1}</span>
            <span className='shrink-0 text-neutral-300'>/</span>
            <span className='shrink-0 text-neutral-300'>{banners.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
