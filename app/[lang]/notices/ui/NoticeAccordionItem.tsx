'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type NoticeWithFiles } from '@/entities/notice';
import { NoticeTitle } from './NoticeTitle';

interface NoticeAccordionItemProps {
  notice: NoticeWithFiles;
  lang: Locale;
  dict: Dictionary;
}

export function NoticeAccordionItem({ notice, lang, dict }: NoticeAccordionItemProps) {
  return (
    <div className='overflow-hidden rounded-xl border border-white bg-white/50 backdrop-blur-[6px]'>
      {/* 제목 섹션 */}
      <NoticeTitle notice={notice} lang={lang} dict={dict} />
    </div>
  );
}
