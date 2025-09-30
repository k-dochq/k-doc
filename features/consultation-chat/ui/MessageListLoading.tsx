'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface MessageListLoadingProps {
  lang: Locale;
  dict: Dictionary;
}

export function MessageListLoading({ lang, dict }: MessageListLoadingProps) {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <div className='text-neutral-500'>
        {dict.consultation?.loadingMessages || '메시지를 불러오는 중...'}
      </div>
    </div>
  );
}
