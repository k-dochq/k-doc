export function HospitalListSkeleton() {
  return (
    <div className='w-full'>
      {/* 제목 스켈레톤 */}
      <div className='mb-4'>
        <div className='h-6 w-48 animate-pulse rounded bg-gray-200'></div>
      </div>

      {/* 탭 스켈레톤 */}
      <div className='mb-4'>
        <div className='flex items-center gap-2 pb-2'>
          {/* 전체 탭 스켈레톤 */}
          <div className='flex min-w-[43px] shrink-0 items-center justify-center rounded-full px-3 py-2'>
            <div className='h-4 w-8 animate-pulse rounded bg-gray-200'></div>
          </div>
          {/* 의료 전문 분야 탭들 스켈레톤 */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className='flex min-w-[43px] shrink-0 items-center justify-center rounded-full px-3 py-2'
            >
              <div className='h-4 w-12 animate-pulse rounded bg-gray-200'></div>
            </div>
          ))}
        </div>
      </div>

      {/* 병원 리스트 스켈레톤 */}
      <div className='space-y-4'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='flex gap-4 rounded-lg border border-gray-200 bg-white p-4'>
            {/* 이미지 스켈레톤 */}
            <div className='relative flex-shrink-0'>
              <div className='h-24 w-24 animate-pulse rounded-lg bg-gray-200'></div>
            </div>

            {/* 병원 정보 스켈레톤 */}
            <div className='flex-1 space-y-2'>
              {/* 지역 스켈레톤 */}
              <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>

              {/* 병원명 스켈레톤 */}
              <div className='h-5 w-32 animate-pulse rounded bg-gray-200'></div>

              {/* 가격 및 할인 스켈레톤 */}
              <div className='flex items-center gap-2'>
                <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
              </div>

              {/* 평점 스켈레톤 */}
              <div className='flex items-center gap-1'>
                <div className='h-4 w-4 animate-pulse rounded bg-gray-200'></div>
                <div className='h-4 w-8 animate-pulse rounded bg-gray-200'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
