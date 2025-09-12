'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';

interface HospitalListTabsProps {
  lang: Locale;
  dict: Dictionary;
  selectedCategory: MedicalSpecialtyType | 'ALL';
  onCategoryChange: (category: MedicalSpecialtyType | 'ALL') => void;
}

// 카테고리 정의 (QuickMenu와 동일한 순서)
const CATEGORIES = [
  { id: 'ALL' as const, labels: { ko: '전체', en: 'All', th: 'ทั้งหมด' } },
  { id: 'EYES' as const, labels: { ko: '눈', en: 'Eyes', th: 'ตา' } },
  { id: 'NOSE' as const, labels: { ko: '코', en: 'Nose', th: 'จมูก' } },
  { id: 'LIFTING' as const, labels: { ko: '리프팅', en: 'Lifting', th: 'ลิฟติ้ง' } },
  {
    id: 'FACIAL_CONTOURING' as const,
    labels: { ko: '안면윤곽', en: 'Facial Contouring', th: 'แต่งหน้า' },
  },
  { id: 'BREAST' as const, labels: { ko: '가슴', en: 'Breast', th: 'หน้าอก' } },
] as const;

export function HospitalListTabs({
  lang,
  selectedCategory,
  onCategoryChange,
}: HospitalListTabsProps) {
  const getLabel = (category: (typeof CATEGORIES)[number]): string => {
    return category.labels[lang] || category.labels.ko;
  };

  return (
    <div className='w-full overflow-x-auto'>
      <div className='flex items-center gap-2 pb-2'>
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex min-w-[43px] shrink-0 items-center justify-center rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-neutral-700 text-white'
                  : 'border border-neutral-200 bg-white text-black hover:bg-neutral-50'
              } `}
            >
              <span className='leading-4'>{getLabel(category)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
