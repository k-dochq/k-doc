export function ReservationItemCardSkeleton() {
  return (
    <div className='flex flex-col gap-4 rounded-xl bg-white p-3 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.4)]'>
      {/* 상단: D-day 배지 및 화살표 */}
      <div className='flex items-center justify-between'>
        {/* 배지 스켈레톤 */}
        <div className='h-7 w-16 animate-pulse rounded-full bg-[#e5e5e5]' />
        {/* 화살표 스켈레톤 */}
        <div className='size-6 animate-pulse rounded bg-[#e5e5e5]' />
      </div>

      {/* 병원 썸네일 및 예약 정보 */}
      <div className='flex gap-3'>
        {/* 썸네일 이미지 스켈레톤 */}
        <div className='h-[90px] w-[104px] shrink-0 animate-pulse rounded-lg bg-[#e0e0e0]' />

        {/* 예약 정보 스켈레톤 */}
        <div className='flex flex-1 flex-col gap-3'>
          {/* 예약 일시 스켈레톤 */}
          <div className='flex flex-col gap-0.5'>
            <div className='h-5 w-20 animate-pulse rounded bg-[#e5e5e5]' />
            <div className='flex items-start gap-1'>
              <div className='h-5 w-24 animate-pulse rounded bg-[#e5e5e5]' />
              <div className='h-5 w-12 animate-pulse rounded bg-[#e5e5e5]' />
              <div className='h-5 w-8 animate-pulse rounded bg-[#e5e5e5]' />
            </div>
          </div>

          {/* 주소복사, 지도보기 버튼 스켈레톤 */}
          <div className='flex gap-1.5'>
            <div className='h-7 w-20 animate-pulse rounded-full bg-[#e5e5e5]' />
            <div className='h-7 w-20 animate-pulse rounded-full bg-[#e5e5e5]' />
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className='border-t border-[#e5e5e5] pt-4' />

      {/* 병원 정보 스켈레톤 */}
      <div className='flex items-center gap-3'>
        {/* 로고 스켈레톤 */}
        <div className='size-[46px] shrink-0 animate-pulse rounded-full bg-[#e5e5e5]' />

        {/* 병원 이름 및 지역 스켈레톤 */}
        <div className='flex flex-1 flex-col gap-0.5'>
          <div className='h-5 w-32 animate-pulse rounded bg-[#e5e5e5]' />
          <div className='flex items-center gap-1'>
            <div className='h-4 w-8 animate-pulse rounded bg-[#e5e5e5]' />
            <div className='h-2.5 w-2.5 animate-pulse rounded bg-[#e5e5e5]' />
            <div className='h-4 w-16 animate-pulse rounded bg-[#e5e5e5]' />
          </div>
        </div>
      </div>

      {/* 시술후기 작성하기 버튼 스켈레톤 */}
      <div className='h-9 w-full animate-pulse rounded-lg bg-[#e5e5e5]' />
    </div>
  );
}
