'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks';
import { HospitalDetailIntroductionV2 } from 'widgets/hospital-detail-introduction/ui/HospitalDetailIntroductionV2';
import { HospitalDetailOperatingHoursV2 } from 'widgets/hospital-detail-info-section/ui/HospitalDetailOperatingHoursV2';
import { HospitalDetailLocationV2 } from 'widgets/hospital-detail-info-section/ui/HospitalDetailLocationV2';
import { HospitalDetailDoctorsV2 } from 'widgets/hospital-detail-doctors/ui/HospitalDetailDoctorsV2';
import { HospitalDetailTabsHeaderV2 } from './HospitalDetailTabsHeaderV2';
import { type GetHospitalDetailResponse } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { HospitalDetailProceduresVideoSection } from './HospitalDetailProceduresVideoSection';
import { HospitalDetailProceduresImagesSection } from './HospitalDetailProceduresImagesSection';

export type HospitalDetailTab = 'introduction' | 'procedures';

const TAB_ORDER: HospitalDetailTab[] = ['introduction', 'procedures'];

function parseTab(value: string | null): HospitalDetailTab {
  return value === 'procedures' ? 'procedures' : 'introduction';
}

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
  const router = useLocalizedRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeTab = parseTab(searchParams?.get('tab') ?? null);
  const activeTabIndex = TAB_ORDER.indexOf(activeTab);

  const tabs = [
    { id: 0, label: dict.hospitalDetailTabs.introduction },
    { id: 1, label: dict.hospitalDetailTabs.procedures },
  ];

  // 탭 클릭 시 URL 쿼리 파라미터(tab)를 갱신하여, 새로고침해도 선택된 탭이 유지되도록 한다.
  const handleTabClick = (index: number) => {
    const nextTab = TAB_ORDER[index];
    if (!nextTab) return;
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('tab', nextTab);
    const basePath = pathname?.replace(/^\/[^/]+/, '') || `/hospital/${hospitalId}`;
    router.replace(`${basePath}?${params.toString()}`);
  };

  return (
    <div className='w-full'>
      {/* 탭 헤더 */}
      <HospitalDetailTabsHeaderV2
        tabs={tabs}
        activeTab={activeTabIndex}
        onTabClick={handleTabClick}
      />

      {/* 탭 컨텐츠 */}
      <div className=''>
        {/* 병원소개 탭 */}
        {activeTab === 'introduction' && (
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
        {activeTab === 'procedures' && (
          <div className='p-5'>
            <HospitalDetailProceduresVideoSection hospitalId={hospitalId} lang={lang} dict={dict} />
            <div className='h-8' />
            <HospitalDetailProceduresImagesSection
              hospitalId={hospitalId}
              lang={lang}
              dict={dict}
            />
          </div>
        )}
      </div>
    </div>
  );
}
