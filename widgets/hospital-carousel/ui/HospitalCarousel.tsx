'use client';

import { useState, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital';
import { HospitalListCard } from 'entities/hospital/ui';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
  type CarouselApi,
} from 'shared/ui/carousel';

interface HospitalCarouselProps {
  hospitals: Hospital[];
  lang: Locale;
  dict: Dictionary;
}

export function HospitalCarousel({ hospitals, lang, dict }: HospitalCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // 자동 재생 기능 (infinite loop)
  useEffect(() => {
    if (!api || hospitals.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext(); // loop: true로 인해 자동으로 처음으로 돌아감
    }, 4000); // 4초마다 자동 재생

    return () => clearInterval(interval);
  }, [api, hospitals.length]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  // 빈 데이터 상태 처리
  if (hospitals.length === 0) {
    return (
      <div className='w-full'>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold text-gray-900'>{dict.hospitalCarousel.title}</h2>
        </div>
        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <div className='mb-4'>
            <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100'>
              <svg
                className='h-6 w-6 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                />
              </svg>
            </div>
          </div>
          <h3 className='mb-2 text-sm font-medium text-gray-900'>
            {dict.hospitalCarousel.empty.message}
          </h3>
          <p className='max-w-sm text-xs text-gray-500'>
            {dict.hospitalCarousel.empty.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='mb-4'>
        <h2 className='text-lg font-semibold text-gray-900'>{dict.hospitalCarousel.title}</h2>
      </div>

      <div className='mx-auto w-full'>
        <Carousel
          setApi={setApi}
          className='w-full'
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className='-ml-2 min-h-[200px] md:-ml-4'>
            {hospitals.map((hospital) => (
              <CarouselItem
                key={hospital.id}
                className='h-full basis-1/2 pl-2 md:basis-1/3 md:pl-4'
              >
                <HospitalListCard hospital={hospital} lang={lang} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* 네비게이션 버튼 */}
          <CarouselPrevious className='left-2' />
          <CarouselNext className='right-2' />
        </Carousel>
      </div>
    </div>
  );
}
