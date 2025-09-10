'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText } from 'shared/lib';
import { type MedicalSpecialtyOption } from 'entities/review';

interface MedicalSpecialtyFilterProps {
  specialties: MedicalSpecialtyOption[];
  selectedSpecialtyId?: string;
  onSpecialtyChange: (specialtyId?: string) => void;
  lang: Locale;
  dict: Dictionary;
}

export function MedicalSpecialtyFilter({
  specialties,
  selectedSpecialtyId,
  onSpecialtyChange,
  lang,
  dict,
}: MedicalSpecialtyFilterProps) {
  const handleFilterChange = (specialtyId?: string) => {
    onSpecialtyChange(specialtyId);
  };

  return (
    <div className='space-y-3'>
      <h3 className='text-sm font-medium text-gray-900'>
        {dict.allReviews?.filter?.specialty || '부위별'}
      </h3>

      <div className='flex flex-wrap gap-2'>
        {/* 전체 옵션 */}
        <button
          onClick={() => handleFilterChange(undefined)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !selectedSpecialtyId
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {dict.allReviews?.filter?.all || '전체'}
        </button>

        {/* 부위별 옵션 */}
        {specialties.map((specialty) => {
          const specialtyName = extractLocalizedText(specialty.name, lang);
          const isSelected = selectedSpecialtyId === specialty.id;

          return (
            <button
              key={specialty.id}
              onClick={() => handleFilterChange(specialty.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {specialtyName}
            </button>
          );
        })}
      </div>
    </div>
  );
}
