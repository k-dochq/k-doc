'use client';

import { useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type HospitalSortOption, HOSPITAL_SORT_OPTIONS } from 'shared/model/types/hospital-query';
import { SearchBarV2 } from 'shared/ui/search-bar/SearchBarV2';
import { HospitalsInfiniteListV2 } from '../../v2/hospitals/HospitalsInfiniteListV2';
import { trackSearch, trackMetaPixelSearch } from 'shared/lib/analytics';

interface HospitalsSearchContentV2Props {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    search?: string;
    sort?: string;
  };
}

export function HospitalsSearchContentV2({
  lang,
  dict,
  searchParams,
}: HospitalsSearchContentV2Props) {
  const currentSearch = searchParams.search?.trim() || '';
  const currentSort: HospitalSortOption =
    searchParams.sort === HOSPITAL_SORT_OPTIONS.RECOMMENDED ||
    searchParams.sort === HOSPITAL_SORT_OPTIONS.NEWEST ||
    searchParams.sort === HOSPITAL_SORT_OPTIONS.POPULAR
      ? (searchParams.sort as HospitalSortOption)
      : HOSPITAL_SORT_OPTIONS.POPULAR;

  // 검색 이벤트 트래킹
  useEffect(() => {
    if (currentSearch) {
      // Meta Pixel Search 이벤트
      trackMetaPixelSearch(currentSearch);

      // GA4 search 이벤트
      trackSearch(currentSearch);
    }
  }, [currentSearch]);

  return (
    <div>
      <div className='bg-[#F7F7F7] px-5 py-5'>
        <SearchBarV2
          lang={lang}
          dict={dict}
          initialValue={currentSearch}
          searchPath='/search/hospitals'
        />
      </div>

      {currentSearch && (
        <div className='px-5 py-4'>
          <p className='text-base font-semibold text-neutral-900'>
            ‘{currentSearch}’ {dict.search?.resultTitle || '검색결과'}
          </p>
        </div>
      )}

      <HospitalsInfiniteListV2
        lang={lang}
        dict={dict}
        searchParams={{
          sort: currentSort,
          search: currentSearch || undefined,
          category: undefined, // 카테고리 필터 없음
          districtIds: undefined,
        }}
      />
    </div>
  );
}
