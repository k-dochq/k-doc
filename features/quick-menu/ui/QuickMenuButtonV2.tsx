'use client';

import { type CategoryButtonProps } from '../model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { getLocalizedTextByLocale } from 'shared/model/types/common';

export function QuickMenuButtonV2({ category, lang }: CategoryButtonProps) {
  // 'all' 타입인 경우 category 쿼리 파라미터를 추가하지 않음
  const href = category.type === 'all' ? '/hospitals' : `/hospitals?category=${category.type}`;

  const label = getLocalizedTextByLocale(category.labels, lang);

  return (
    <LocaleLink href={href} locale={lang} className='flex flex-col items-center gap-1'>
      <div className='flex size-[60px] items-center justify-center rounded-2xl border border-[#f0b5f9] bg-white'>
        {category.icon()}
      </div>
      <span className='line-clamp-2 max-w-[60px] overflow-hidden text-center text-xs leading-4 font-medium text-ellipsis text-neutral-700'>
        {label}
      </span>
    </LocaleLink>
  );
}
