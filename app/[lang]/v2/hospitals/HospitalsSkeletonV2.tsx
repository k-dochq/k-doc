export function HospitalsSkeletonV2() {
  return (
    <div className='px-5 py-[11px]'>
      {/* 2열 그리드 레이아웃 스켈레톤 */}
      <div className='grid grid-cols-2 gap-x-[10px] gap-y-[11px]'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className='flex flex-col items-center overflow-clip rounded-xl bg-white shadow-[1px_2px_4px_0_rgba(0,0,0,0.40)]'
          >
            {/* 썸네일 이미지 스켈레톤 */}
            <div className='h-[200px] w-full animate-pulse bg-neutral-200' />

            {/* 콘텐츠 영역 스켈레톤 */}
            <div className='flex h-[160px] w-full shrink-0 flex-col items-start gap-1 p-3'>
              {/* 상단 영역 */}
              <div className='flex w-full shrink-0 flex-col items-start gap-1.5'>
                {/* 카테고리 태그 스켈레톤 */}
                <div className='h-5 w-16 animate-pulse rounded bg-neutral-200' />

                {/* 제목 및 지역 스켈레톤 */}
                <div className='w-full space-y-1'>
                  <div className='h-4 w-3/4 animate-pulse rounded bg-neutral-200' />
                  <div className='h-3 w-1/2 animate-pulse rounded bg-neutral-200' />
                </div>
              </div>

              {/* 하단 영역 */}
              <div className='flex w-full shrink-0 flex-col items-start gap-0.5'>
                {/* 가격 스켈레톤 */}
                <div className='h-4 w-20 animate-pulse rounded bg-neutral-200' />

                {/* 별점 및 리뷰 스켈레톤 */}
                <div className='flex items-center gap-1'>
                  <div className='h-3 w-12 animate-pulse rounded bg-neutral-200' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
