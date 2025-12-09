'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalDetailIntroductionV2 } from 'widgets/hospital-detail-introduction/ui/HospitalDetailIntroductionV2';
import { HospitalDetailOperatingHoursV2 } from 'widgets/hospital-detail-info-section/ui/HospitalDetailOperatingHoursV2';
import { HospitalDetailLocationV2 } from 'widgets/hospital-detail-info-section/ui/HospitalDetailLocationV2';
import { HospitalDetailDoctorsV2 } from 'widgets/hospital-detail-doctors/ui/HospitalDetailDoctorsV2';
import { HospitalDetailTabsHeaderV2 } from './HospitalDetailTabsHeaderV2';
import { type GetHospitalDetailResponse } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { HospitalDetailProceduresVideoSection } from './HospitalDetailProceduresVideoSection';

interface HospitalDetailTabsV2Props {
  hospital: GetHospitalDetailResponse['hospital'];
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailTabsV2({
  hospital,
  hospitalId,
  lang,
  dict,
}: HospitalDetailTabsV2Props) {
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
    <div className='w-full'>
      {/* 탭 헤더 */}
      <HospitalDetailTabsHeaderV2 tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />

      {/* 탭 컨텐츠 */}
      <div className=''>
        {/* 병원소개 탭 */}
        {activeTab === 0 && (
          <div className='space-y-8 p-5'>
            <HospitalDetailIntroductionV2 hospital={hospital} lang={lang} dict={dict} />
            <HospitalDetailOperatingHoursV2
              openingHours={hospital.openingHours}
              lang={lang}
              dict={dict}
            />
            <HospitalDetailLocationV2 hospital={hospital} lang={lang} dict={dict} />
            {hospital.doctors && hospital.doctors.length > 0 && (
              <HospitalDetailDoctorsV2 doctors={hospital.doctors} lang={lang} dict={dict} />
            )}
          </div>
        )}

        {/* 시술상세 탭 */}
        {activeTab === 1 && (
          <div className='p-5'>
            <HospitalDetailProceduresVideoSection hospitalId={hospitalId} lang={lang} dict={dict} />
          </div>
        )}
      </div>
    </div>
  );
}
