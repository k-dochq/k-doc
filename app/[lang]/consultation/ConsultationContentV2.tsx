'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks';
import { HospitalDetailTabsHeaderV2 } from 'widgets/hospital-detail-tabs/ui/HospitalDetailTabsHeaderV2';
import { ConsultationChatTabV2 } from 'features/consultation-tabs/ui/ConsultationChatTabV2';
import { ConsultationAppointmentTabV2 } from 'features/consultation-tabs/ui/ConsultationAppointmentTabV2';

export type ConsultationTab = 'chat' | 'appointment';

const TAB_ORDER: ConsultationTab[] = ['chat', 'appointment'];

interface ConsultationContentV2Props {
  lang: Locale;
  dict: Dictionary;
  initialTab: ConsultationTab;
}

function parseTab(value: string | null): ConsultationTab {
  return value === 'appointment' ? 'appointment' : 'chat';
}

export function ConsultationContentV2({ lang, dict, initialTab }: ConsultationContentV2Props) {
  const router = useLocalizedRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeTab: ConsultationTab = parseTab(searchParams?.get('tab') ?? initialTab);
  const activeTabIndex = TAB_ORDER.indexOf(activeTab);

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

  const handleTabClick = (index: number) => {
    const nextTab = TAB_ORDER[index];
    if (!nextTab) return;
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('tab', nextTab);
    const basePath = pathname?.replace(/^\/[^/]+/, '') || '/consultation';
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
        {activeTab === 'chat' && <ConsultationChatTabV2 lang={lang} dict={dict} />}
        {activeTab === 'appointment' && <ConsultationAppointmentTabV2 lang={lang} dict={dict} />}
      </div>
    </div>
  );
}
