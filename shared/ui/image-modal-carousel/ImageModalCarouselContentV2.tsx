'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { type ImageModalItem } from './types';

interface ImageModalCarouselContentV2Props {
  images: ImageModalItem[];
  initialIndex: number;
  onIndexChange: (index: number) => void;
  onSelectIndex?: (index: number) => void;
}

export function ImageModalCarouselContentV2({
  images,
  initialIndex,
  onIndexChange,
  onSelectIndex,
}: ImageModalCarouselContentV2Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (!api) return;

    const selected = api.selectedScrollSnap();
    setCurrentIndex(selected);
    onIndexChange(selected);

    api.on('select', () => {
      const next = api.selectedScrollSnap();
      setCurrentIndex(next);
      onIndexChange(next);
    });
  }, [api, onIndexChange]);

  useEffect(() => {
    if (api) {
      api.scrollTo(initialIndex);
    }
  }, [api, initialIndex]);

  // 전체 레이아웃: 헤더(외부), 메인 이미지, 썸네일이 한 화면에 보이도록 조정
  return (
    <div className='flex h-full flex-col'>
      {/* 메인 이미지 영역: 썸네일 영역(54px) + 여백(2) + 헤더 높이 여유를 고려해 높이 확보 */}
      <div className='flex min-h-[calc(100dvh-12rem-var(--safe-area-inset-top)-var(--safe-area-inset-bottom))] flex-1 items-center justify-center px-0'>
        <Carousel setApi={setApi} className='h-full w-full'>
          <CarouselContent className='h-full'>
            {images.map((imageItem) => (
              <CarouselItem key={imageItem.id} className='h-full'>
                <div className='relative flex h-full min-h-[calc(100dvh-12rem-var(--safe-area-inset-top)-var(--safe-area-inset-bottom))] w-full items-center justify-center'>
                  <Image
                    src={imageItem.imageUrl}
                    alt={imageItem.alt || 'Image'}
                    fill
                    className='max-h-[calc(100dvh-12rem-var(--safe-area-inset-top)-var(--safe-area-inset-bottom))] object-contain'
                    sizes='100vw'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 썸네일 트랙: 항상 화면에 표시, 하단 여백 8px */}
      {images.length > 0 && (
        <div className='w-full overflow-x-auto pb-2'>
          <div className='flex w-max gap-2 px-5'>
            {images.map((imageItem, index) => {
              const isActive = currentIndex === index;
              return (
                <button
                  key={imageItem.id}
                  onClick={() => {
                    if (api) {
                      api.scrollTo(index);
                    }
                    setCurrentIndex(index);
                    onIndexChange(index);
                    onSelectIndex?.(index);
                  }}
                  className={`relative h-[54px] w-[54px] overflow-hidden rounded-lg ${
                    isActive ? 'ring-primary-900 ring-[1.5px] ring-offset-0' : ''
                  }`}
                  aria-label={`thumbnail-${index + 1}`}
                >
                  <img
                    src={imageItem.imageUrl}
                    alt={imageItem.alt || `thumb-${index + 1}`}
                    className='h-full w-full object-cover'
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
