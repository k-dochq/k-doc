'use client';

import { formatDateSimple } from 'shared/lib/date-utils';
import { type Locale } from 'shared/config';

interface ChatRoomHeaderProps {
  districtName: string;
  lastMessageDate?: string;
  lang: Locale;
}

export function ChatRoomHeader({ districtName, lastMessageDate, lang }: ChatRoomHeaderProps) {
  return (
    <div className='flex items-center justify-between'>
      <span className='text-sm font-medium text-neutral-500'>
        {districtName ? `지역 | ${districtName}` : '지역'}
      </span>
      {lastMessageDate && (
        <span className='text-xs text-neutral-400'>{formatDateSimple(lastMessageDate, lang)}</span>
      )}
    </div>
  );
}
