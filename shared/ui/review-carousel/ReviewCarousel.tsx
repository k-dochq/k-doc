'use client';

import { useState, useEffect } from 'react';
import { type Locale } from 'shared/config';
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
  className?: string;
  itemClassName?: string;
  showNavigation?: boolean;
  loop?: boolean;
  align?: 'start' | 'center' | 'end';
  basis?: string; // Tailwind basis class (e.g., 'basis-[280px]')
  emptyMessage?: string;
  noBorder?: boolean;
  onSlideChange?: (currentSlide: number) => void;
}

export function ReviewCarousel({
  items,
  lang,
  className = '',
  itemClassName = '',
  showNavigation = false,
  loop = true,
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
              <PopularReviewCard review={item} lang={lang} noBorder={noBorder} />
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
