'use client';

import { type Locale } from 'shared/config';
import { useInfiniteNotices } from '@/entities/notice';
import { useEffect } from 'react';

interface NoticesContentProps {
  lang: Locale;
}

export function NoticesContent({ lang }: NoticesContentProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteNotices({ limit: 5 });

  // 데이터 확인을 위한 콘솔 출력
  useEffect(() => {
    if (data) {
      console.log('공지사항 데이터:', data);
      const allNotices = data.pages.flatMap((page) => page.notices);
      console.log('모든 공지사항:', allNotices);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className='text-center'>
        <p>공지사항을 불러오는 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='text-center text-red-500'>
        <p>공지사항을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  const allNotices = data?.pages.flatMap((page) => page.notices) || [];

  return (
    <div className='text-center'>
      <h1 className='mb-4 text-3xl font-bold'>
        {lang === 'ko' && '공지사항'}
        {lang === 'en' && 'Notices'}
        {lang === 'th' && 'ประกาศ'}
      </h1>

      <div className='mb-6'>
        <p className='text-gray-600'>총 {data?.pages[0]?.total || 0}개의 공지사항이 있습니다.</p>
        <p className='text-sm text-gray-500'>현재 {allNotices.length}개를 불러왔습니다.</p>
      </div>

      {/* 데이터 확인용 간단한 표시 */}
      <div className='space-y-4'>
        {allNotices.map((notice) => (
          <div key={notice.id} className='rounded border p-4 text-left'>
            <h3 className='font-semibold'>
              {lang === 'ko' &&
              notice.title &&
              typeof notice.title === 'object' &&
              'ko_KR' in notice.title
                ? (notice.title as { ko_KR: string }).ko_KR
                : '제목 없음'}
            </h3>
            <p className='text-sm text-gray-500'>
              작성일: {new Date(notice.createdAt).toLocaleDateString()}
            </p>
            <p className='text-sm'>첨부파일: {notice.NoticeFile?.length || 0}개</p>
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      {hasNextPage && (
        <div className='mt-6'>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50'
          >
            {isFetchingNextPage ? '불러오는 중...' : '더보기'}
          </button>
        </div>
      )}

      {!hasNextPage && allNotices.length > 0 && (
        <div className='mt-6 text-gray-500'>
          <p>모든 공지사항을 불러왔습니다.</p>
        </div>
      )}
    </div>
  );
}
