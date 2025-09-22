'use client';

import { type QuickMenuProps } from '../model/types';
import { CATEGORIES } from '../model/categories';
import { QuickMenuButton } from './QuickMenuButton';

export function QuickMenu({ lang }: QuickMenuProps) {
  return (
    <div className='w-full'>
      <div className='grid grid-cols-5 items-start justify-items-center gap-1'>
        {CATEGORIES.map((category) => (
          <QuickMenuButton key={category.id} category={category} lang={lang} />
        ))}
      </div>
    </div>
  );
}
