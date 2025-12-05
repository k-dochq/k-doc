'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { MapIconV2, MapIconV2Selected } from 'shared/ui/icons';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { openDrawer } from 'shared/lib/drawer';
import { useParentDistricts } from 'features/district-filter/model/useDistricts';
import { type useDistrictFilter } from 'features/district-filter/model/useDistrictFilter';
import { DistrictFilterDrawerV2 } from './DistrictFilterDrawerV2';

interface DistrictFilterButtonV2Props {
  lang: Locale;
  dict: Dictionary;
  districtFilter: ReturnType<typeof useDistrictFilter>;
}

const filterLabels = {
  byRegion: {
    ko_KR: '지역별',
    en_US: 'By Region',
    th_TH: 'ตามภูมิภาค',
  },
};

export function DistrictFilterButtonV2({
  lang,
  dict,
  districtFilter,
}: DistrictFilterButtonV2Props) {
  const { data: parentDistricts = [], isLoading, error } = useParentDistricts();

  const byRegionLabel = getLocalizedTextByLocale(filterLabels.byRegion, lang);
  const hasSelectedDistricts = districtFilter.selectedDistrictCount > 0;

  const handleClick = async () => {
    // 데이터가 로딩 중이거나 에러가 있으면 drawer를 열지 않음
    if (isLoading || error || parentDistricts.length === 0) {
      return;
    }

    await openDrawer({
      content: (
        <DistrictFilterDrawerV2
          lang={lang}
          dict={dict}
          districtFilter={districtFilter}
          parentDistricts={parentDistricts}
        />
      ),
    });
  };

  // 데이터가 로딩 중이거나 에러가 있으면 비활성화된 버튼 표시
  if (isLoading || error || parentDistricts.length === 0) {
    return (
      <button
        className='flex items-center justify-center gap-0.5 rounded-lg border border-neutral-200 bg-white px-2 py-1.5 opacity-50'
        disabled
      >
        <MapIconV2 className='h-[18px] w-[18px] shrink-0' />
        <p className='text-sm leading-5 font-semibold text-neutral-700'>{byRegionLabel}</p>
      </button>
    );
  }

  // 지역이 선택되었을 때 Figma 디자인에 맞는 스타일 적용
  const buttonClassName = hasSelectedDistricts
    ? 'flex items-center justify-center gap-0.5 rounded-lg border border-[#f58cff] bg-[#feefff] px-2 py-1.5'
    : 'flex items-center justify-center gap-0.5 rounded-lg border border-neutral-200 bg-white px-2 py-1.5';

  const textClassName = hasSelectedDistricts
    ? 'text-sm leading-5 font-semibold text-[#f15bff]'
    : 'text-sm leading-5 font-semibold text-neutral-700';

  const iconClassName = 'h-[18px] w-[18px] shrink-0';

  return (
    <button onClick={handleClick} className={buttonClassName}>
      {hasSelectedDistricts ? (
        <MapIconV2Selected className={iconClassName} />
      ) : (
        <MapIconV2 className={iconClassName} />
      )}
      <p className={textClassName}>
        {byRegionLabel}
        {hasSelectedDistricts && `(${districtFilter.selectedDistrictCount})`}
      </p>
    </button>
  );
}
