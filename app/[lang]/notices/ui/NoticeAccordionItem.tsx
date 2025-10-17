'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type NoticeWithFiles } from '@/entities/notice';
import { NoticeTitle } from './NoticeTitle';
import { NoticeContentSection } from './NoticeContentSection';
import { NoticeImagesSection } from './NoticeImagesSection';
import { formatDateSimple } from '@/shared/lib/date-utils';

interface NoticeAccordionItemProps {
  notice: NoticeWithFiles;
  lang: Locale;
  dict: Dictionary;
}

export function NoticeAccordionItem({ notice, lang, dict }: NoticeAccordionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='overflow-hidden rounded-xl border border-white bg-white/50 backdrop-blur-[6px]'>
      {/* 제목 섹션 */}
      <NoticeTitle
        notice={notice}
        lang={lang}
        dict={dict}
        isExpanded={isExpanded}
        onToggle={handleToggle}
      />

      {/* 펼쳐진 상태일 때 본문과 이미지 표시 */}
      {isExpanded && (
        <div className='space-y-4 px-4 pb-4'>
          {/* 본문 HTML 콘텐츠 */}
          <NoticeContentSection notice={notice} lang={lang} />

          {/* 이미지 섹션 */}
          <NoticeImagesSection notice={notice} />

          {/* 작성일 */}
          <p className='text-[13px] text-neutral-500'>{formatDateSimple(notice.createdAt, lang)}</p>
        </div>
      )}
    </div>
  );
}
