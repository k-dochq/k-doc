'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { MenuItem } from './MenuItem';

interface ActivitySectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function ActivitySection({ lang, dict }: ActivitySectionProps) {
  return (
    <div className='flex w-full flex-col gap-5'>
      <h2 className='text-lg font-semibold text-gray-900'>{dict.my?.activity?.title || '활동'}</h2>

      <div className='flex w-full flex-col gap-3'>
        <MenuItem title={dict.my?.activity?.savedList || '내 저장 목록'} href='/favorites' />
      </div>
    </div>
  );
}
