'use client';

import { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: dict.consultation?.chat || '상담채팅' },
    {
      id: 1,
      label:
        (typeof dict.consultation?.appointment === 'object'
          ? dict.consultation.appointment.title
          : dict.consultation?.appointment) || '예약신청',
    },
  ];

  // 탭 클릭 핸들러
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className='flex h-[calc(100vh-122px)] w-full flex-col overflow-hidden'>
      {/* 탭 헤더 - 고정 */}
      <div className='flex-shrink-0'>
        <ConsultationTabHeader tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
      </div>

      {/* 탭 컨텐츠 - 스크롤 가능 영역 */}
      <div className='relative flex-1 overflow-hidden'>
        {/* 상담채팅 탭 */}
        <div
          className={`h-full overflow-y-auto transition-opacity duration-300 ${
            activeTab === 0 ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
          }`}
        >
          <ConsultationChatTab lang={lang} dict={dict} />
        </div>

        {/* 예약신청 탭 */}
        <div
          className={`h-full overflow-y-auto transition-opacity duration-300 ${
            activeTab === 1 ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
          }`}
        >
          <ConsultationAppointmentTab lang={lang} dict={dict} />
        </div>
      </div>
    </div>
  );
}
