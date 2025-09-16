'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { extractLocalizedText } from 'shared/lib';
import { ArrowLeft } from 'lucide-react';
import { LocaleLink } from 'shared/ui/locale-link';

interface ConsultationRequestFormProps {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationRequestForm({ hospital, lang, dict }: ConsultationRequestFormProps) {
  const hospitalName = extractLocalizedText(hospital.name, lang) || '병원';

  return (
    <div className='mx-auto max-w-2xl'>
      {/* 헤더 */}
      <div className='mb-6 flex items-center space-x-4'>
        <LocaleLink
          href={`/hospital/${hospital.id}`}
          locale={lang}
          className='flex items-center text-gray-600 hover:text-gray-800'
        >
          <ArrowLeft className='mr-2 h-5 w-5' />
          {hospitalName}
        </LocaleLink>
      </div>

      <div className='rounded-lg bg-white p-6 shadow-md'>
        <h1 className='mb-6 text-2xl font-bold text-gray-900'>
          {dict.consultation?.request?.title || '상담신청'}
        </h1>

        <div className='space-y-6'>
          <p className='text-gray-600'>상담신청 폼이 준비 중입니다. 곧 업데이트될 예정입니다.</p>
        </div>
      </div>
    </div>
  );
}
