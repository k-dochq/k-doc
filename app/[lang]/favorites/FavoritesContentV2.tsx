'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalDetailTabsHeaderV2 } from 'widgets/hospital-detail-tabs/ui/HospitalDetailTabsHeaderV2';
import { useAuth } from 'shared/lib/auth/useAuth';
import { FavoritesHospitalsTabV2 } from './FavoritesHospitalsTabV2';
import { FavoritesReviewsTabV2 } from './FavoritesReviewsTabV2';
import { FavoritesDoctorsTabV2 } from './FavoritesDoctorsTabV2';

interface FavoritesContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function FavoritesContentV2({ lang, dict }: FavoritesContentV2Props) {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useAuth();

  const tabs = [
    { id: 0, label: dict.favorites?.hospitals || '병원' },
    { id: 1, label: dict.favorites?.reviews || '시술후기' },
    { id: 2, label: dict.favorites?.doctors || '의사' },
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
        {/* 병원 탭 */}
        {activeTab === 0 && <FavoritesHospitalsTabV2 lang={lang} dict={dict} user={user} />}

        {/* 시술후기 탭 */}
        {activeTab === 1 && <FavoritesReviewsTabV2 lang={lang} dict={dict} user={user} />}

        {/* 의사 탭 */}
        {activeTab === 2 && <FavoritesDoctorsTabV2 lang={lang} dict={dict} user={user} />}
      </div>
    </div>
  );
}
