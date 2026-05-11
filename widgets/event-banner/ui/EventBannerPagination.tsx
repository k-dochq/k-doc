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
                ? 'h-2 w-6 rounded-full bg-primary-900 transition-all'
                : 'h-2 w-2 rounded bg-primary-300 transition-all hover:bg-primary-900/50'
            }
            aria-label={`페이지 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
