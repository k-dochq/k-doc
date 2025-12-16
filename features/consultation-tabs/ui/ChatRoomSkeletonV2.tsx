'use client';

interface ChatRoomSkeletonV2Props {
  count?: number;
}

export function ChatRoomSkeletonV2({ count = 3 }: ChatRoomSkeletonV2Props) {
  return (
    <div className='flex flex-col gap-0 px-5'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='flex items-center gap-3 border-b border-neutral-200 py-5'>
          {/* 로고 스켈레톤 */}
          <div className='h-[46px] w-[46px] flex-shrink-0 animate-pulse rounded-full bg-neutral-200' />

          {/* 정보 영역 스켈레톤 */}
          <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
            {/* 병원명과 날짜 */}
            <div className='flex items-center gap-2'>
              <div className='h-6 w-32 animate-pulse rounded bg-neutral-200' />
              <div className='h-4 w-16 shrink-0 animate-pulse rounded bg-neutral-200' />
            </div>

            {/* 메시지 */}
            <div className='h-5 w-3/4 animate-pulse rounded bg-neutral-200' />
          </div>
        </div>
      ))}
    </div>
  );
}
