'use client';

import dayjs from 'dayjs';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type NoticeWithFiles } from '@/entities/notice';
import { extractLocalizedText } from '@/shared/lib/localized-text';
import { LocaleLink } from 'shared/ui/locale-link';

interface NoticeListItemV2Props {
  notice: NoticeWithFiles;
  lang: Locale;
  dict: Dictionary;
  isFirst?: boolean;
}

export function NoticeListItemV2({ notice, lang, dict, isFirst = false }: NoticeListItemV2Props) {
  const title = extractLocalizedText(notice.title, lang) || dict.notices.noTitle;
  const date = dayjs(notice.createdAt).format('YYYY-MM-DD');

  return (
    <LocaleLink
      href={`/notices/${notice.id}`}
      className={`flex cursor-pointer flex-col gap-2 border-b border-b-neutral-200 py-4 ${isFirst ? 'border-t border-t-neutral-700' : ''}`}
    >
      <p className='line-clamp-2 text-lg font-semibold text-neutral-700'>{title}</p>
      <p className='text-sm text-neutral-400'>{date}</p>
    </LocaleLink>
  );
}
