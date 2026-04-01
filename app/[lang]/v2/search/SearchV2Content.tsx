'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { QUICK_MENU_CATEGORIES } from 'features/quick-menu/model/categories';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { LocaleLink } from 'shared/ui/locale-link';
import { useInfiniteHospitalsV2 } from 'entities/hospital/model/useInfiniteHospitalsV2';
import { useInfiniteSearchReviews } from 'entities/review/api/queries/use-infinite-search-reviews';

interface SearchV2ContentProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: { q?: string };
}

export function SearchV2Content({ lang, dict, searchParams }: SearchV2ContentProps) {
  const q = searchParams.q?.trim() ?? '';

  const hospitalsQuery = useInfiniteHospitalsV2({
    search: q || undefined,
    lang,
    limit: 10,
  });

  const reviewsQuery = useInfiniteSearchReviews({
    query: q,
    limit: 10,
  });

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
    <div className='p-5'>
      <p className='text-base font-semibold text-neutral-900'>
        &apos;{q}&apos; {dict.search?.resultTitle}
      </p>
      {/* 병원/리뷰 결과 컴포넌트 — 다음 작업에서 추가 */}
      {/* hospitalsQuery, reviewsQuery 데이터 준비 완료 */}
    </div>
  );
}
