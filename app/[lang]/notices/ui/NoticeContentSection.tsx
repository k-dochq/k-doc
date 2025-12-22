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

  // 빈 p 태그를 &nbsp;가 포함된 p 태그로 변환
  const processedContent = content.replace(/<p><\/p>/g, '<p>&nbsp;</p>');

  return (
    <div
      className='pt-5 pb-8 text-[14px] leading-[20px] text-neutral-600'
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
