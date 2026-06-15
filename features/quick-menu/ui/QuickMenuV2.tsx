'use client';

import { type QuickMenuProps } from '../model/types';
import { QUICK_MENU_CATEGORIES_V2 } from '../model/categories';
import { QuickMenuButtonV2 } from './QuickMenuButtonV2';

export function QuickMenuV2({ lang }: QuickMenuProps) {
  const firstRow = QUICK_MENU_CATEGORIES_V2.slice(0, 5);
  const secondRow = QUICK_MENU_CATEGORIES_V2.slice(5, 10);

  return (
    <div className='flex w-full flex-col gap-3 px-5'>
      <div className='grid grid-cols-5'>
        {firstRow.map((category) => (
          <QuickMenuButtonV2 key={category.id} category={category} lang={lang} />
        ))}
      </div>
      <div className='grid grid-cols-5'>
        {secondRow.map((category) => (
          <QuickMenuButtonV2 key={category.id} category={category} lang={lang} />
        ))}
      </div>
    </div>
  );
}
