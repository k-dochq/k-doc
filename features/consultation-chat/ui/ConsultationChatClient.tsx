'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeader } from 'shared/ui/page-header';

interface ConsultationChatClientProps {
  lang: Locale;
  hospitalId: string;
  dict: Dictionary;
}

export function ConsultationChatClient({ lang, hospitalId, dict }: ConsultationChatClientProps) {
  return (
    <div className=''>
      <PageHeader
        lang={lang}
        title={dict.consultation?.chat || '상담채팅'}
        fallbackUrl={`/${lang}/consultation`}
        variant='light'
      />
      <div className='flex h-full items-center justify-center'>
        <div className='text-center'>
          <div className='mb-4 text-6xl'>💬</div>
          <h2 className='mb-2 text-xl font-semibold text-gray-700'>
            {dict.consultation?.chat || '상담채팅'}
          </h2>
          <p className='text-gray-500'>준비 중입니다</p>
          <p className='mt-2 text-sm text-gray-400'>병원 ID: {hospitalId}</p>
        </div>
      </div>
    </div>
  );
}
