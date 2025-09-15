'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';

interface FavoritesHospitalsEmptyStateProps {
  lang: Locale;
  dict: Dictionary;
  className?: string;
}

export function FavoritesHospitalsEmptyState({
  lang,
  dict,
  className = '',
}: FavoritesHospitalsEmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <div className='mb-4 text-6xl'>💙</div>
      <h3 className='mb-2 text-lg font-medium text-gray-900'>
        {dict.favorites.empty.hospitals.title}
      </h3>
      <p className='mb-4 text-gray-500'>{dict.favorites.empty.hospitals.description}</p>
      <LocaleLink
        href='/hospitals'
        className='inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
      >
        병원 둘러보기
      </LocaleLink>
    </div>
  );
}
