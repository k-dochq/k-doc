'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type NoticeWithFiles } from '@/entities/notice';
import { NoticeListItemV2 } from './NoticeListItemV2';

interface NoticeListV2Props {
  notices: NoticeWithFiles[];
  lang: Locale;
  dict: Dictionary;
}

export function NoticeListV2({ notices, lang, dict }: NoticeListV2Props) {
  if (notices.length === 0) {
    return (
      <div className='py-8 text-center'>
        <p className='text-gray-500'>{dict.notices.empty}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      {notices.map((notice, index) => (
        <NoticeListItemV2
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
