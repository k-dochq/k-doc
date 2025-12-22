'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { SearchBarV2 } from 'shared/ui/search-bar/SearchBarV2';
import { useNotices } from '@/entities/notice/model/useNotices';
import { NoticeListV2 } from './ui/NoticeListV2';
import { NoticeListSkeletonV2 } from './ui/NoticeListSkeletonV2';
import { NoticePaginationV2 } from './ui/NoticePaginationV2';

interface NoticesContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function NoticesContentV2({ lang, dict }: NoticesContentV2Props) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어가 비어있으면 undefined로 전달하여 전체 목록 표시
  const search = searchTerm.trim() || undefined;

  const { data, isLoading, isError } = useNotices({
    page,
    limit: 3,
    search,
    lang,
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1); // 검색 시 페이지를 1로 리셋
  };

  if (isLoading) {
    return (
      <div className='px-5 pt-8 pb-20'>
        <h1 className='mb-8 text-3xl font-semibold text-neutral-700'>{dict.notices.title}</h1>
        <div className='mb-8'>
          <SearchBarV2 lang={lang} dict={dict} onSearch={handleSearch} />
        </div>
        <NoticeListSkeletonV2 />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='px-5 pt-8 pb-20'>
        <h1 className='mb-8 text-3xl font-semibold text-neutral-700'>{dict.notices.title}</h1>
        <div className='mb-8'>
          <SearchBarV2 lang={lang} dict={dict} onSearch={handleSearch} />
        </div>
        <div className='text-center text-red-500'>
          <p>{dict.notices.error}</p>
        </div>
      </div>
    );
  }

  const notices = data?.notices || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className='px-5 pt-8 pb-20'>
      <h1 className='mb-8 text-3xl font-semibold text-neutral-700'>{dict.notices.title}</h1>
      <div className='mb-8'>
        <SearchBarV2 lang={lang} dict={dict} onSearch={handleSearch} />
      </div>
      <NoticeListV2 notices={notices} lang={lang} dict={dict} />
      {totalPages > 1 && (
        <div className='mt-8'>
          <NoticePaginationV2
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}
