export function HospitalsSkeleton() {
  return (
    <div className='px-2 py-6'>
      {/* 병원 리스트 스켈레톤 */}
      <div className='space-y-4'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='rounded-lg border border-white/60 bg-white/20 p-4'>
            {/* 썸네일 이미지 스켈레톤 */}
            <div className='mb-3'>
              <div className='relative aspect-video w-full animate-pulse overflow-hidden rounded-lg bg-white'></div>
            </div>

            {/* 병원명 스켈레톤 */}
            <div className='mb-2'>
              <div className='h-6 w-3/4 animate-pulse rounded bg-white'></div>
            </div>

            {/* 위치 스켈레톤 */}
            <div className='mb-2 flex items-center gap-1'>
              <div className='h-4 w-4 animate-pulse rounded bg-white'></div>
              <div className='h-4 w-1/2 animate-pulse rounded bg-white'></div>
            </div>

            {/* 부위 태그 스켈레톤 */}
            <div className='mb-3'>
              <div className='flex flex-wrap gap-1'>
                {Array.from({ length: 3 }).map((_, tagIndex) => (
                  <div
                    key={tagIndex}
                    className='h-6 w-16 animate-pulse rounded-full bg-white'
                  ></div>
                ))}
              </div>
            </div>

            {/* 평점 스켈레톤 */}
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                <div className='h-4 w-4 animate-pulse rounded bg-white'></div>
                <div className='h-4 w-8 animate-pulse rounded bg-white'></div>
              </div>
              <div className='h-4 w-20 animate-pulse rounded bg-white'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
