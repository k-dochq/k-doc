'use client';

export interface EventBannerMainPaginationV2Props {
  currentPage: number;
  totalPages: number;
}

export function EventBannerMainPaginationV2({
  currentPage,
  totalPages,
}: EventBannerMainPaginationV2Props) {
  return (
    <div className='absolute bottom-2.5 z-10' style={{ right: 'calc((100% - 82.67%) / 2 + 16px)' }}>
      <div className='flex items-center gap-0.5 rounded-full bg-[rgba(64,64,64,0.6)] px-2 py-0.5'>
        <span className='shrink-0 text-xs leading-4 text-white'>{currentPage + 1}</span>
        <span className='shrink-0 text-xs leading-4 text-white'>/</span>
        <span className='shrink-0 text-xs leading-4 text-white'>{totalPages}</span>
      </div>
    </div>
  );
}
