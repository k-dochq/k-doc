'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeader } from 'shared/ui/page-header';

interface ConsultationChatLoadingProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationChatLoading({ lang, dict }: ConsultationChatLoadingProps) {
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
          <div className='mb-4 text-6xl'>💬</div>
          <p className='text-gray-500'>로딩 중...</p>
        </div>
      </div>
    </div>
  );
}
