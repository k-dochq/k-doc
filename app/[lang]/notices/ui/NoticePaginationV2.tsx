'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NoticePaginationV2Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function NoticePaginationV2({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: NoticePaginationV2Props) {
  if (totalPages <= 1) {
    return null;
  }

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  // 최대 5개 페이지 번호 표시
  const getVisiblePages = (): number[] => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // 전체 페이지가 5개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 현재 페이지를 중심으로 앞뒤 2개씩 표시
      let start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);

      // 끝에 도달했을 때 조정
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className='flex items-center justify-center gap-3'>
      {/* 이전 버튼 */}
      <button
        type='button'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage || isLoading}
        className='flex size-[36px] items-center justify-center disabled:cursor-not-allowed disabled:opacity-50'
        aria-label='이전 페이지'
      >
        <ChevronLeft className='h-6 w-6 text-neutral-400' />
      </button>

      {/* 페이지 번호 버튼 */}
      <div className='flex items-center gap-1.5'>
        {visiblePages.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type='button'
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              className={`flex size-[36px] items-center justify-center rounded-lg text-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                isActive ? 'bg-[#7657ff] text-white' : 'text-neutral-700 hover:bg-neutral-100'
              }`}
              aria-label={`페이지 ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* 다음 버튼 */}
      <button
        type='button'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage || isLoading}
        className='flex size-[36px] items-center justify-center disabled:cursor-not-allowed disabled:opacity-50'
        aria-label='다음 페이지'
      >
        <ChevronRight className='h-6 w-6 text-neutral-400' />
      </button>
    </div>
  );
}
