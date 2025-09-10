export function HospitalDetailSkeleton() {
  return (
    <div className='space-y-8'>
      {/* 병원 상세 정보 스켈레톤 */}
      <div className='rounded-lg border border-gray-200 bg-white p-6'>
        <div className='space-y-4'>
          {/* 병원 이름 */}
          <div className='h-8 w-64 animate-pulse rounded bg-gray-200'></div>

          {/* 병원 기본 정보 */}
          <div className='space-y-2'>
            <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
            <div className='h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>
            <div className='h-4 w-1/2 animate-pulse rounded bg-gray-200'></div>
          </div>

          {/* 평점 및 리뷰 수 */}
          <div className='flex items-center space-x-4'>
            <div className='h-6 w-24 animate-pulse rounded bg-gray-200'></div>
            <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
          </div>

          {/* 진료 시간 */}
          <div className='space-y-2'>
            <div className='h-5 w-24 animate-pulse rounded bg-gray-200'></div>
            <div className='space-y-1'>
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className='flex justify-between'>
                  <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
                  <div className='h-4 w-32 animate-pulse rounded bg-gray-200'></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 리뷰 섹션 스켈레톤 */}
      <div className='border-t border-gray-200 pt-8'>
        <div className='space-y-4'>
          {/* 리뷰 섹션 제목 */}
          <div className='h-6 w-32 animate-pulse rounded bg-gray-200'></div>

          {/* 리뷰 카드들 */}
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className='rounded-lg border border-gray-200 bg-white p-4'>
                <div className='space-y-3'>
                  <div className='h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>
                  <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
                  <div className='h-4 w-1/2 animate-pulse rounded bg-gray-200'></div>
                  <div className='flex items-center space-x-2'>
                    <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
                    <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
