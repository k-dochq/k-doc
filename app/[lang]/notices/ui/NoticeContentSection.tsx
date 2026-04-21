'use client';

import { type JSONContent } from '@tiptap/core';
import { type Locale } from 'shared/config';
import { type NoticeWithFiles } from '@/entities/notice';
import { NoticeContentRenderer } from './NoticeContentRenderer';

interface NoticeContentSectionProps {
  notice: NoticeWithFiles;
  lang: Locale;
}

function extractLocalizedContent(value: unknown, locale: Locale): JSONContent | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const obj = value as Record<string, unknown>;

  const shortKey = locale === 'zh-Hant' ? 'zh' : locale;
  const candidate = obj[shortKey];
  if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
    return candidate as JSONContent;
  }

  // 번역이 없는 경우 영어로 fallback
  const fallback = obj['en'];
  if (fallback && typeof fallback === 'object' && !Array.isArray(fallback)) {
    return fallback as JSONContent;
  }

  return null;
}

export function NoticeContentSection({ notice, lang }: NoticeContentSectionProps) {
  const content = extractLocalizedContent(notice.content, lang);

  if (!content) {
    return null;
  }

  return (
    <div className='pt-5 pb-8'>
      <NoticeContentRenderer content={content} />
    </div>
  );
}
