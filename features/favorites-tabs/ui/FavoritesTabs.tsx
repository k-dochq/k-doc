'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FavoritesTabHeader } from './FavoritesTabHeader';
import { FavoritesHospitalsTab } from './FavoritesHospitalsTab';
import { FavoritesReviewsTab } from './FavoritesReviewsTab';

interface FavoritesTabsProps {
  lang: Locale;
  dict: Dictionary;
}

export function FavoritesTabs({ lang, dict }: FavoritesTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: dict.favorites?.hospitals || '병원' },
    { id: 1, label: dict.favorites?.reviews || '시술후기' },
  ];

  // 탭 클릭 핸들러
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className='flex h-[calc(100vh-122px)] w-full flex-col overflow-hidden'>
      {/* 탭 헤더 - 고정 */}
      <div className='flex-shrink-0'>
        <FavoritesTabHeader tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
      </div>

      {/* 탭 컨텐츠 - 스크롤 가능 영역 */}
      <div className='relative flex-1 overflow-hidden'>
        {/* 병원 탭 */}
        <div
          className={`h-full overflow-y-auto transition-opacity duration-300 ${
            activeTab === 0 ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
          }`}
        >
          <FavoritesHospitalsTab lang={lang} dict={dict} />
        </div>

        {/* 시술후기 탭 */}
        <div
          className={`h-full overflow-y-auto transition-opacity duration-300 ${
            activeTab === 1 ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
          }`}
        >
          <FavoritesReviewsTab lang={lang} dict={dict} />
        </div>
      </div>
    </div>
  );
}
