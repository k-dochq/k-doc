'use client';

export interface EventBannerPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function EventBannerPagination({ currentPage, totalPages }: EventBannerPaginationProps) {
  return (
    <div className='mt-4 flex justify-center'>
      <div className='flex items-center gap-2'>
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={
              index === currentPage
                ? 'h-2 w-6 rounded-full bg-[#DA47EF]'
                : 'h-2 w-2 rounded bg-[#F9D1FF]'
            }
          />
        ))}
      </div>
    </div>
  );
}
