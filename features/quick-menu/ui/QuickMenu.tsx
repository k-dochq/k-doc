'use client';

import { type QuickMenuProps } from '../model/types';
import { CATEGORIES } from '../model/categories';
import { QuickMenuButton } from './QuickMenuButton';

export function QuickMenu({ lang }: QuickMenuProps) {
  return (
    <div className='w-full overflow-visible'>
      <div className='grid grid-cols-5 items-start justify-items-center gap-x-1 gap-y-3'>
        {CATEGORIES.map((category) => (
          <QuickMenuButton key={category.id} category={category} lang={lang} />
        ))}
      </div>
    </div>
  );
}
