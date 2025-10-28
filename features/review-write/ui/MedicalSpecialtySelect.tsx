'use client';

import { ChevronDown } from 'lucide-react';
import { type Prisma } from '@prisma/client';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { type Locale } from 'shared/config';

interface MedicalSpecialty {
  id: string;
  name: unknown;
  specialtyType: string;
}

interface MedicalSpecialtySelectProps {
  specialties: MedicalSpecialty[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  error?: string;
  lang: Locale;
}

export function MedicalSpecialtySelect({
  specialties,
  value,
  onChange,
  label,
  placeholder,
  error,
  lang,
}: MedicalSpecialtySelectProps) {
  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-gray-900'>{label}</label>
      <div className='relative'>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='w-full appearance-none rounded-xl border-2 border-[#FF60F7] bg-white px-4 py-3 pr-10 text-gray-900 transition-colors focus:border-[#DA47EF] focus:outline-none'
        >
          <option value=''>{placeholder}</option>
          {specialties.map((specialty) => (
            <option key={specialty.id} value={specialty.id}>
              {extractLocalizedText(specialty.name as Prisma.JsonValue, lang)}
            </option>
          ))}
        </select>
        <ChevronDown
          className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400'
          size={20}
        />
      </div>
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
}
