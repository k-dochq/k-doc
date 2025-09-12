export function HospitalCardSkeleton() {
  return (
    <div className='flex gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
      {/* 썸네일 이미지 스켈레톤 */}
      <div className='relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200'>
        {/* HOT 라벨 스켈레톤 */}
        <div className='absolute top-2 left-2 h-4 w-8 rounded bg-gray-300'></div>
        {/* 이미지 스켈레톤 */}
        <div className='h-full w-full animate-pulse bg-gray-200'></div>
      </div>

      {/* 텍스트 정보 스켈레톤 */}
      <div className='flex flex-1 flex-col justify-between'>
        <div className='space-y-2'>
          {/* 지역 정보 스켈레톤 */}
          <div className='flex items-center gap-2'>
            <div className='h-3 w-8 animate-pulse rounded bg-gray-200'></div>
            <div className='h-3 w-16 animate-pulse rounded bg-gray-200'></div>
          </div>

          {/* 병원명 스켈레톤 */}
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 animate-pulse rounded-full bg-gray-200'></div>
            <div className='h-5 w-32 animate-pulse rounded bg-gray-200'></div>
          </div>

          {/* 가격 정보 스켈레톤 */}
          <div className='flex items-center gap-2'>
            <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
            <div className='h-5 w-12 animate-pulse rounded bg-gray-200'></div>
          </div>
        </div>

        {/* 평점 정보 스켈레톤 */}
        <div className='flex items-center gap-1'>
          <div className='h-4 w-4 animate-pulse rounded bg-gray-200'></div>
          <div className='h-4 w-12 animate-pulse rounded bg-gray-200'></div>
        </div>
      </div>
    </div>
  );
}
