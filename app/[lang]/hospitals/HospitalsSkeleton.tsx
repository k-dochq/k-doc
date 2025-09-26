export function HospitalsSkeleton() {
  return (
    <div className='p-5'>
      {/* 병원 리스트 스켈레톤 */}
      <div className='space-y-3'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='flex h-32 overflow-hidden rounded-2xl border border-white/60 bg-white/20'
          >
            {/* 왼쪽 이미지 섹션 */}
            <div className='relative w-2/5'>
              {/* 이미지 스켈레톤 */}
              <div className='h-full w-full animate-pulse bg-white/50'></div>

              {/* HOT 태그 스켈레톤 (왼쪽 상단) */}
              <div className='absolute top-2 left-2 h-6 w-10 animate-pulse rounded bg-white/40'></div>

              {/* 퍼센트 이벤트 태그 스켈레톤 (오른쪽 상단) */}
              <div className='absolute top-2 right-2 flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-white/40'></div>

              {/* 클리닉명 오버레이 스켈레톤 (하단) */}
              <div className='absolute right-2 bottom-2 left-2 space-y-1'>
                <div className='h-4 w-3/4 animate-pulse rounded bg-white/60'></div>
                <div className='h-3 w-1/2 animate-pulse rounded bg-white/60'></div>
              </div>
            </div>

            {/* 오른쪽 텍스트 섹션 */}
            <div className='flex w-3/5 flex-col justify-between p-4'>
              {/* 상단: 지역 + 병원명 */}
              <div className='space-y-2'>
                {/* 지역 정보 스켈레톤 */}
                <div className='h-3 w-16 animate-pulse rounded bg-white/50'></div>

                {/* 병원명 스켈레톤 */}
                <div className='h-5 w-28 animate-pulse rounded bg-white/50'></div>
              </div>

              {/* 중간: 가격 + 할인 태그 */}
              <div className='space-y-2'>
                {/* 가격과 할인 태그 */}
                <div className='flex items-center gap-2'>
                  <div className='h-5 w-20 animate-pulse rounded bg-white/50'></div>
                  <div className='h-6 w-14 animate-pulse rounded bg-white/40'></div>
                </div>

                {/* 서비스 카테고리 태그 */}
                <div className='h-6 w-12 animate-pulse rounded bg-white/40'></div>
              </div>

              {/* 하단: 평점 + 리뷰수 */}
              <div className='flex items-center gap-1'>
                {/* 별 아이콘 */}
                <div className='h-4 w-4 animate-pulse rounded bg-white/50'></div>
                {/* 평점 */}
                <div className='h-4 w-6 animate-pulse rounded bg-white/50'></div>
                {/* 리뷰수 */}
                <div className='h-4 w-8 animate-pulse rounded bg-white/50'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
