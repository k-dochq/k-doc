'use client';

import { Search } from 'lucide-react';
import { type Locale } from 'shared/config';

interface SearchBarProps {
  lang: Locale;
}

export function SearchBar({ lang }: SearchBarProps) {
  const messages = {
    ko: {
      placeholder: '병원, 의사, 시술 부위를 검색해보세요',
    },
    en: {
      placeholder: 'Search hospitals, doctors, procedures',
    },
    th: {
      placeholder: 'ค้นหาโรงพยาบาล แพทย์ และขั้นตอนการรักษา',
    },
  };

  const dict = messages[lang];

  return (
    <div className='w-full'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
          <Search className='h-5 w-5 text-gray-400' />
        </div>
        <input
          type='text'
          placeholder={dict.placeholder}
          className='w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-10 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
        />
      </div>
    </div>
  );
}
