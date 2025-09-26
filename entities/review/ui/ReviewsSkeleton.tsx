'use client';

interface ReviewsSkeletonProps {
  count?: number;
  className?: string;
}

export function ReviewsSkeleton({ count = 6, className = '' }: ReviewsSkeletonProps) {
  return (
    <div className={`space-y-4 p-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='h-[460px] animate-pulse rounded-2xl bg-white/20 p-3'>
          {/* 상단: 사용자 정보 및 평점 */}
          <div className='mb-3 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              {/* 프로필 아이콘 */}
              <div className='h-6 w-6 rounded-full bg-white/50'></div>
              {/* 사용자명 + 시간 */}
              <div className='space-y-1'>
                <div className='h-3 w-14 rounded bg-white/50'></div>
                <div className='h-2 w-10 rounded bg-white/40'></div>
              </div>
            </div>
            {/* 평점 */}
            <div className='flex items-center gap-1'>
              <div className='h-3 w-3 rounded bg-white/50'></div>
              <div className='h-3 w-5 rounded bg-white/50'></div>
            </div>
          </div>

          {/* Before/After 이미지 그리드 (2x2) */}
          <div className='mb-3 grid h-64 grid-cols-2 gap-1 overflow-hidden rounded-lg'>
            {/* Before 이미지 (왼쪽 상단) */}
            <div className='relative bg-white/50'>
              <div className='absolute bottom-1 left-1 h-4 w-10 rounded bg-white/60'></div>
            </div>
            {/* After 이미지 (오른쪽 상단) */}
            <div className='relative bg-white/50'>
              <div className='absolute bottom-1 left-1 h-4 w-8 rounded bg-white/60'></div>
            </div>
            {/* Before 이미지 (왼쪽 하단) */}
            <div className='relative bg-white/50'>
              <div className='absolute bottom-1 left-1 h-4 w-10 rounded bg-white/60'></div>
            </div>
            {/* After 이미지 (오른쪽 하단) + 추가 이미지 표시 */}
            <div className='relative bg-white/50'>
              <div className='absolute bottom-1 left-1 h-4 w-8 rounded bg-white/60'></div>
              <div className='absolute right-1 bottom-1 h-4 w-5 rounded bg-white/60'></div>
            </div>
          </div>

          {/* 시술 부위 태그 */}
          <div className='mb-2 h-5 w-28 rounded bg-white/40'></div>

          {/* 날짜 및 조회수 */}
          <div className='mb-2 flex items-center justify-between'>
            <div className='h-3 w-18 rounded bg-white/50'></div>
            <div className='h-3 w-10 rounded bg-white/50'></div>
          </div>

          {/* 리뷰 텍스트 (3줄) */}
          <div className='mb-3 space-y-1'>
            <div className='h-3 w-full rounded bg-white/50'></div>
            <div className='h-3 w-5/6 rounded bg-white/50'></div>
            <div className='h-3 w-4/6 rounded bg-white/50'></div>
          </div>

          {/* 더보기 버튼 */}
          <div className='mb-3 h-3 w-6 rounded bg-white/40'></div>

          {/* 하단: 댓글 및 좋아요 */}
          <div className='flex items-center gap-4 border-t border-white/30 pt-2'>
            {/* 댓글 */}
            <div className='flex items-center gap-1'>
              <div className='h-3 w-3 rounded bg-white/50'></div>
              <div className='h-3 w-2 rounded bg-white/50'></div>
            </div>
            {/* 좋아요 */}
            <div className='flex items-center gap-1'>
              <div className='h-3 w-3 rounded bg-white/50'></div>
              <div className='h-3 w-2 rounded bg-white/50'></div>
            </div>
            {/* 더보기 메뉴 */}
            <div className='ml-auto h-3 w-3 rounded bg-white/50'></div>
          </div>
        </div>
      ))}
    </div>
  );
}
