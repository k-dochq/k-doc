'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FilterIconV2, MapIconV2 } from 'shared/ui/icons';
import { getLocalizedTextByLocale } from 'shared/model/types/common';

interface FilterBarV2Props {
  lang: Locale;
  dict: Dictionary;
}

const filterLabels = {
  popular: {
    ko_KR: '인기순',
    en_US: 'Popular',
    th_TH: 'ยอดนิยม',
  },
  byRegion: {
    ko_KR: '지역별',
    en_US: 'By Region',
    th_TH: 'ตามภูมิภาค',
  },
};

export function FilterBarV2({ lang, dict }: FilterBarV2Props) {
  const popularLabel = getLocalizedTextByLocale(filterLabels.popular, lang);
  const byRegionLabel = getLocalizedTextByLocale(filterLabels.byRegion, lang);

  return (
    <div className='w-full'>
      {/* 상단 margin area */}
      <div className='h-[6px] w-full bg-neutral-100' />

      {/* 필터 영역 */}
      <div className='flex items-center justify-between px-5 py-3'>
        {/* 인기순 버튼 */}
        <button className='flex items-center justify-center gap-0.5 rounded-lg border border-neutral-200 bg-white px-2 py-1.5'>
          <FilterIconV2 className='h-[18px] w-[18px] shrink-0' />
          <p className='text-sm leading-5 font-semibold text-neutral-700'>{popularLabel}</p>
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
