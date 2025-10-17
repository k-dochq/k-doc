'use client';

import { type Locale } from 'shared/config';
import { type NoticeWithFiles } from '@/entities/notice';
import { extractLocalizedText } from '@/shared/lib/localized-text';

interface NoticeContentSectionProps {
  notice: NoticeWithFiles;
  lang: Locale;
}

export function NoticeContentSection({ notice, lang }: NoticeContentSectionProps) {
  const content = extractLocalizedText(notice.content, lang);

  if (!content) {
    return null;
  }

  return (
    <div
      className='text-[14px] leading-[20px] text-neutral-600'
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
