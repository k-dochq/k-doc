'use client';

import { useState, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from 'entities/review/model/types';
import { PopularReviewCard } from 'entities/review/ui/PopularReviewCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from 'shared/ui/carousel';

interface ReviewCarouselProps {
  items: ReviewCardData[];
  lang: Locale;
  dict: Dictionary;
  className?: string;
  itemClassName?: string;
  showNavigation?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number; // milliseconds
  align?: 'start' | 'center' | 'end';
  basis?: string; // Tailwind basis class (e.g., 'basis-[280px]')
  emptyMessage?: string;
  noBorder?: boolean;
  onSlideChange?: (currentSlide: number) => void;
}

export function ReviewCarousel({
  items,
  lang,
  dict,
  className = '',
  itemClassName = '',
  showNavigation = false,
  loop = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  align = 'start',
  basis = 'basis-[280px] md:basis-[320px]',
  emptyMessage = '표시할 후기가 없습니다.',
  noBorder = false,
  onSlideChange,
}: ReviewCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on('select', () => {
      const newSlide = api.selectedScrollSnap();
      setCurrentSlide(newSlide);
      onSlideChange?.(newSlide);
    });
  }, [api, onSlideChange]);

  // Auto play 기능
  useEffect(() => {
    if (!autoPlay || !api || items.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else if (loop) {
        // loop가 true이면 처음으로 돌아감
        api.scrollTo(0);
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [api, autoPlay, autoPlayInterval, loop, items.length]);

  if (items.length === 0) {
    return <div className={`py-8 text-center ${className}`}>{emptyMessage}</div>;
  }

  return (
    <div className={`w-full ${className}`}>
      <Carousel
        setApi={setApi}
        opts={{
          align,
          loop,
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-2 md:-ml-4'>
          {items.map((item) => (
            <CarouselItem key={item.id} className={`${basis} ${itemClassName}`}>
              <PopularReviewCard review={item} lang={lang} dict={dict} noBorder={noBorder} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {showNavigation && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
}
