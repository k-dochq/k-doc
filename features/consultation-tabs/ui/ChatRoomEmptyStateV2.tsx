'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ExclamationIcon } from 'shared/ui/icons';

interface ChatRoomEmptyStateV2Props {
  lang: Locale;
  dict: Dictionary;
  className?: string;
  title?: string;
  description?: string;
}

export function ChatRoomEmptyStateV2({
  lang,
  dict,
  className = '',
  title,
  description,
}: ChatRoomEmptyStateV2Props) {
  return (
    <div
      className={`flex min-h-[70vh] flex-col items-center justify-center gap-3 px-5 py-0 text-center ${className}`}
    >
      {/* 느낌표 아이콘 */}
      <ExclamationIcon size={42} />

      {/* 텍스트 영역 */}
      <div className='flex flex-col items-center gap-1 text-center'>
        {/* 제목 */}
        <p className='w-full text-lg leading-7 font-semibold text-[#404040]'>
          {title || dict.consultation?.empty?.chat?.title || '진행 중인 상담이 없어요'}
        </p>

        {/* 설명 */}
        <p className='w-full text-sm leading-5 text-[#a3a3a3]'>
          {description ||
            dict.consultation?.empty?.chat?.description ||
            '궁금한 시술이나 병원에 상담을 시작해보세요'}
        </p>
      </div>
    </div>
  );
}
