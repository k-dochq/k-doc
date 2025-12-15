export function FavoritesDoctorsTabV2Skeleton() {
  return (
    <div className='p-5'>
      <div className='space-y-4'>
        {/* 타이틀 스켈레톤 */}
        <div className='flex items-center gap-1'>
          <div className='h-7 w-32 animate-pulse rounded bg-neutral-200' />
          <div className='h-5 w-8 animate-pulse rounded bg-neutral-200' />
        </div>

        {/* DoctorCardV2 스켈레톤 */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className='relative flex items-start gap-3 rounded-xl bg-white p-3 shadow-[1px_2px_4px_0_rgba(0,0,0,0.4)]'
          >
            {/* 프로필 이미지 스켈레톤 */}
            <div className='h-[100px] w-[100px] shrink-0 animate-pulse rounded-full bg-neutral-200' />

            {/* 내용 스켈레톤 */}
            <div className='flex min-w-0 flex-1 flex-col gap-2'>
              <div className='flex min-w-0 flex-col gap-1'>
                {/* 이름 + 직책 스켈레톤 */}
                <div className='h-6 w-40 animate-pulse rounded bg-neutral-200' />
                {/* 병원명 스켈레톤 */}
                <div className='h-4 w-32 animate-pulse rounded bg-neutral-200' />
                {/* 전문 분야 태그 스켈레톤 */}
                <div className='flex gap-2'>
                  <div className='h-6 w-16 animate-pulse rounded-full bg-neutral-200' />
                  <div className='h-6 w-20 animate-pulse rounded-full bg-neutral-200' />
                </div>
              </div>
              {/* 더보기 링크 스켈레톤 */}
              <div className='h-4 w-12 animate-pulse rounded bg-neutral-200' />
            </div>

            {/* 좋아요 버튼 스켈레톤 */}
            <div className='absolute right-3 bottom-3 h-6 w-6 animate-pulse rounded bg-neutral-200' />
          </div>
        ))}
      </div>
    </div>
  );
}
