'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type HospitalSortOption, HOSPITAL_SORT_OPTIONS } from 'shared/model/types/hospital-query';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { QUICK_MENU_CATEGORIES } from 'features/quick-menu/model/categories';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { LocaleLink } from 'shared/ui/locale-link';
import { TabHeader } from 'shared/ui/tab-header/TabHeader';
import { FilterIconV2 } from 'shared/ui/icons';
import { HospitalsInfiniteListV2 } from '../hospitals/HospitalsInfiniteListV2';
import { SearchReviewsInfiniteListV2 } from './SearchReviewsInfiniteListV2';
import { SortFilterDrawer } from 'features/hospital-filter/ui/SortFilterDrawer';
import { ReviewSortFilterDrawer } from 'features/hospital-reviews/ui/ReviewSortFilterDrawer';
import { DistrictFilterButtonV2 } from 'features/hospital-filter/ui/DistrictFilterButtonV2';
import { useDistrictFilter } from 'features/district-filter/model/useDistrictFilter';
import { openDrawer } from 'shared/lib/drawer';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useSearchParams } from 'next/navigation';

interface SearchV2ContentProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: { q?: string; tab?: string; sort?: string };
}

const TAB_HOSPITAL = 'hospital';
const TAB_REVIEW = 'review';

