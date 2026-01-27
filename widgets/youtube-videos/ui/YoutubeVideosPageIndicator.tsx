'use client';

export interface YoutubeVideosPageIndicatorProps {
  currentPage: number;
  totalPages: number;
  onPageClick?: (page: number) => void;
}

export function YoutubeVideosPageIndicator({
  currentPage,
  totalPages,
  onPageClick,
}: YoutubeVideosPageIndicatorProps) {
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
                ? 'h-[8px] w-[24px] rounded-full bg-primary-900 transition-all'
                : 'size-[8px] rounded-[4px] bg-primary-light transition-all hover:bg-primary-900/50'
            }
            aria-label={`페이지 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
