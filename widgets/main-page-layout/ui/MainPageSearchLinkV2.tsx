'use client';

import { type Locale } from 'shared/config';
import { LocaleLink } from 'shared/ui/locale-link';
import { SearchIconV2 } from 'shared/ui/search-bar/SearchIconV2';

interface MainPageSearchLinkV2Props {
  lang: Locale;
  placeholder: string;
}

/** 메인 전용: 입력 없이 탭 시 통합 검색(/v2/search)으로 이동 */
export function MainPageSearchLinkV2({ lang, placeholder }: MainPageSearchLinkV2Props) {
  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <LocaleLink
        href='/v2/search'
        className='flex w-full cursor-pointer items-center gap-1.5 rounded-full border border-neutral-200 bg-[#f1f1f1] px-4 py-3'
        aria-label={placeholder}
      >
        <div className='shrink-0'>
          <SearchIconV2 />
        </div>
        <span className='min-w-0 flex-1 text-start text-sm font-medium text-neutral-400'>{placeholder}</span>
      </LocaleLink>
    </div>
  );
}
