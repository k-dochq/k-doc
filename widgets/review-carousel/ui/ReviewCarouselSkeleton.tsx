export function ReviewCarouselSkeleton() {
  return (
    <div className='w-full'>
      <div className='mb-4'>
        <div className='h-6 w-32 animate-pulse rounded bg-gray-200'></div>
      </div>
      <div className='flex space-x-4 overflow-hidden'>
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className='flex w-[85%] flex-shrink-0 flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm'
          >
            {/* 헤더 스켈레톤 */}
            <div className='mb-3 flex items-center justify-between'>
              <div className='flex items-center space-x-1'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className='h-4 w-4 animate-pulse rounded bg-gray-200'></div>
                ))}
              </div>
              <div className='h-6 w-12 animate-pulse rounded-full bg-gray-200'></div>
            </div>

            {/* 이미지 스켈레톤 */}
            <div className='mb-3'>
              <div className='aspect-[4/3] animate-pulse rounded-lg bg-gray-200'></div>
            </div>

            {/* 제목 스켈레톤 */}
            <div className='mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>

            {/* 태그 스켈레톤 */}
            <div className='mb-2 h-6 w-20 animate-pulse rounded-full bg-gray-200'></div>

            {/* 내용 스켈레톤 */}
            <div className='mb-3 flex-1 space-y-2'>
              <div className='h-3 w-full animate-pulse rounded bg-gray-200'></div>
              <div className='h-3 w-4/5 animate-pulse rounded bg-gray-200'></div>
              <div className='h-3 w-3/5 animate-pulse rounded bg-gray-200'></div>
              <div className='h-3 w-2/3 animate-pulse rounded bg-gray-200'></div>
            </div>

            {/* 푸터 스켈레톤 */}
            <div className='flex items-center justify-between'>
              <div className='h-3 w-16 animate-pulse rounded bg-gray-200'></div>
              <div className='h-3 w-20 animate-pulse rounded bg-gray-200'></div>
            </div>

            {/* 시술 분야 스켈레톤 */}
            <div className='mt-2 h-3 w-24 animate-pulse rounded bg-gray-200'></div>
          </div>
        ))}
      </div>
    </div>
  );
}
