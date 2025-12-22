'use client';

import dayjs from 'dayjs';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useNoticeDetail } from '@/entities/notice';
import { extractLocalizedText } from '@/shared/lib/localized-text';
import { NoticeContentSection } from '../ui/NoticeContentSection';
import { NoticeImagesSection } from '../ui/NoticeImagesSection';
import { NoticeDetailSkeleton } from './ui/NoticeDetailSkeleton';
import { NoticeNavigationV2 } from './ui/NoticeNavigationV2';

interface NoticeDetailContentV2Props {
  noticeId: string;
  lang: Locale;
  dict: Dictionary;
}

function NoticeDetailInnerV2({ noticeId, lang, dict }: NoticeDetailContentV2Props) {
  const { data: notice, isLoading, error } = useNoticeDetail(noticeId);

  if (isLoading) {
    return (
      <div className='px-5'>
        <NoticeDetailSkeleton />
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className='px-5'>
        <div className='py-8 text-center'>
          <p className='text-red-500'>{dict.notices.error}</p>
        </div>
      </div>
    );
  }

  const title = extractLocalizedText(notice.title, lang) || dict.notices.noTitle;
  const date = dayjs(notice.createdAt).format('YYYY-MM-DD');

  return (
    <div className='px-5'>
      {/* 타이틀 섹션 */}
      <div className='flex flex-col gap-4 border-b border-neutral-700 pt-8 pb-5'>
        <h1 className='text-2xl leading-8 font-semibold text-neutral-700'>{title}</h1>
        <p className='text-base leading-6 text-neutral-400'>{date}</p>
      </div>

      {/* 본문 섹션 */}
      <div className='space-y-6 border-b border-neutral-200 pb-5'>
        {/* 본문 HTML 콘텐츠 */}
        <NoticeContentSection notice={notice} lang={lang} />
        {/* 이미지 섹션 */}
        <NoticeImagesSection notice={notice} />
      </div>

      {/* 네비게이션 섹션 */}
      <NoticeNavigationV2
        previousNotice={notice.previousNotice || null}
        nextNotice={notice.nextNotice || null}
        lang={lang}
        dict={dict}
      />
    </div>
  );
}

export function NoticeDetailContentV2({ noticeId, lang, dict }: NoticeDetailContentV2Props) {
  return <NoticeDetailInnerV2 noticeId={noticeId} lang={lang} dict={dict} />;
}
