'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type HospitalSortOption, HOSPITAL_SORT_OPTIONS } from 'shared/model/types/hospital-query';
import { SearchBar } from 'shared/ui';
import { useHospitalSearch } from 'features/hospital-search';
import { HospitalsInfiniteListV2 } from './HospitalsInfiniteListV2';
import { CategorySectionV2 } from 'features/category-filter/ui/CategorySectionV2';
import { useCategories } from 'features/category-filter';
import { FilterBarV2 } from 'features/hospital-filter';
import { useDistrictFilter } from 'features/district-filter/model/useDistrictFilter';
import { type MedicalSpecialtyType } from '@prisma/client';

interface HospitalsContentV2Props {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    category?: string;
    sort?: string;
    search?: string;
  };
}

export function HospitalsContentV2({ lang, dict, searchParams }: HospitalsContentV2Props) {
  // 지역 필터 상태 관리
  const districtFilter = useDistrictFilter();

  // TanStack Query로 카테고리 데이터 가져오기
  const {
    // data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  // string을 MedicalSpecialtyType으로 안전하게 변환
  const currentCategory = searchParams.category as MedicalSpecialtyType | undefined;

  // 정렬 파라미터 처리 - 타입 안전하게 변환
  const currentSort: HospitalSortOption =
    searchParams.sort === HOSPITAL_SORT_OPTIONS.POPULAR ||
    searchParams.sort === HOSPITAL_SORT_OPTIONS.RECOMMENDED ||
    searchParams.sort === HOSPITAL_SORT_OPTIONS.NEWEST
      ? (searchParams.sort as HospitalSortOption)
      : HOSPITAL_SORT_OPTIONS.POPULAR;

  // 검색어 파라미터 처리
  const currentSearch = searchParams.search?.trim() || undefined;

  // 병원 검색 훅 사용
  const { handleSearch } = useHospitalSearch({
    currentCategory,
    currentSort: searchParams.sort,
  });

  return (
    <div className=''>
      {/* 검색어가 있을 때 검색바 표시 */}
      {currentSearch && (
        <div className='px-5'>
          <SearchBar lang={lang} dict={dict} initialValue={currentSearch} onSearch={handleSearch} />
        </div>
      )}

      {/* 카테고리 섹션 */}
      <CategorySectionV2
        lang={lang}
        dict={dict}
        currentCategory={currentCategory}
        isLoading={categoriesLoading}
        error={categoriesError}
      />

      {/* 필터 바 */}
      <FilterBarV2 lang={lang} dict={dict} currentSort={currentSort} />

      {/* 병원 리스트 */}
      <HospitalsInfiniteListV2
        lang={lang}
        searchParams={{
          category: currentCategory,
          sort: currentSort,
          search: currentSearch,
          districtIds: districtFilter.selectedDistrictIds,
        }}
        dict={dict}
      />
    </div>
  );
}
