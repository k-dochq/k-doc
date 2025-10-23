'use client';

import { Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useNoticeDetail } from '@/entities/notice';
import { LocaleLink } from 'shared/ui/locale-link';
import { extractLocalizedText } from '@/shared/lib/localized-text';
import { NoticeContentSection } from '../ui/NoticeContentSection';
import { NoticeImagesSection } from '../ui/NoticeImagesSection';
import { formatDateSimple } from '@/shared/lib/date-utils';
import { NoticeDetailSkeleton } from './ui/NoticeDetailSkeleton';

interface NoticeDetailContentProps {
  noticeId: string;
  lang: Locale;
  dict: Dictionary;
}

function NoticeDetailInner({ noticeId, lang, dict }: NoticeDetailContentProps) {
  const { data: notice } = useNoticeDetail(noticeId);

  return (
    <div className='space-y-6'>
      {/* 뒤로가기 버튼 */}
      <LocaleLink
        href='/notices'
        className='inline-flex items-center gap-2 text-[#da47ef] transition-colors hover:text-[#c73de0]'
      >
        <ArrowLeft className='h-5 w-5' />
        <span className='text-sm font-medium'>{dict.notices.backToList}</span>
      </LocaleLink>

      {/* 공지사항 내용 */}
      <div className='overflow-hidden rounded-xl border border-white bg-white/50 backdrop-blur-[6px]'>
        <div className='space-y-4 px-4 py-4'>
          {/* 제목 */}
          <h1 className='text-[18px] leading-[26px] font-bold text-[#da47ef]'>
            {extractLocalizedText(notice.title, lang) || '제목 없음'}
          </h1>

          {/* 본문 HTML 콘텐츠 */}
          <NoticeContentSection notice={notice} lang={lang} />

          {/* 이미지 섹션 */}
          <NoticeImagesSection notice={notice} />

          {/* 작성일 */}
          <p className='text-[13px] text-neutral-500'>{formatDateSimple(notice.createdAt, lang)}</p>
        </div>
      </div>
    </div>
  );
}

export function NoticeDetailContent({ noticeId, lang, dict }: NoticeDetailContentProps) {
  return (
    <Suspense fallback={<NoticeDetailSkeleton />}>
      <NoticeDetailInner noticeId={noticeId} lang={lang} dict={dict} />
    </Suspense>
  );
}
