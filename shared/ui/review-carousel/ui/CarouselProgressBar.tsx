interface CarouselProgressBarProps {
  totalPages: number;
  currentPage: number;
  className?: string;
}

export function CarouselProgressBar({
  totalPages,
  currentPage,
  className = '',
}: CarouselProgressBarProps) {
  if (totalPages <= 1) {
    return null;
  }

  // 전체 진행률 계산 (0-100%)
  const progressPercentage = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className={`mt-6 flex justify-center px-5 ${className}`}>
      <div className='relative w-full'>
        {/* 배경 바 */}
        <div className='h-[3px] overflow-hidden rounded-full bg-[#FCE4FF]'>
          {/* 진행 바 */}
          <div
            className='bg-primary h-full rounded-full transition-all duration-300 ease-in-out'
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
