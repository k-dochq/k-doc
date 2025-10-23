'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type NoticeWithFiles } from '@/entities/notice';
import { NoticeTitle } from './NoticeTitle';
import { NoticeContentSection } from './NoticeContentSection';
import { NoticeImagesSection } from './NoticeImagesSection';

interface NoticeAccordionItemProps {
  notice: NoticeWithFiles;
  lang: Locale;
  dict: Dictionary;
  isExpanded: boolean;
  onToggle: () => void;
}

export function NoticeAccordionItem({
  notice,
  lang,
  dict,
  isExpanded,
  onToggle,
}: NoticeAccordionItemProps) {
  return (
    <div className='overflow-hidden rounded-xl border border-white bg-white/50 backdrop-blur-[6px]'>
      {/* 제목 섹션 */}
      <NoticeTitle
        notice={notice}
        lang={lang}
        dict={dict}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />

      {/* 펼쳐진 내용 */}
      {isExpanded && (
        <div className='space-y-4 border-t border-gray-200 p-4'>
          <NoticeContentSection notice={notice} lang={lang} />
          <NoticeImagesSection notice={notice} />
        </div>
      )}
    </div>
  );
}
