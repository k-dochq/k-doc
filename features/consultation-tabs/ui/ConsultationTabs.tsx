'use client';

import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ConsultationTabHeader } from './ConsultationTabHeader';
import { ConsultationChatTab } from './ConsultationChatTab';
import { ConsultationAppointmentTab } from './ConsultationAppointmentTab';

interface ConsultationTabsProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationTabs({ lang, dict }: ConsultationTabsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: dict.consultation?.chat || '상담채팅' },
    { id: 1, label: dict.consultation?.appointment || '예약신청' },
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
      <ConsultationTabHeader tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />

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
            <div className=''>
              <ConsultationChatTab lang={lang} dict={dict} />
            </div>
          </CarouselItem>

          {/* 예약신청 탭 */}
          <CarouselItem className='min-h-[60vh] basis-full pl-0'>
            <div className=''>
              <ConsultationAppointmentTab lang={lang} dict={dict} />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
