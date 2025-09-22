'use client';

import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalDetailIntroductionTab } from './HospitalDetailIntroductionTab';
import { HospitalDetailProceduresTab } from './HospitalDetailProceduresTab';
import { HospitalDetailTabsHeader } from './HospitalDetailTabsHeader';

interface HospitalDetailTabsProps {
  hospital: any; // TODO: 정확한 타입 정의 필요
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailTabs({ hospital, hospitalId, lang, dict }: HospitalDetailTabsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: dict.hospitalDetailTabs.introduction },
    { id: 1, label: dict.hospitalDetailTabs.procedures },
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
      <HospitalDetailTabsHeader tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />

      {/* Carousel 기반 컨텐츠 */}
      <Carousel
        setApi={setApi}
        className='w-full'
        opts={{
          loop: false, // 탭은 무한 루프 비활성화
          align: 'start',
          skipSnaps: false,
          dragFree: false,
          // 드래그와 스와이핑 완전 비활성화
          watchDrag: false,
          watchResize: false,
          watchSlides: false,
        }}
      >
        <CarouselContent
          className='ml-0'
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
          onTouchEnd={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          {/* 병원소개 탭 */}
          <CarouselItem className='basis-full pl-0'>
            <div className='px-5 py-4'>
              <HospitalDetailIntroductionTab
                hospital={hospital}
                hospitalId={hospitalId}
                lang={lang}
                dict={dict}
              />
            </div>
          </CarouselItem>

          {/* 시술상세 탭 */}
          <CarouselItem className='basis-full pl-0'>
            <div className='px-5 py-4'>
              <HospitalDetailProceduresTab
                hospital={hospital}
                hospitalId={hospitalId}
                lang={lang}
                dict={dict}
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
