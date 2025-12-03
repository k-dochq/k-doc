export function HospitalCardV2Skeleton() {
  return (
    <div className='relative'>
      {/* 카드 컨테이너 */}
      <div className='flex flex-col items-center overflow-clip rounded-xl bg-white shadow-[1px_2px_4px_0_rgba(0,0,0,0.40)]'>
        {/* 썸네일 이미지 스켈레톤 */}
        <div className='relative h-[130px] w-full shrink-0 overflow-clip'>
          <div className='absolute top-[-20px] left-0 size-[150px]'>
            <div className='h-full w-full animate-pulse bg-gray-200' />
          </div>
        </div>

        {/* 콘텐츠 영역 스켈레톤 */}
        <div className='flex h-[160px] w-full shrink-0 flex-col items-start gap-1 p-3'>
          {/* 상단 영역 */}
          <div className='flex w-full shrink-0 flex-col items-start gap-1.5'>
            {/* 카테고리 태그 스켈레톤 */}
            <div className='h-5 w-16 animate-pulse rounded-full bg-gray-200' />

            {/* 병원명 스켈레톤 (2줄) */}
            <div className='flex w-full shrink-0 flex-col items-start gap-0.5'>
              <div className='h-5 w-full animate-pulse rounded bg-gray-200' />
              <div className='h-5 w-3/4 animate-pulse rounded bg-gray-200' />
            </div>

            {/* 지역 정보 스켈레톤 (1줄) */}
            <div className='flex w-full min-w-0 shrink-0 items-center gap-1'>
              <div className='h-3 w-8 shrink-0 animate-pulse rounded bg-gray-200' />
              <div className='relative flex h-[10px] w-0 shrink-0 items-center justify-center'>
                <div className='flex-none rotate-90'>
                  <div className='relative h-0 w-[10px]'>
                    <div className='h-px w-[10px] bg-gray-300' />
                  </div>
                </div>
              </div>
              <div className='relative flex min-w-0 flex-1 items-center py-0 pr-0'>
                <div className='h-3 w-20 animate-pulse rounded bg-gray-200' />
              </div>
            </div>
          </div>

          {/* 하단 영역 */}
          <div className='flex w-full shrink-0 flex-col items-start gap-0.5'>
            {/* 가격 스켈레톤 */}
            <div className='h-7 w-20 animate-pulse rounded bg-gray-200' />

            {/* 별점 및 리뷰 스켈레톤 */}
            <div className='flex shrink-0 items-center gap-1'>
              <div className='size-4 animate-pulse rounded bg-gray-200' />
              <div className='h-4 w-12 animate-pulse rounded bg-gray-200' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
