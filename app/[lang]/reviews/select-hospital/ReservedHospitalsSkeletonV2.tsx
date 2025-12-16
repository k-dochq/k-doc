export function ReservedHospitalsSkeletonV2() {
  return (
    <div className='p-5'>
      {/* 병원 리스트 스켈레톤 */}
      <div className='space-y-3'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='flex max-h-[135px] w-full items-start rounded-xl bg-white shadow-[1px_2px_4px_0_rgba(0,0,0,0.40)]'
          >
            {/* 왼쪽 썸네일 */}
            <div className='h-[135px] w-[156px] shrink-0 animate-pulse rounded-l-xl bg-neutral-200'></div>

            {/* 오른쪽 정보 */}
            <div className='flex min-w-0 flex-1 flex-col gap-2 overflow-hidden px-3 pt-3'>
              {/* 병원명 */}
              <div className='h-5 w-32 animate-pulse rounded bg-neutral-200'></div>

              {/* 주소 */}
              <div className='h-4 w-40 animate-pulse rounded bg-neutral-200'></div>

              {/* 가격 */}
              <div className='h-4 w-20 animate-pulse rounded bg-neutral-200'></div>

              {/* 평점 및 리뷰수 */}
              <div className='h-4 w-24 animate-pulse rounded bg-neutral-200'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
