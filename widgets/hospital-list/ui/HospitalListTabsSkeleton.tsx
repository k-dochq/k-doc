export function HospitalListTabsSkeleton() {
  return (
    <div className='w-full'>
      <div className='flex items-center gap-2 pb-2'>
        {/* 전체 탭 스켈레톤 */}
        <div className='flex min-w-[43px] shrink-0 items-center justify-center rounded-full px-3 py-2'>
          <div className='h-4 w-8 animate-pulse rounded bg-gray-200'></div>
        </div>

        {/* 의료 전문 분야 탭들 스켈레톤 */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className='flex min-w-[43px] shrink-0 items-center justify-center rounded-full px-3 py-2'
          >
            <div className='h-4 w-12 animate-pulse rounded bg-gray-200'></div>
          </div>
        ))}
      </div>
    </div>
  );
}
