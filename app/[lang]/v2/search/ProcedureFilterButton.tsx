'use client';

import { useState } from 'react';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { Drawer, DrawerContent, DrawerTrigger } from 'shared/ui/drawer';
import { ProcedureFilterDrawer } from './ProcedureFilterDrawer';

interface ProcedureFilterButtonProps {
  lang: Locale;
  dict: Dictionary;
  selectedCategories: MedicalSpecialtyType[];
  onApply: (categories: MedicalSpecialtyType[]) => void;
}

export function ProcedureFilterButton({
  lang,
  dict,
  selectedCategories,
  onApply,
}: ProcedureFilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSelected = selectedCategories.length > 0;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button
          className={`flex items-center justify-center gap-[2px] rounded-lg border px-2 py-[6px] ${
            hasSelected
              ? 'border-[#f58cff] bg-[#feefff]'
              : 'border-[#e5e5e5] bg-white'
          }`}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
            <g clipPath='url(#clip0_proc)'>
              <path
                d='M5.5 17C5.5 15.0668 7.06683 13.5 9 13.5C7.06683 13.5 5.5 11.9332 5.5 10C5.5 11.9332 3.93317 13.5 2 13.5C3.93317 13.5 5.5 15.0668 5.5 17Z'
                stroke='#404040'
                strokeWidth='1.5'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M6 7.5C9.03783 7.5 11.5 5.03783 11.5 2C11.5 5.03783 13.9622 7.5 17 7.5C13.9622 7.5 11.5 9.96217 11.5 13C11.5 9.96217 9.03783 7.5 6 7.5Z'
                stroke='#404040'
                strokeWidth='1.5'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M3.5 1.5V3.5M3.5 5.5V3.5M3.5 3.5H5.5M3.5 3.5H1.5'
                stroke='#404040'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </g>
            <defs>
              <clipPath id='clip0_proc'>
                <rect width='18' height='18' fill='white' />
              </clipPath>
            </defs>
          </svg>
          <p className={`font-['Pretendard'] text-sm font-semibold leading-5 ${hasSelected ? 'text-primary-900' : 'text-[#404040]'}`}>
            {dict.search?.filter?.procedure}
            {hasSelected ? `(${selectedCategories.length})` : ''}
          </p>
        </button>
      </DrawerTrigger>
      <DrawerContent className='w-full bg-white'>
        <ProcedureFilterDrawer
          lang={lang}
          dict={dict}
          selectedCategories={selectedCategories}
          onApply={onApply}
          onClose={() => setIsOpen(false)}
        />
      </DrawerContent>
    </Drawer>
  );
}
