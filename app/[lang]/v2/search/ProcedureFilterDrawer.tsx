'use client';

import { useState } from 'react';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { QUICK_MENU_CATEGORIES_V2 } from 'features/quick-menu/model/categoriesV2';
import { getLocalizedTextByLocale } from 'shared/model/types/common';

interface ProcedureFilterDrawerProps {
  lang: Locale;
  dict: Dictionary;
  selectedCategories: MedicalSpecialtyType[];
  onApply: (categories: MedicalSpecialtyType[]) => void;
  onClose: () => void;
}

export function ProcedureFilterDrawer({
  lang,
  dict,
  selectedCategories,
  onApply,
  onClose,
}: ProcedureFilterDrawerProps) {
  const [selected, setSelected] = useState<MedicalSpecialtyType[]>(selectedCategories);

  const toggle = (type: MedicalSpecialtyType) => {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleReset = () => setSelected([]);

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  // 12개 카테고리를 2열로: [[0,1],[2,3],...]
  const rows: (typeof QUICK_MENU_CATEGORIES_V2)[] = [];
  for (let i = 0; i < QUICK_MENU_CATEGORIES_V2.length; i += 2) {
    rows.push(QUICK_MENU_CATEGORIES_V2.slice(i, i + 2));
  }

  return (
    <div className='flex w-full flex-col bg-white'>
      {/* 헤더 */}
      <div className='flex items-center justify-between px-5 py-4'>
        <p className="font-['Pretendard'] text-lg font-bold leading-7 text-[#404040]">
          {dict.search?.drawer?.procedure?.title}
        </p>
        <button
          type='button'
          onClick={handleReset}
          className='flex items-center gap-1'
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <path
              d='M2.5 8C2.5 5.015 4.515 2.5 8 2.5C10.485 2.5 12.5 4.515 12.5 7'
              stroke='#a3a3a3'
              strokeWidth='1.2'
              strokeLinecap='round'
            />
            <path d='M10.5 7L12.5 7L14.5 5' stroke='#a3a3a3' strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round' />
            <path
              d='M13.5 8C13.5 10.985 11.485 13.5 8 13.5C5.515 13.5 3.5 11.485 3.5 9'
              stroke='#a3a3a3'
              strokeWidth='1.2'
              strokeLinecap='round'
            />
          </svg>
          <p className="font-['Pretendard'] text-sm font-normal leading-5 text-[#a3a3a3]">
            {dict.search?.drawer?.procedure?.reset}
          </p>
        </button>
      </div>

      {/* 구분선 */}
      <div className='h-px w-full bg-neutral-100' />

      {/* 카테고리 목록 */}
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
                  onClick={() => toggle(type)}
                  className={`flex flex-1 items-center gap-2 py-2 ${
                    isLeft ? 'px-5' : 'pl-2 pr-5'
                  } ${isSelected ? 'bg-[#feefff]' : 'bg-white'}`}
                >
                  <div className='flex size-[48px] shrink-0 items-center justify-center rounded-2xl border border-[#f0b5f9] bg-white'>
                    {category.icon()}
                  </div>
                  <p className="flex-1 min-w-0 text-left font-['Pretendard'] text-[13px] font-normal leading-[19px] text-[#404040]">
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

      {/* 구분선 */}
      <div className='h-px w-full bg-neutral-100' />

      {/* 완료 버튼 */}
      <div className='px-5 py-4'>
        <button
          type='button'
          onClick={handleApply}
          className='flex w-full items-center justify-center rounded-full bg-[#6C4EF3] py-4'
        >
          <p className="font-['Pretendard'] text-base font-semibold leading-6 text-white">
            {dict.search?.drawer?.procedure?.confirm}
            {selected.length > 0 ? `(${selected.length})` : ''}
          </p>
        </button>
      </div>
    </div>
  );
}
