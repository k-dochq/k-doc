export function CategorySectionSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        {/* 전체 카테고리 스켈레톤 */}
        <div className='flex h-16 w-16 flex-col items-center justify-center space-y-2 rounded-xl border border-gray-200 bg-white'>
          <div className='h-6 w-6 animate-pulse rounded bg-gray-200' />
          <div className='h-3 w-8 animate-pulse rounded bg-gray-200' />
        </div>

        {/* 각 카테고리 스켈레톤 */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='flex h-16 w-16 flex-col items-center justify-center space-y-2 rounded-xl border border-gray-200 bg-white'
          >
            <div className='h-6 w-6 animate-pulse rounded bg-gray-200' />
            <div className='h-3 w-8 animate-pulse rounded bg-gray-200' />
          </div>
        ))}
      </div>
    </div>
  );
}
