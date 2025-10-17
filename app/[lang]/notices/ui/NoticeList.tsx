'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type NoticeWithFiles } from '@/entities/notice';
import { NoticeAccordionItem } from './NoticeAccordionItem';

interface NoticeListProps {
  notices: NoticeWithFiles[];
  lang: Locale;
  dict: Dictionary;
}

export function NoticeList({ notices, lang, dict }: NoticeListProps) {
  if (notices.length === 0) {
    return (
      <div className='py-8 text-center'>
        <p className='text-gray-500'>{dict.notices.empty}</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {notices.map((notice, index) => (
        <NoticeAccordionItem
          key={notice.id}
          notice={notice}
          lang={lang}
          dict={dict}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}
