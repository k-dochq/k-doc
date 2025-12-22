export function NoticeListSkeletonV2() {
  return (
    <div className='flex flex-col'>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={`flex flex-col gap-2 py-4 ${index === 0 ? 'border-t border-neutral-700' : ''}`}
        >
          {/* 제목 스켈레톤 */}
          <div className='h-7 w-3/4 animate-pulse rounded bg-neutral-200'></div>
          {/* 날짜 스켈레톤 */}
          <div className='h-4 w-20 animate-pulse rounded bg-neutral-200'></div>
        </div>
      ))}
    </div>
  );
}
