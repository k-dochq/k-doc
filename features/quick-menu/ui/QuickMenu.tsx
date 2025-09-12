'use client';

import { type QuickMenuProps } from '../model/types';
import { CATEGORIES } from '../model/categories';
import { QuickMenuRow } from './QuickMenuRow';

export function QuickMenu({ lang }: QuickMenuProps) {
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-3'>
        {/* 첫 번째 행 */}
        <QuickMenuRow categories={CATEGORIES.slice(0, 5)} lang={lang} />

        {/* 두 번째 행 */}
        <QuickMenuRow categories={CATEGORIES.slice(5, 10)} lang={lang} />
      </div>
    </div>
  );
}
