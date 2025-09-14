'use client';

interface ReviewsSkeletonProps {
  count?: number;
  className?: string;
}

export function ReviewsSkeleton({ count = 6, className = '' }: ReviewsSkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='animate-pulse rounded-lg border border-gray-200 bg-white p-4'>
          {/* Before/After 이미지 영역 */}
          <div className='mb-3 h-48 rounded-lg bg-gray-200'></div>

          {/* 사용자 정보 및 평점 영역 */}
          <div className='mb-2 flex items-center justify-between'>
            <div className='h-4 w-24 rounded bg-gray-200'></div>
            <div className='h-4 w-16 rounded bg-gray-200'></div>
          </div>

          {/* 리뷰 텍스트 영역 */}
          <div className='mb-2 h-3 w-3/4 rounded bg-gray-200'></div>
          <div className='mb-2 h-3 w-1/2 rounded bg-gray-200'></div>

          {/* 해시태그 영역 */}
          <div className='mb-2 h-3 w-1/4 rounded bg-gray-200'></div>

          {/* 병원 정보 영역 */}
          <div className='h-3 w-1/3 rounded bg-gray-200'></div>
        </div>
      ))}
    </div>
  );
}
