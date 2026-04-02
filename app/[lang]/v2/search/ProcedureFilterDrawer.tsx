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
      <div className='flex items-center justify-between px-5 pb-3'>
        <p className="font-['Pretendard'] text-lg font-bold leading-7 text-[#404040]">
          {dict.search?.drawer?.procedure?.title}
        </p>
        <button
          type='button'
          onClick={handleReset}
          className='flex items-center gap-1'
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <path d='M11.0461 13.3333C12.8854 12.2842 14.0938 10.2689 14.0938 7.99998C14.0937 6.79445 13.7363 5.616 13.0665 4.61364C12.3968 3.61129 11.4448 2.83004 10.3311 2.36871C9.2173 1.90738 7.99175 1.78667 6.80939 2.02186C5.62703 2.25704 4.54096 2.83756 3.68853 3.68999C2.83609 4.54243 2.25558 5.62849 2.02039 6.81085C1.78521 7.99322 1.90591 9.21876 2.36725 10.3325C2.82858 11.4463 3.60982 12.3982 4.61218 13.068C5.61454 13.7377 6.79299 14.0952 7.99851 14.0952' stroke='#737373' strokeLinecap='round' strokeLinejoin='round'/>
            <path d='M11.0461 10.2859V13.3335H14.0938' stroke='#737373' strokeLinecap='round' strokeLinejoin='round'/>
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
                  <div className='flex size-[48px] shrink-0 items-center justify-center'>
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
