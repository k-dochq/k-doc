export function ChildDistrictListSkeleton() {
  return (
    <div className='flex w-[299px] flex-col items-start justify-start overflow-y-auto'>
      {/* 전체 선택 스켈레톤 */}
      <div className='flex w-full items-center gap-2 px-4 pt-4 pb-3'>
        <div className='h-4 w-4 animate-pulse rounded bg-gray-200' />
        <div className='h-4 w-20 animate-pulse rounded bg-gray-200' />
      </div>

      {/* 개별 지역 스켈레톤들 */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className='flex w-full items-center gap-2 px-5 py-3'>
          <div className='h-4 w-4 animate-pulse rounded bg-gray-200' />
          <div className='h-4 w-16 animate-pulse rounded bg-gray-200' />
        </div>
      ))}
    </div>
  );
}
