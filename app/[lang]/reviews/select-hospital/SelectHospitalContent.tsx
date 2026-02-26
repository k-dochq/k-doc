'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useAuth } from 'shared/lib/auth/useAuth';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useEffect } from 'react';
import { openDrawer } from 'shared/lib/drawer';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';
import { HospitalDetailTabsHeaderV2 } from 'widgets/hospital-detail-tabs/ui/HospitalDetailTabsHeaderV2';
import { ReviewSelectTabContent } from './ReviewSelectTabContent';

interface SelectHospitalContentProps {
  lang: Locale;
  dict: Dictionary;
}

export function SelectHospitalContent({ lang, dict }: SelectHospitalContentProps) {
  const { user, isLoading } = useAuth();
  const router = useLocalizedRouter();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!isLoading && !user) {
      const showLoginDrawer = async () => {
        await openDrawer({
          content: <LoginRequiredDrawer lang={lang} dict={dict} />,
        });
      };
      showLoginDrawer();
      router.push('/reviews');
    }
  }, [user, isLoading, lang, dict, router]);

  if (isLoading || !user) {
    return null;
  }

  const tabs = [
    {
      id: 0,
      label: dict.reviewWrite?.selectHospital?.tabs?.writable || '작성 가능',
    },
    {
      id: 1,
      label: dict.reviewWrite?.selectHospital?.tabs?.written || '작성 완료',
    },
  ];

  return (
    <div className='w-full'>
      <HospitalDetailTabsHeaderV2
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      <div>
        {activeTab === 0 && (
          <ReviewSelectTabContent lang={lang} dict={dict} hasReviewed={false} />
        )}
        {activeTab === 1 && (
          <ReviewSelectTabContent lang={lang} dict={dict} hasReviewed={true} />
        )}
      </div>
    </div>
  );
}
