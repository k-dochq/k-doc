export function ReservedHospitalsSkeleton() {
  return (
    <div className='p-5'>
      {/* 병원 리스트 스켈레톤 */}
      <div className='space-y-6'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='flex gap-3 rounded-xl border border-white shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)]'
            style={{
              background: 'rgba(255, 255, 255, 0.50)',
            }}
          >
            {/* 왼쪽 썸네일 */}
            <div className='h-[120px] w-[120px] flex-shrink-0 animate-pulse rounded-l-xl bg-white/50'></div>

            {/* 오른쪽 정보 */}
            <div className='flex min-w-0 flex-1 flex-col justify-center gap-2 py-3 pr-3'>
              {/* 병원명 */}
              <div className='h-5 w-32 animate-pulse rounded bg-white/50'></div>

              {/* 주소 */}
              <div className='h-4 w-40 animate-pulse rounded bg-white/50'></div>

              {/* 전문분야 태그들 */}
              <div className='flex gap-2'>
                <div className='h-6 w-16 animate-pulse rounded-full bg-white/40'></div>
                <div className='h-6 w-20 animate-pulse rounded-full bg-white/40'></div>
              </div>

              {/* 평점 및 리뷰수 */}
              <div className='flex items-center gap-2'>
                <div className='h-4 w-12 animate-pulse rounded bg-white/50'></div>
                <div className='h-4 w-16 animate-pulse rounded bg-white/50'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