export function SearchV2Content({ lang, dict, searchParams }: SearchV2ContentProps) {
  const q = searchParams.q?.trim() ?? '';
  const currentTab = searchParams.tab === TAB_REVIEW ? TAB_REVIEW : TAB_HOSPITAL;
  const currentSort = searchParams.sort;

  const currentHospitalSort: HospitalSortOption =
    currentSort === HOSPITAL_SORT_OPTIONS.RECOMMENDED ||
    currentSort === HOSPITAL_SORT_OPTIONS.NEWEST ||
    currentSort === HOSPITAL_SORT_OPTIONS.POPULAR
      ? (currentSort as HospitalSortOption)
      : HOSPITAL_SORT_OPTIONS.POPULAR;

  const currentReviewSort: ReviewSortOption =
    currentSort === REVIEW_SORT_OPTIONS.RECOMMENDED ||
    currentSort === REVIEW_SORT_OPTIONS.RATING_HIGH ||
    currentSort === REVIEW_SORT_OPTIONS.RATING_LOW ||
    currentSort === REVIEW_SORT_OPTIONS.POPULAR
      ? (currentSort as ReviewSortOption)
      : REVIEW_SORT_OPTIONS.POPULAR;

  const router = useLocalizedRouter();
  const urlSearchParams = useSearchParams();
  const districtFilter = useDistrictFilter();

  const tabs = [
    { id: 0, label: dict.search?.tabs?.hospital ?? '' },
    { id: 1, label: dict.search?.tabs?.review ?? '' },
  ];

  const activeTabIndex = currentTab === TAB_REVIEW ? 1 : 0;

  const handleTabClick = (index: number) => {
    const params = new URLSearchParams(urlSearchParams?.toString() || '');
    params.set('tab', index === 1 ? TAB_REVIEW : TAB_HOSPITAL);
    params.delete('sort');
    router.replace(`/v2/search?${params.toString()}`);
  };

  const handleHospitalSortSelect = (sort: HospitalSortOption) => {
    const params = new URLSearchParams(urlSearchParams?.toString() || '');
    params.set('sort', sort);
    router.replace(`/v2/search?${params.toString()}`);
  };

  const handleReviewSortSelect = (sort: ReviewSortOption) => {
    const params = new URLSearchParams(urlSearchParams?.toString() || '');
    params.set('sort', sort);
    router.replace(`/v2/search?${params.toString()}`);
  };

  const handleHospitalSortClick = async () => {
    await openDrawer({
      content: (
        <SortFilterDrawer
          lang={lang}
          dict={dict}
          currentSort={currentHospitalSort}
          onSelect={handleHospitalSortSelect}
        />
      ),
    });
  };

  const handleReviewSortClick = async () => {
    await openDrawer({
      content: (
        <ReviewSortFilterDrawer
          lang={lang}
          dict={dict}
          currentSort={currentReviewSort}
          onSelect={handleReviewSortSelect}
        />
      ),
    });
  };

  if (!q) {
    return (
      <div className='p-5'>
        <div className='flex flex-col gap-4'>
          <p className="font-['Pretendard'] text-base font-semibold leading-6 text-[#404040]">
            {dict.search?.categoryTitle}
          </p>
          <div className='flex flex-col gap-3'>
            {[0, 1, 2].map((rowIndex) => (
              <div key={rowIndex} className='flex items-start justify-between'>
                {QUICK_MENU_CATEGORIES.slice(rowIndex * 4, rowIndex * 4 + 4).map((category) => {
                  const label = getLocalizedTextByLocale(category.labels, lang);
                  return (
                    <LocaleLink
                      key={category.type}
                      href={`/v2/search?q=${encodeURIComponent(label)}`}
                      className='flex w-[60px] flex-col items-center gap-1'
                    >
                      <div className='flex size-[60px] items-center justify-center rounded-2xl border border-[#f8adff] bg-white'>
                        {category.iconSmall()}
                      </div>
                      <p className="w-full text-center font-['Pretendard'] text-xs font-medium leading-4 text-[#404040]">
                        {label}
                      </p>
                    </LocaleLink>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <TabHeader
        tabs={tabs}
        activeTab={activeTabIndex}
        onTabClick={handleTabClick}
        className='border-t border-neutral-100'
      />

      {currentTab === TAB_HOSPITAL && (
        <>
          <div className='w-full'>
            <div className='h-[6px] w-full bg-neutral-100' />
            <div className='flex items-center gap-2 px-5 py-3'>
              <button
                onClick={handleHospitalSortClick}
                className='flex items-center justify-center gap-0.5 rounded-lg border border-neutral-200 bg-white px-2 py-1.5'
              >
                <FilterIconV2 className='h-[18px] w-[18px] shrink-0' />
                <p className='text-sm leading-5 font-semibold text-neutral-700'>
                  {currentHospitalSort === HOSPITAL_SORT_OPTIONS.RECOMMENDED
                    ? (dict.hospitalSort?.recommended ?? '')
                    : currentHospitalSort === HOSPITAL_SORT_OPTIONS.NEWEST
                      ? (dict.hospitalSort?.newest ?? '')
                      : (dict.hospitalSort?.popular ?? '')}
                </p>
              </button>
              <DistrictFilterButtonV2 lang={lang} dict={dict} districtFilter={districtFilter} />
              <button className='flex items-center justify-center gap-[2px] rounded-lg border border-[#e5e5e5] bg-white px-2 py-[6px]'>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M9 2L10.5 6.5H15L11.25 9.25L12.75 13.75L9 11L5.25 13.75L6.75 9.25L3 6.5H7.5L9 2Z'
                    fill='#A855F7'
                  />
                </svg>
                <p className="font-['Pretendard'] text-sm font-semibold leading-5 text-[#404040]">
                  {dict.search?.filter?.procedure}
                </p>
              </button>
            </div>
          </div>
          <HospitalsInfiniteListV2
            lang={lang}
            dict={dict}
            searchParams={{
              search: q,
              sort: currentHospitalSort,
              districtIds:
                districtFilter.selectedDistrictIds.length > 0
                  ? districtFilter.selectedDistrictIds
                  : undefined,
            }}
          />
        </>
      )}

      {currentTab === TAB_REVIEW && (
        <>
          <div className='w-full'>
            <div className='h-[6px] w-full bg-neutral-100' />
            <div className='flex items-center px-5 py-3'>
              <button
                onClick={handleReviewSortClick}
                className='flex items-center justify-center gap-0.5 rounded-lg border border-neutral-200 bg-white px-2 py-1.5'
              >
                <FilterIconV2 className='h-[18px] w-[18px] shrink-0' />
                <p className='text-sm leading-5 font-semibold text-neutral-700'>
                  {currentReviewSort === REVIEW_SORT_OPTIONS.RECOMMENDED
                    ? (dict.allReviews?.sort?.recommended ?? '')
                    : currentReviewSort === REVIEW_SORT_OPTIONS.RATING_HIGH
                      ? (dict.allReviews?.sort?.ratingHigh ?? '')
                      : currentReviewSort === REVIEW_SORT_OPTIONS.RATING_LOW
                        ? (dict.allReviews?.sort?.ratingLow ?? '')
                        : (dict.allReviews?.sort?.popular ?? '')}
                </p>
              </button>
            </div>
          </div>
          <SearchReviewsInfiniteListV2
            lang={lang}
            dict={dict}
            query={q}
            sort={currentReviewSort}
          />
        </>
      )}
    </div>
  );
}
