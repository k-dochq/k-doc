'use client';

import { type Locale } from 'shared/config';
import { type Prisma } from '@prisma/client';
import { type Dictionary } from 'shared/model/types';
import { QuickMenuEmpty } from './QuickMenuEmpty';

interface Category {
  id: string;
  name: Prisma.JsonValue;
  categoryType: 'PART' | 'PROCEDURE';
  order: number | null;
  isActive: boolean;
}

interface QuickMenuProps {
  lang: Locale;
  dict: Dictionary;
  categories: Category[];
}

export function QuickMenu({ lang, dict, categories }: QuickMenuProps) {
  // PART 타입만 필터링하고 order 순으로 정렬
  const partCategories = categories
    .filter((category) => category.categoryType === 'PART')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // 빈 데이터 상태 처리
  if (partCategories.length === 0) {
    return <QuickMenuEmpty lang={lang} dict={dict} />;
  }

  const getCategoryName = (category: Category): string => {
    // JsonValue를 안전하게 처리
    if (!category.name || typeof category.name !== 'object' || category.name === null) {
      return 'Unknown';
    }

    const nameObj = category.name as Record<string, string>;

    switch (lang) {
      case 'ko':
        return nameObj.ko_KR || nameObj.ko || 'Unknown';
      case 'en':
        return nameObj.en_US || nameObj.en || 'Unknown';
      case 'th':
        return nameObj.th_TH || nameObj.th || 'Unknown';
      default:
        return nameObj.ko_KR || nameObj.ko || 'Unknown';
    }
  };

  return (
    <div className='w-full'>
      <div className='mb-4'>
        <h2 className='text-lg font-semibold text-gray-900'>{dict.quickMenu.title}</h2>
      </div>

      <div className='grid grid-cols-5 gap-4'>
        {partCategories.map((category) => (
          <button
            key={category.id}
            className='flex flex-col items-center space-y-2 rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-pink-300 hover:bg-pink-50'
          >
            <div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 bg-gray-100'>
              <span className='text-lg font-bold text-gray-600'>
                {getCategoryName(category).charAt(0)}
              </span>
            </div>
            <span className='text-center text-xs leading-tight font-medium text-gray-700'>
              {getCategoryName(category)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
