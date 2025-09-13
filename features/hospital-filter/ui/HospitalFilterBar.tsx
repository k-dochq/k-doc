'use client';

import { useSearchParams } from 'next/navigation';
import { type Locale } from 'shared/config';
import { LocaleLink } from 'shared/ui/locale-link';

interface HospitalFilterBarProps {
  lang: Locale;
}

export function HospitalFilterBar({ lang }: HospitalFilterBarProps) {
  const searchParams = useSearchParams();

  // 현재 쿼리 파라미터를 유지하면서 정렬 옵션만 변경하는 헬퍼 함수
  const createSortUrl = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    return `/hospitals?${params.toString()}`;
  };

  const currentSort = searchParams.get('sort') || 'popular';

  return (
    <div className='flex items-center justify-between border-t border-b border-neutral-200 px-5 py-3'>
      <div className='flex items-center gap-2'>
        <LocaleLink
          href={createSortUrl('popular')}
          replace
          className={`text-[13px] font-semibold ${currentSort === 'popular' ? 'text-primary' : 'text-neutral-500'}`}
        >
          인기순
        </LocaleLink>
        <div className='h-3 w-0 border-l border-neutral-300'></div>
        <LocaleLink
          href={createSortUrl('recommended')}
          replace
          className={`text-[13px] font-medium ${currentSort === 'recommended' ? 'text-primary' : 'text-neutral-500'}`}
        >
          추천순
        </LocaleLink>
      </div>
    </div>
  );
}
