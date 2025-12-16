'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalDetailTabsHeaderV2 } from 'widgets/hospital-detail-tabs/ui/HospitalDetailTabsHeaderV2';

interface ConsultationContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationContentV2({ lang, dict }: ConsultationContentV2Props) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: dict.consultation?.chat || '상담채팅' },
    { id: 1, label: dict.consultation?.appointment || '예약신청' },
  ];

  // 탭 클릭 핸들러
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className='w-full'>
      {/* 탭 헤더 */}
      <HospitalDetailTabsHeaderV2 tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />

      {/* 탭 컨텐츠 */}
      <div className=''>
        {/* 상담채팅 탭 */}
        {activeTab === 0 && <div>{/* ConsultationChatTab placeholder */}</div>}

        {/* 예약신청 탭 */}
        {activeTab === 1 && <div>{/* ConsultationAppointmentTab placeholder */}</div>}
      </div>
    </div>
  );
}
