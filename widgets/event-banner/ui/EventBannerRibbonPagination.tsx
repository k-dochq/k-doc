'use client';

export interface EventBannerRibbonPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function EventBannerRibbonPagination({
  currentPage,
  totalPages,
}: EventBannerRibbonPaginationProps) {
  return (
    <div className='absolute right-2 bottom-2 z-10'>
      <div className='flex items-center gap-0.5 rounded-full bg-[rgba(64,64,64,0.6)] px-2 py-0.5'>
        <span className='shrink-0 text-xs leading-4 text-white'>{currentPage + 1}</span>
        <span className='shrink-0 text-xs leading-4 text-white'>/</span>
        <span className='shrink-0 text-xs leading-4 text-white'>{totalPages}</span>
      </div>
    </div>
  );
}
