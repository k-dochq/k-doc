export function AllReviewsSkeleton() {
  return (
    <div className='space-y-6'>
      {/* 필터 섹션 스켈레톤 */}
      <div className='rounded-lg border border-gray-200 bg-white p-4'>
        {/* 부위별 필터 스켈레톤 */}
        <div className='space-y-3'>
          <div className='h-5 w-16 animate-pulse rounded bg-gray-200'></div>
          <div className='flex flex-wrap gap-2'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className='h-8 w-16 animate-pulse rounded-full bg-gray-200'></div>
            ))}
          </div>
        </div>

        {/* 정렬 옵션 스켈레톤 */}
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='h-4 w-24 animate-pulse rounded bg-gray-200'></div>
          <div className='flex space-x-2'>
            <div className='h-8 w-16 animate-pulse rounded-lg bg-gray-200'></div>
            <div className='h-8 w-16 animate-pulse rounded-lg bg-gray-200'></div>
          </div>
        </div>
      </div>

      {/* 리뷰 카드 스켈레톤 */}
      <div className='space-y-6'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
            <div className='space-y-4'>
              {/* 사용자 정보 및 평점 */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='h-10 w-10 animate-pulse rounded-full bg-gray-200'></div>
                  <div className='space-y-1'>
                    <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
                    <div className='h-3 w-16 animate-pulse rounded bg-gray-200'></div>
                  </div>
                </div>
                <div className='flex items-center space-x-1'>
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <div
                      key={starIndex}
                      className='h-4 w-4 animate-pulse rounded bg-gray-200'
                    ></div>
                  ))}
                </div>
              </div>

              {/* 병원 정보 */}
              <div className='space-y-2'>
                <div className='h-4 w-32 animate-pulse rounded bg-gray-200'></div>
                <div className='h-3 w-24 animate-pulse rounded bg-gray-200'></div>
              </div>

              {/* 이미지 섹션 */}
              <div className='flex space-x-4 overflow-hidden'>
                <div className='w-[85%] flex-shrink-0 space-y-2'>
                  <div className='h-3 w-12 animate-pulse rounded bg-gray-200'></div>
                  <div className='aspect-[4/3] w-full animate-pulse rounded-lg bg-gray-200'></div>
                </div>
                <div className='w-[85%] flex-shrink-0 space-y-2'>
                  <div className='h-3 w-12 animate-pulse rounded bg-gray-200'></div>
                  <div className='aspect-[4/3] w-full animate-pulse rounded-lg bg-gray-200'></div>
                </div>
              </div>

              {/* 제목 및 내용 */}
              <div className='space-y-3'>
                <div className='h-5 w-3/4 animate-pulse rounded bg-gray-200'></div>
                <div className='space-y-2'>
                  <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
                  <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
                  <div className='h-4 w-2/3 animate-pulse rounded bg-gray-200'></div>
                </div>
              </div>

              {/* 부위 정보 */}
              <div className='h-6 w-16 animate-pulse rounded-full bg-gray-200'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
