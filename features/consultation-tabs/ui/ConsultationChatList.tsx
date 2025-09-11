'use client';

import type { Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';

interface ConsultationChatListProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationChatList({ lang, dict }: ConsultationChatListProps) {
  // 임시로 빈 상태를 표시
  const isEmpty = true;

  if (isEmpty) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-center'>
        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100'>
          <svg
            className='h-8 w-8 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
            />
          </svg>
        </div>
        <h3 className='mb-2 text-lg font-medium text-gray-900'>
          {dict.consultation?.empty?.chat?.title}
        </h3>
        <p className='text-gray-500'>{dict.consultation?.empty?.chat?.description}</p>
      </div>
    );
  }

  // 실제 데이터가 있을 때의 UI (추후 구현)
  return <div className='space-y-4'>{/* 상담채팅 목록이 여기에 표시될 예정 */}</div>;
}
