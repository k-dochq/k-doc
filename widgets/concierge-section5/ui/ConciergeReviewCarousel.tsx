'use client';

import { useEffect, useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useCarouselAutoplay } from 'shared/model/hooks';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { ConciergeReviewCard } from './ConciergeReviewCard';

interface ConciergeReviewCarouselProps {
  dict: Dictionary;
  lang: Locale;
}

const REVIEWS = [
  { titleKey: 'review1Title', bodyKey: 'review1Body', authorKey: 'review1Author' },
  { titleKey: 'review2Title', bodyKey: 'review2Body', authorKey: 'review2Author' },
  { titleKey: 'review3Title', bodyKey: 'review3Body', authorKey: 'review3Author' },
  { titleKey: 'review4Title', bodyKey: 'review4Body', authorKey: 'review4Author' },
  { titleKey: 'review5Title', bodyKey: 'review5Body', authorKey: 'review5Author' },
] as const;

export function ConciergeReviewCarousel({ dict, lang }: ConciergeReviewCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = dict.concierge?.reviews;
  const c = dict.concierge;

  useCarouselAutoplay({ api, itemCount: REVIEWS.length, interval: 2500, enabled: true });

  useEffect(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
    api.on('select', () => setCurrentIndex(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className='mt-8'>
      {/* Title */}
      <p className='concierge-title text-center text-[32px] leading-[1.1] text-white'>{t?.sectionTitle}</p>

      {/* Carousel — full screen width by breaking out of section px-5 */}
      <div className='mx-[-20px] mt-6'>
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: 'center', direction: lang === 'ar' ? 'rtl' : 'ltr' }}
          className='w-full'
        >
          <CarouselContent className='items-stretch' dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {REVIEWS.map(({ titleKey, bodyKey, authorKey }) => (
              <CarouselItem key={authorKey} className='basis-[69.33%]'>
                <div className='h-full px-[6px]'>
                  <ConciergeReviewCard
                    title={t?.[titleKey] ?? ''}
                    body={t?.[bodyKey] ?? ''}
                    author={c?.[authorKey] ?? ''}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Dots indicator */}
      <div className='mt-6 flex justify-center gap-2'>
        {REVIEWS.map((_, index) => (
          <button
            key={index}
            type='button'
            onClick={() => api?.scrollTo(index)}
            className='transition-all duration-300'
            style={{
              height: '8px',
              width: index === currentIndex ? '24px' : '8px',
              borderRadius: index === currentIndex ? '999px' : '4px',
              backgroundColor: index === currentIndex ? '#5c3de7' : '#b1a1fb',
            }}
            aria-label={`Review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
