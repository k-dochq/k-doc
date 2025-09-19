'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type HospitalSortOption, HOSPITAL_SORT_OPTIONS } from 'shared/model/types/hospital-query';
import { FilterBar, type FilterOption } from 'shared/ui/filter-bar';
import { DistrictFilterButton } from './DistrictFilterButton';
import { type useDistrictFilter } from 'features/district-filter/model/useDistrictFilter';

interface HospitalFilterBarProps {
  lang: Locale;
  dict: Dictionary;
  districtFilter: ReturnType<typeof useDistrictFilter>;
}

export function HospitalFilterBar({ lang, dict, districtFilter }: HospitalFilterBarProps) {
  const filterOptions: FilterOption<HospitalSortOption>[] = [
    {
      value: HOSPITAL_SORT_OPTIONS.POPULAR,
      label: dict.hospitalSort.popular,
      isDefault: true,
    },
    {
      value: HOSPITAL_SORT_OPTIONS.RECOMMENDED,
      label: dict.hospitalSort.recommended,
    },
  ];

  return (
    <FilterBar
      lang={lang}
      options={filterOptions}
      basePath='/hospitals'
      paramName='sort'
      rightContent={
        <DistrictFilterButton lang={lang} dict={dict} districtFilter={districtFilter} />
      }
    />
  );
}
