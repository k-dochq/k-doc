'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeader } from 'shared/ui/page-header';

interface ConsultationChatErrorProps {
  lang: Locale;
  dict: Dictionary;
  error: string;
}

export function ConsultationChatError({ lang, dict, error }: ConsultationChatErrorProps) {
  return (
    <div className='flex h-screen flex-col'>
      <PageHeader
        lang={lang}
        title={dict.consultation?.chat || '상담채팅'}
        fallbackUrl={`/${lang}/consultation`}
        variant='light'
      />
      <div className='flex flex-1 items-center justify-center'>
        <div className='text-center'>
          <div className='mb-4 text-6xl'>❌</div>
          <h2 className='mb-2 text-xl font-semibold text-gray-700'>오류가 발생했습니다</h2>
          <p className='text-gray-500'>{error}</p>
        </div>
      </div>
    </div>
  );
}
