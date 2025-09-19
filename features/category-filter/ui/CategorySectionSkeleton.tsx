export function CategorySectionSkeleton() {
  return (
    <div className='w-full px-5 py-4'>
      <div className='flex gap-3 overflow-hidden'>
        {/* 카테고리 버튼 스켈레톤들 */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='flex min-w-0 flex-col items-center gap-1'>
            {/* 아이콘 영역 스켈레톤 */}
            <div className='bg-primary/10 flex h-[60px] w-[60px] items-center justify-center rounded-xl border-none'>
              <div className='h-6 w-6 animate-pulse rounded bg-white/50' />
            </div>
            {/* 라벨 영역 스켈레톤 */}
            <div className='w-full min-w-0'>
              <div className='h-3 w-12 animate-pulse rounded bg-white/50' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
