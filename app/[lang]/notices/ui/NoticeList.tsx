'use client';

import { useState } from 'react';
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
  // 첫 번째 공지사항을 기본으로 펼침
  const [expandedId, setExpandedId] = useState<string | null>(
    notices.length > 0 ? notices[0].id : null,
  );

  if (notices.length === 0) {
    return (
      <div className='py-8 text-center'>
        <p className='text-gray-500'>{dict.notices.empty}</p>
      </div>
    );
  }

  const handleToggle = (noticeId: string) => {
    setExpandedId(expandedId === noticeId ? null : noticeId);
  };

  return (
    <div className='space-y-4'>
      {notices.map((notice) => (
        <NoticeAccordionItem
          key={notice.id}
          notice={notice}
          lang={lang}
          dict={dict}
          isExpanded={expandedId === notice.id}
          onToggle={() => handleToggle(notice.id)}
        />
      ))}
    </div>
  );
}
