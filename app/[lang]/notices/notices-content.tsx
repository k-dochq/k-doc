'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useInfiniteNotices } from '@/entities/notice';
import { NoticeList } from './ui/NoticeList';
import { NoticeListSkeleton } from './ui/NoticeListSkeleton';

interface NoticesContentProps {
  lang: Locale;
  dict: Dictionary;
}

export function NoticesContent({ lang, dict }: NoticesContentProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteNotices({ limit: 5 });

  if (isLoading) {
    return <NoticeListSkeleton />;
  }

  if (isError) {
    return (
      <div className='text-center text-red-500'>
        <p>{dict.notices.error}</p>
      </div>
    );
  }

  const allNotices = data?.pages.flatMap((page) => page.notices) || [];

  return (
    <div className=''>
      {/* 공지사항 리스트 */}
      <NoticeList notices={allNotices} lang={lang} dict={dict} />

      {/* 더보기 버튼 */}
      {hasNextPage && (
        <div className='mt-6'>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className='rounded-lg bg-gray-100 px-6 py-3 text-gray-600 transition-colors hover:bg-gray-200 disabled:opacity-50'
          >
            {isFetchingNextPage ? dict.notices.loadingMore : dict.notices.loadMore}
          </button>
        </div>
      )}
    </div>
  );
}
