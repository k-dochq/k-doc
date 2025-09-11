'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialty } from '../api/entities/types';
import { QuickMenuEmpty } from './QuickMenuEmpty';

interface QuickMenuProps {
  lang: Locale;
  dict: Dictionary;
  categories: MedicalSpecialty[];
}

export function QuickMenu({ lang, dict, categories }: QuickMenuProps) {
  // 빈 데이터 상태 처리
  if (categories.length === 0) {
    return <QuickMenuEmpty lang={lang} dict={dict} />;
  }

  const getCategoryName = (category: MedicalSpecialty): string => {
    // JsonValue를 안전하게 처리
    if (!category.name || typeof category.name !== 'object' || category.name === null) {
      return 'Unknown';
    }

    const nameObj = category.name as Record<string, string>;

    switch (lang) {
      case 'ko':
        return nameObj.ko_KR || nameObj.ko || 'Unknown';
      case 'en':
        return nameObj.en_US || nameObj.en || nameObj.ko_KR;
      case 'th':
        return nameObj.th_TH || nameObj.th || nameObj.ko_KR;
      default:
        return nameObj.ko_KR || nameObj.ko || nameObj.ko_KR;
    }
  };

  return (
    <div className='w-full'>
      <div className='grid grid-cols-5 gap-4'>
        {categories.map((category) => (
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
