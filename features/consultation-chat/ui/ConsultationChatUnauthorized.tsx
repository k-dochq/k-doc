'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';

interface ConsultationChatUnauthorizedProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationChatUnauthorized({ lang, dict }: ConsultationChatUnauthorizedProps) {
  return (
    <div className='flex h-screen flex-col bg-white'>
      <PageHeaderV2
        title={dict.consultation?.chat || '상담채팅'}
        fallbackUrl={`/${lang}/consultation`}
      />
      <div className='flex flex-1 items-center justify-center'>
        <div className='text-center'>
          <div className='mb-4 text-6xl'>🔒</div>
          <h2 className='mb-2 text-xl font-semibold text-gray-700'>Login Required</h2>
          <p className='text-gray-500'>Please log in to use the consultation chat.</p>
        </div>
      </div>
    </div>
  );
}
