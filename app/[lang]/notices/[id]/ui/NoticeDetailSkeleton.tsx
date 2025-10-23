export function NoticeDetailSkeleton() {
  return (
    <div className='space-y-6'>
      {/* 공지사항 내용 스켈레톤 */}
      <div className='overflow-hidden rounded-xl border border-white bg-white/50 backdrop-blur-[6px]'>
        <div className='space-y-4 px-4 py-4'>
          {/* 제목 스켈레톤 */}
          <div className='h-7 w-4/5 animate-pulse rounded bg-white/50'></div>

          {/* 본문 내용 스켈레톤 */}
          <div className='space-y-3'>
            <div className='h-4 w-full animate-pulse rounded bg-white/50'></div>
            <div className='h-4 w-5/6 animate-pulse rounded bg-white/50'></div>
            <div className='h-4 w-4/5 animate-pulse rounded bg-white/50'></div>
            <div className='h-4 w-3/4 animate-pulse rounded bg-white/50'></div>
            <div className='h-4 w-5/6 animate-pulse rounded bg-white/50'></div>
            <div className='h-4 w-2/3 animate-pulse rounded bg-white/50'></div>
          </div>

          {/* 작성일 스켈레톤 */}
          <div className='h-3 w-20 animate-pulse rounded bg-white/50'></div>
        </div>
      </div>
    </div>
  );
}
