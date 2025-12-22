'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type NoticeNavigationInfo } from '@/entities/notice';
import { extractLocalizedText } from '@/shared/lib/localized-text';
import { LocaleLink } from 'shared/ui/locale-link';

interface NoticeNavigationV2Props {
  previousNotice: NoticeNavigationInfo | null;
  nextNotice: NoticeNavigationInfo | null;
  lang: Locale;
  dict: Dictionary;
}

export function NoticeNavigationV2({
  previousNotice,
  nextNotice,
  lang,
  dict,
}: NoticeNavigationV2Props) {
  return (
    <div className='flex flex-col gap-10 pt-10 pb-20'>
      {/* 이전글/다음글 */}
      <div className='flex flex-col gap-[12px]'>
        {/* 이전글 */}
        {previousNotice ? (
          <LocaleLink
            href={`/notices/${previousNotice.id}`}
            className='flex cursor-pointer items-start gap-4'
          >
            <p className='text-lg font-bold text-neutral-700'>{dict.notices.previousPost}</p>
            <p className='line-clamp-2 flex-1 text-lg font-semibold text-neutral-700'>
              {extractLocalizedText(previousNotice.title, lang) || dict.notices.noTitle}
            </p>
          </LocaleLink>
        ) : (
          <div className='flex items-start gap-4'>
            <p className='text-lg font-bold text-neutral-700'>{dict.notices.previousPost}</p>
            <p className='flex-1 text-lg font-semibold text-neutral-700'>
              {dict.notices.noPreviousPost}
            </p>
          </div>
        )}

        {/* 다음글 */}
        {nextNotice ? (
          <LocaleLink
            href={`/notices/${nextNotice.id}`}
            className='flex cursor-pointer items-start gap-4'
          >
            <p className='text-lg font-bold text-neutral-700'>{dict.notices.nextPost}</p>
            <p className='line-clamp-2 flex-1 text-lg font-semibold text-neutral-700'>
              {extractLocalizedText(nextNotice.title, lang) || dict.notices.noTitle}
            </p>
          </LocaleLink>
        ) : (
          <div className='flex items-start gap-4'>
            <p className='text-lg font-bold text-neutral-700'>{dict.notices.nextPost}</p>
            <p className='flex-1 text-lg font-semibold text-neutral-700'>
              {dict.notices.noNextPost}
            </p>
          </div>
        )}
      </div>

      {/* 목록보기 버튼 */}
      <div className='flex items-center justify-center'>
        <LocaleLink
          href='/notices'
          className='bg-sub-900 hover:bg-sub-900/90 flex items-center justify-center rounded-full px-16 py-3 text-base font-semibold text-white transition-colors'
        >
          {dict.notices.viewList}
        </LocaleLink>
      </div>
    </div>
  );
}
