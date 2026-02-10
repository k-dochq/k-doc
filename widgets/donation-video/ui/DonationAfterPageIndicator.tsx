'use client';

interface DonationAfterPageIndicatorProps {
  totalPages: number;
  currentPage: number;
  className?: string;
}

export function DonationAfterPageIndicator({
  totalPages,
  currentPage,
  className = '',
}: DonationAfterPageIndicatorProps) {
  if (totalPages <= 1) {
    return null;
  }

  const progressPercentage = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className={`flex justify-center ${className}`}>
      <div className='relative w-full'>
        <div className='h-[3px] overflow-hidden rounded-full bg-neutral-300'>
          <div
            className='h-full rounded-full bg-neutral-500 transition-all duration-300 ease-in-out'
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
