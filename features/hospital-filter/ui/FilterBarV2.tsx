'use client';

import { useSearchParams } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type HospitalSortOption, HOSPITAL_SORT_OPTIONS } from 'shared/model/types/hospital-query';
import { FilterIconV2, MapIconV2 } from 'shared/ui/icons';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { openDrawer } from 'shared/lib/drawer';
import { useLocalizedRouter } from 'shared/model/hooks';
import { SortFilterDrawer } from './SortFilterDrawer';

interface FilterBarV2Props {
  lang: Locale;
  dict: Dictionary;
  currentSort: HospitalSortOption;
}

const filterLabels = {
  popular: {
    ko_KR: '인기순',
    en_US: 'Popular',
    th_TH: 'ยอดนิยม',
  },
  recommended: {
    ko_KR: '추천순',
    en_US: 'Recommended',
    th_TH: 'แนะนำ',
  },
  newest: {
    ko_KR: '신규 병원순',
    en_US: 'Newest',
    th_TH: 'ใหม่ล่าสุด',
  },
  byRegion: {
    ko_KR: '지역별',
    en_US: 'By Region',
    th_TH: 'ตามภูมิภาค',
  },
};

export function FilterBarV2({ lang, dict, currentSort }: FilterBarV2Props) {
  const router = useLocalizedRouter();
  const searchParams = useSearchParams();

  // 현재 정렬 상태에 따른 버튼 텍스트
  const getSortLabel = (): string => {
    switch (currentSort) {
      case HOSPITAL_SORT_OPTIONS.POPULAR:
        return getLocalizedTextByLocale(filterLabels.popular, lang);
      case HOSPITAL_SORT_OPTIONS.RECOMMENDED:
        return getLocalizedTextByLocale(filterLabels.recommended, lang);
      case HOSPITAL_SORT_OPTIONS.NEWEST:
        return getLocalizedTextByLocale(filterLabels.newest, lang);
      default:
        return getLocalizedTextByLocale(filterLabels.popular, lang);
    }
  };

  const sortLabel = getSortLabel();
  const byRegionLabel = getLocalizedTextByLocale(filterLabels.byRegion, lang);

  const handleSortClick = async () => {
    await openDrawer({
      content: (
        <SortFilterDrawer
          lang={lang}
          dict={dict}
          currentSort={currentSort}
          onSelect={(sort) => {
            // URL 업데이트 (기존 파라미터 유지)
            const params = new URLSearchParams(searchParams?.toString() || '');
            params.set('sort', sort);
            router.replace(`/v2/hospitals?${params.toString()}`);
          }}
        />
      ),
    });
  };

  return (
    <div className='w-full'>
      {/* 상단 margin area */}
      <div className='h-[6px] w-full bg-neutral-100' />

      {/* 필터 영역 */}
      <div className='flex items-center justify-between px-5 py-3'>
        {/* 정렬 버튼 */}
        <button
          onClick={handleSortClick}
          className='flex items-center justify-center gap-0.5 rounded-lg border border-neutral-200 bg-white px-2 py-1.5'
        >
          <FilterIconV2 className='h-[18px] w-[18px] shrink-0' />
          <p className='text-sm leading-5 font-semibold text-neutral-700'>{sortLabel}</p>
        </button>

        {/* 지역별 버튼 */}
        <button className='flex items-center justify-center gap-0.5 rounded-lg border border-neutral-200 bg-white px-2 py-1.5'>
          <MapIconV2 className='h-[18px] w-[18px] shrink-0' />
          <p className='text-sm leading-5 font-semibold text-neutral-700'>{byRegionLabel}</p>
        </button>
      </div>
    </div>
  );
}
