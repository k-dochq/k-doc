'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalDetailIntroductionTab } from './HospitalDetailIntroductionTab';
import { HospitalDetailProceduresTab } from './HospitalDetailProceduresTab';
import { HospitalDetailTabsHeader } from './HospitalDetailTabsHeader';
import { type Hospital } from 'entities/hospital/api/entities/types';

interface HospitalDetailTabsProps {
  hospital: Hospital;
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailTabs({ hospital, hospitalId, lang, dict }: HospitalDetailTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: dict.hospitalDetailTabs.introduction },
    { id: 1, label: dict.hospitalDetailTabs.procedures },
  ];

  // 탭 클릭 핸들러
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className='w-full border-t border-white/60'>
      {/* 탭 헤더 */}
      <HospitalDetailTabsHeader tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />

      {/* 탭 컨텐츠 */}
      <div className='relative'>
        {/* 병원소개 탭 */}
        <div
          className={`px-5 py-6 transition-opacity duration-300 ${
            activeTab === 0 ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
          }`}
        >
          <HospitalDetailIntroductionTab
            hospital={hospital}
            hospitalId={hospitalId}
            lang={lang}
            dict={dict}
          />
        </div>

        {/* 시술상세 탭 */}
        <div
          className={`px-5 pt-6 transition-opacity duration-300 ${
            activeTab === 1 ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
          }`}
        >
          <HospitalDetailProceduresTab
            hospital={hospital}
            hospitalId={hospitalId}
            lang={lang}
            dict={dict}
          />
        </div>
      </div>
    </div>
  );
}
