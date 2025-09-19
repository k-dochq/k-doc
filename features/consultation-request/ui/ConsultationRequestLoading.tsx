export function ConsultationRequestLoading() {
  return (
    <div className=''>
      {/* PageHeader 스켈레톤 */}
      <div className='flex items-center justify-between px-5 py-4'>
        <div className='animate-pulse'>
          <div className='h-6 w-20 rounded bg-white/50'></div>
        </div>
        <div className='animate-pulse'>
          <div className='h-6 w-6 rounded bg-white/50'></div>
        </div>
      </div>

      {/* HospitalCard 스켈레톤 */}
      <div className='p-5'>
        <div className='rounded-xl border border-white bg-white/50'>
          {/* 병원 이미지 스켈레톤 */}
          <div className='animate-pulse'>
            <div className='h-48 w-full rounded-t-xl bg-white/50'></div>
          </div>

          {/* 병원 정보 스켈레톤 */}
          <div className='p-5'>
            <div className='animate-pulse space-y-3'>
              {/* 병원명 */}
              <div className='h-6 w-3/4 rounded bg-white/50'></div>

              {/* 태그들 */}
              <div className='flex gap-2'>
                <div className='h-5 w-16 rounded bg-white/50'></div>
                <div className='h-5 w-20 rounded bg-white/50'></div>
              </div>

              {/* 평점 */}
              <div className='h-4 w-24 rounded bg-white/50'></div>
            </div>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className='h-[1px] bg-white' />

      {/* ConsultationForm 스켈레톤 */}
      <div className='p-5'>
        <div className='animate-pulse space-y-6'>
          {/* 이름 입력 */}
          <div className='space-y-2'>
            <div className='h-4 w-16 rounded bg-white/50'></div>
            <div className='h-12 w-full rounded-lg bg-white/50'></div>
          </div>

          {/* 성별 선택 */}
          <div className='space-y-2'>
            <div className='h-4 w-12 rounded bg-white/50'></div>
            <div className='flex gap-4'>
              <div className='h-10 w-20 rounded-lg bg-white/50'></div>
              <div className='h-10 w-20 rounded-lg bg-white/50'></div>
            </div>
          </div>

          {/* 연령대 선택 */}
          <div className='space-y-2'>
            <div className='h-4 w-16 rounded bg-white/50'></div>
            <div className='h-12 w-full rounded-lg bg-white/50'></div>
          </div>

          {/* 휴대폰 번호 */}
          <div className='space-y-2'>
            <div className='h-4 w-20 rounded bg-white/50'></div>
            <div className='h-12 w-full rounded-lg bg-white/50'></div>
          </div>

          {/* 예약 희망 날짜 */}
          <div className='space-y-2'>
            <div className='h-4 w-24 rounded bg-white/50'></div>
            <div className='h-12 w-full rounded-lg bg-white/50'></div>
          </div>

          {/* 내용 */}
          <div className='space-y-2'>
            <div className='h-4 w-12 rounded bg-white/50'></div>
            <div className='h-24 w-full rounded-lg bg-white/50'></div>
          </div>

          {/* 개인정보 동의 */}
          <div className='flex items-center gap-2'>
            <div className='h-5 w-5 rounded bg-white/50'></div>
            <div className='h-4 w-32 rounded bg-white/50'></div>
          </div>

          {/* 제출 버튼 */}
          <div className='h-12 w-full rounded-lg bg-white/50'></div>
        </div>
      </div>
    </div>
  );
}
