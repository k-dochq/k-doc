'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks';
import { HospitalDetailTabsHeaderV2 } from 'widgets/hospital-detail-tabs/ui/HospitalDetailTabsHeaderV2';
import { useAuth } from 'shared/lib/auth/useAuth';
import { FavoritesHospitalsTabV2 } from './FavoritesHospitalsTabV2';
import { FavoritesReviewsTabV2 } from './FavoritesReviewsTabV2';
import { FavoritesDoctorsTabV2 } from './FavoritesDoctorsTabV2';

export type FavoritesTab = 'hospitals' | 'reviews' | 'doctors';

const TAB_ORDER: FavoritesTab[] = ['hospitals', 'reviews', 'doctors'];

function parseTab(value: string | null | undefined): FavoritesTab {
  return TAB_ORDER.includes(value as FavoritesTab) ? (value as FavoritesTab) : 'hospitals';
}

interface FavoritesContentV2Props {
  lang: Locale;
  dict: Dictionary;
  initialTab?: FavoritesTab;
}

export function FavoritesContentV2({ lang, dict, initialTab }: FavoritesContentV2Props) {
  const router = useLocalizedRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { user } = useAuth();

  const activeTab = parseTab(searchParams?.get('tab') ?? initialTab);
  const activeTabIndex = TAB_ORDER.indexOf(activeTab);

  const tabs = [
    { id: 0, label: dict.favorites?.hospitals || '병원' },
    { id: 1, label: dict.favorites?.reviews || '시술후기' },
    { id: 2, label: dict.favorites?.doctors || '의사' },
  ];

  // 탭 클릭 시 URL 쿼리 파라미터(tab)를 갱신하여, 새로고침해도 선택된 탭이 유지되도록 한다.
  const handleTabClick = (index: number) => {
    const nextTab = TAB_ORDER[index];
    if (!nextTab) return;
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('tab', nextTab);
    const basePath = pathname?.replace(/^\/[^/]+/, '') || '/favorites';
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
        {/* 병원 탭 */}
        {activeTab === 'hospitals' && (
          <FavoritesHospitalsTabV2 lang={lang} dict={dict} user={user} />
        )}

        {/* 시술후기 탭 */}
        {activeTab === 'reviews' && <FavoritesReviewsTabV2 lang={lang} dict={dict} user={user} />}

        {/* 의사 탭 */}
        {activeTab === 'doctors' && <FavoritesDoctorsTabV2 lang={lang} dict={dict} user={user} />}
      </div>
    </div>
  );
}
