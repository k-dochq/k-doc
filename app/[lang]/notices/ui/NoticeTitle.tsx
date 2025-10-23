'use client';

import { ChevronRight } from 'lucide-react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type NoticeWithFiles } from '@/entities/notice';
import { extractLocalizedText } from '@/shared/lib/localized-text';
import { LocaleLink } from 'shared/ui/locale-link';

interface NoticeTitleProps {
  notice: NoticeWithFiles;
  lang: Locale;
  dict: Dictionary;
}

export function NoticeTitle({ notice, lang, dict }: NoticeTitleProps) {
  const title = extractLocalizedText(notice.title, lang);

  return (
    <LocaleLink
      href={`/notices/${notice.id}`}
      className='flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-white/10'
    >
      {/* 제목 */}
      <p className='flex-1 text-[16px] leading-[24px] font-bold text-[#da47ef]'>
        {title || dict.notices.noTitle}
      </p>

      {/* 화살표 아이콘 */}
      <div className='flex shrink-0 items-center justify-center'>
        <ChevronRight className='h-6 w-6 text-[#da47ef]' />
      </div>
    </LocaleLink>
  );
}
