export function NoticeListSkeleton() {
  return (
    <div className='space-y-4'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className='overflow-hidden rounded-xl border border-white bg-white/50 backdrop-blur-[6px]'
        >
          {/* 아코디언 헤더 스켈레톤 */}
          <div className='flex items-center gap-4 p-4'>
            {/* 제목 스켈레톤 */}
            <div className='flex-1'>
              <div className='h-6 w-3/4 animate-pulse rounded bg-white/50'></div>
            </div>

            {/* 화살표 아이콘 스켈레톤 */}
            <div className='h-6 w-6 animate-pulse rounded bg-white/50'></div>
          </div>

          {/* 아코디언 내용 스켈레톤 (펼쳐진 상태) */}
          <div className='space-y-4 px-4 pb-4'>
            {/* 본문 내용 스켈레톤 */}
            <div className='space-y-2'>
              <div className='h-4 w-full animate-pulse rounded bg-white/50'></div>
              <div className='h-4 w-5/6 animate-pulse rounded bg-white/50'></div>
              <div className='h-4 w-4/5 animate-pulse rounded bg-white/50'></div>
            </div>

            {/* 이미지 스켈레톤 */}
            <div className='space-y-4'>
              <div className='relative h-[220px] w-[220px] animate-pulse rounded-xl bg-white/50'></div>
            </div>

            {/* 작성일 스켈레톤 */}
            <div className='h-3 w-20 animate-pulse rounded bg-white/50'></div>
          </div>
        </div>
      ))}
    </div>
  );
}
