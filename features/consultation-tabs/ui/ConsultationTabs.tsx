'use client';

import { useState, useEffect } from 'react';
import { cn } from 'shared/lib/utils';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { type Locale } from 'shared/config';
import { ConsultationChatList } from './ConsultationChatList';
import { ConsultationAppointmentList } from './ConsultationAppointmentList';

interface ConsultationTabsProps {
  lang: Locale;
  dict: {
    chat: string;
    appointment: string;
    loading: string;
    error: string;
    retry: string;
    empty: {
      chat: {
        title: string;
        description: string;
      };
      appointment: {
        title: string;
        description: string;
      };
    };
  };
}

export function ConsultationTabs({ lang, dict }: ConsultationTabsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: dict.chat },
    { id: 1, label: dict.appointment },
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
          {/* 상담채팅 탭 */}
          <CarouselItem className='min-h-[60vh] basis-full pl-0'>
            <div className='p-4'>
              <ConsultationChatList
                lang={lang}
                dict={{
                  loading: dict.loading,
                  error: dict.error,
                  retry: dict.retry,
                  empty: dict.empty.chat,
                }}
              />
            </div>
          </CarouselItem>

          {/* 예약신청 탭 */}
          <CarouselItem className='min-h-[60vh] basis-full pl-0'>
            <div className='p-4'>
              <ConsultationAppointmentList
                lang={lang}
                dict={{
                  loading: dict.loading,
                  error: dict.error,
                  retry: dict.retry,
                  empty: dict.empty.appointment,
                }}
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
