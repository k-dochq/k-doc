'use client';

import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import { QUICK_MENU_CATEGORIES_V2 } from 'features/quick-menu/model/categoriesV2';
import { getLocalizedTextByLocale } from 'shared/model/types/common';

interface ProcedureFilterCategoryListProps {
  lang: Locale;
  selected: MedicalSpecialtyType[];
  onToggle: (type: MedicalSpecialtyType) => void;
}

export function ProcedureFilterCategoryList({
  lang,
  selected,
  onToggle,
}: ProcedureFilterCategoryListProps) {
  const rows: (typeof QUICK_MENU_CATEGORIES_V2)[] = [];
  for (let i = 0; i < QUICK_MENU_CATEGORIES_V2.length; i += 2) {
    rows.push(QUICK_MENU_CATEGORIES_V2.slice(i, i + 2));
  }

  return (
    <div className='flex flex-col'>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className='flex items-stretch'>
          {row.map((category, colIdx) => {
            const type = category.type as MedicalSpecialtyType;
            const isSelected = selected.includes(type);
            const label = getLocalizedTextByLocale(category.labels, lang);
            const isLeft = colIdx === 0;

            return (
              <button
                key={type}
                type='button'
                onClick={() => onToggle(type)}
                className={`flex flex-1 items-center gap-2 py-2 ${
                  isLeft ? 'px-5' : 'pl-2 pr-5'
                } ${isSelected ? 'bg-[#feefff]' : 'bg-white'}`}
              >
                <div className='flex size-[48px] shrink-0 items-center justify-center'>
                  {category.icon()}
                </div>
                <p className="min-w-0 flex-1 text-left font-['Pretendard'] text-[13px] font-normal leading-[19px] text-[#404040]">
                  {label}
                </p>
                {isSelected && (
                  <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
                    <path
                      d='M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5'
                      stroke='#a3a3a3'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
