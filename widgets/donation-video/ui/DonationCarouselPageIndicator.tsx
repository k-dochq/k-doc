'use client';

export interface DonationCarouselPageIndicatorProps {
  currentPage: number;
  totalPages: number;
  onPageClick?: (page: number) => void;
}

const ACTIVE_COLOR = '#0B99FF';
const INACTIVE_COLOR = '#D0EBFF';

export function DonationCarouselPageIndicator({
  currentPage,
  totalPages,
  onPageClick,
}: DonationCarouselPageIndicatorProps) {
  return (
    <div className='mt-[60px] flex justify-center'>
      <div className='flex items-center gap-2'>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            type='button'
            onClick={() => onPageClick?.(index)}
            className={
              index === currentPage
                ? 'h-[8px] w-[24px] rounded-full transition-all'
                : 'size-[8px] rounded-[4px] transition-all hover:opacity-80'
            }
            style={{
              backgroundColor: index === currentPage ? ACTIVE_COLOR : INACTIVE_COLOR,
            }}
            aria-label={`페이지 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
