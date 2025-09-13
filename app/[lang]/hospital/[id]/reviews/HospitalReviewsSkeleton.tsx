export function HospitalReviewsSkeleton() {
  return (
    <div className='space-y-6'>
      {/* 총 개수 스켈레톤 */}
      <div className='mb-6'>
        <div className='h-5 w-32 animate-pulse rounded bg-gray-200'></div>
      </div>

      {/* 리뷰 카드 스켈레톤 */}
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
                  <div key={starIndex} className='h-4 w-4 animate-pulse rounded bg-gray-200'></div>
                ))}
              </div>
            </div>

            {/* 이미지 섹션 */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <div className='h-4 w-12 animate-pulse rounded bg-gray-200'></div>
                <div className='aspect-[4/3] animate-pulse rounded-lg bg-gray-200'></div>
              </div>
              <div className='space-y-2'>
                <div className='h-4 w-12 animate-pulse rounded bg-gray-200'></div>
                <div className='aspect-[4/3] animate-pulse rounded-lg bg-gray-200'></div>
              </div>
            </div>

            {/* 제목 */}
            <div className='h-5 w-3/4 animate-pulse rounded bg-gray-200'></div>

            {/* 시술 부위 */}
            <div className='h-4 w-24 animate-pulse rounded bg-gray-200'></div>

            {/* 내용 */}
            <div className='space-y-2'>
              <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
              <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
              <div className='h-4 w-2/3 animate-pulse rounded bg-gray-200'></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
