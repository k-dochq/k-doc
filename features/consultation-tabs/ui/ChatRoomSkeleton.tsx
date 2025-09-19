'use client';

interface ChatRoomSkeletonProps {
  count?: number;
}

export function ChatRoomSkeleton({ count = 3 }: ChatRoomSkeletonProps) {
  return (
    <div className='p-4'>
      <div className='space-y-3'>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className='flex gap-3 rounded-lg bg-white/50 p-3'>
            {/* 썸네일 스켈레톤 */}
            <div className='h-20 w-20 flex-shrink-0 animate-pulse rounded-lg bg-white/50'></div>

            {/* 텍스트 정보 스켈레톤 */}
            <div className='flex-1 space-y-2'>
              {/* 헤더 (지역, 날짜) */}
              <div className='flex items-center justify-between'>
                <div className='h-4 w-20 animate-pulse rounded bg-white/50'></div>
                <div className='h-4 w-16 animate-pulse rounded bg-white/50'></div>
              </div>

              {/* 병원명 */}
              <div className='h-6 w-32 animate-pulse rounded bg-white/50'></div>

              {/* 마지막 메시지 */}
              <div className='flex items-center justify-between'>
                <div className='h-4 w-3/4 animate-pulse rounded bg-white/50'></div>
                <div className='h-6 w-6 animate-pulse rounded-full bg-white/50'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
