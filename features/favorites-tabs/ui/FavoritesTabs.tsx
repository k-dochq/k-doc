'use client';

import { useState, useEffect } from 'react';
import { cn } from 'shared/lib/utils';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';

interface FavoritesTabsProps {
  dict: {
    hospitals: string;
    reviews: string;
  };
}

export function FavoritesTabs({ dict }: FavoritesTabsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: dict.hospitals },
    { id: 1, label: dict.reviews },
  ];

  // Carousel API 연결
  useEffect(() => {
    if (!api) {
      return;
    }

    setActiveTab(api.selectedScrollSnap());

    api.on('select', () => {
      setActiveTab(api.selectedScrollSnap());
    });
  }, [api]);

  // 탭 클릭 핸들러
  const handleTabClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className='w-full'>
      {/* 탭 헤더 */}
      <div className='flex border-b border-gray-200 bg-white'>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(index)}
            className={cn(
              'flex-1 px-4 py-3 text-center text-sm font-medium transition-colors',
              'border-b-2 border-transparent',
              activeTab === index
                ? 'border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Carousel 기반 컨텐츠 */}
      <Carousel
        setApi={setApi}
        className='w-full'
        opts={{
          loop: false, // 탭은 무한 루프 비활성화
          align: 'start',
          skipSnaps: false,
          dragFree: false,
        }}
      >
        <CarouselContent className='ml-0'>
          {/* 병원 탭 */}
          <CarouselItem className='min-h-[60vh] basis-full pl-0'>
            <div className='p-4'>
              <div className='py-8 text-center'>
                <h3 className='mb-2 text-lg font-medium text-gray-900'>즐겨찾기한 병원</h3>
                <p className='text-gray-500'>아직 즐겨찾기한 병원이 없습니다.</p>
              </div>
            </div>
          </CarouselItem>

          {/* 시술후기 탭 */}
          <CarouselItem className='min-h-[60vh] basis-full pl-0'>
            <div className='p-4'>
              <div className='py-8 text-center'>
                <h3 className='mb-2 text-lg font-medium text-gray-900'>즐겨찾기한 시술후기</h3>
                <p className='text-gray-500'>아직 즐겨찾기한 시술후기가 없습니다.</p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
