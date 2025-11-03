'use client';

export interface EventBannerPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageClick?: (page: number) => void;
}

export function EventBannerPagination({
  currentPage,
  totalPages,
  onPageClick,
}: EventBannerPaginationProps) {
  return (
    <div className='mt-4 flex justify-center'>
      <div className='flex items-center gap-2'>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            type='button'
            onClick={() => onPageClick?.(index)}
            className={
              index === currentPage
                ? 'h-2 w-6 rounded-full bg-[#DA47EF] transition-all'
                : 'h-2 w-2 rounded bg-[#F9D1FF] transition-all hover:bg-[#DA47EF]/50'
            }
            aria-label={`페이지 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
