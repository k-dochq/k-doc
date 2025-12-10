'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from 'shared/ui/carousel';
import { type DoctorCareerImage } from '../model/types';
import { type Locale } from 'shared/config';

interface DoctorCareerImagesCarouselV2Props {
  images: DoctorCareerImage[];
  lang: Locale;
}

export function DoctorCareerImagesCarouselV2({ images, lang }: DoctorCareerImagesCarouselV2Props) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      // 캐러셀 상태 업데이트 (필요시)
    });
  }, [api]);

  // 빈 데이터 상태 처리
  if (images.length === 0) {
    return null;
  }

  return (
    <div className='w-full'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-2'>
          {images.map((image) => (
            <CarouselItem key={image.id} className='basis-auto pl-2'>
              <div className='relative h-[90px] w-[90px] overflow-hidden rounded-lg'>
                <Image
                  src={image.imageUrl}
                  alt={image.alt || '의사 경력 이미지'}
                  fill
                  className='object-cover'
                  sizes='90px'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 네비게이션 버튼 (이미지가 4개 이상일 때만 표시) */}
        {images.length > 4 && (
          <>
            <CarouselPrevious className='left-0' />
            <CarouselNext className='right-0' />
          </>
        )}
      </Carousel>
    </div>
  );
}
