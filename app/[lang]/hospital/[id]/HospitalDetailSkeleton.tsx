export function HospitalDetailSkeleton() {
  return (
    <div className='min-h-screen bg-white'>
      {/* 상단 헤더 스켈레톤 */}
      <div className='px-4 py-4'>
        <div className='flex items-center justify-between'>
          {/* 뒤로가기 버튼 */}
          <div className='h-6 w-6 animate-pulse rounded-full bg-gray-300'></div>

          {/* 병원 이름 */}
          <div className='h-6 w-48 animate-pulse rounded bg-gray-300'></div>

          {/* 좋아요 버튼 */}
          <div className='flex items-center space-x-2'>
            <div className='h-6 w-6 animate-pulse rounded-full bg-gray-300'></div>
            <div className='h-4 w-8 animate-pulse rounded bg-gray-300'></div>
          </div>
        </div>
      </div>

      {/* 이미지 캐러셀 스켈레톤 */}
      <div className='relative h-64 w-full'>
        <div className='absolute inset-0 animate-pulse bg-gray-200'></div>

        {/* 시술후기 버튼 */}
        <div className='absolute top-4 right-4'>
          <div className='h-8 w-20 animate-pulse rounded-full bg-gray-300'></div>
        </div>

        {/* 캐러셀 인디케이터 */}
        <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 animate-pulse rounded-full ${
                index === 0 ? 'bg-gray-400' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* 병원 정보 섹션 스켈레톤 */}
      <div className='px-4 py-6'>
        <div className='space-y-4'>
          {/* HOT 태그 */}
          <div className='h-6 w-12 animate-pulse rounded bg-gray-300'></div>

          {/* 병원 이름 */}
          <div className='h-8 w-64 animate-pulse rounded bg-gray-300'></div>

          {/* 지역 정보 */}
          <div className='h-5 w-32 animate-pulse rounded bg-gray-300'></div>

          {/* 평점, 리뷰 수, 가격 정보 */}
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <div className='h-5 w-5 animate-pulse rounded bg-gray-300'></div>
              <div className='h-5 w-8 animate-pulse rounded bg-gray-300'></div>
            </div>
            <div className='h-4 w-16 animate-pulse rounded bg-gray-300'></div>
            <div className='h-5 w-20 animate-pulse rounded bg-gray-300'></div>
            <div className='h-6 w-16 animate-pulse rounded bg-gray-300'></div>
          </div>

          {/* 시술 태그 */}
          <div className='h-6 w-20 animate-pulse rounded bg-gray-300'></div>
        </div>
      </div>

      {/* 네비게이션 탭 스켈레톤 */}
      <div className='px-4 py-2'>
        <div className='flex space-x-8'>
          <div className='h-6 w-20 animate-pulse rounded bg-gray-300'></div>
          <div className='relative'>
            <div className='h-6 w-24 animate-pulse rounded bg-gray-300'></div>
            {/* 선택된 탭 언더라인 */}
            <div className='absolute -bottom-2 left-0 h-0.5 w-full animate-pulse bg-gray-400'></div>
          </div>
        </div>
      </div>

      {/* 콘텐츠 섹션 스켈레톤 */}
      <div className='bg-white px-4 py-6'>
        <div className='space-y-6'>
          {/* 섹션 제목 */}
          <div className='h-7 w-32 animate-pulse rounded bg-gray-200'></div>

          {/* 인용문 박스 */}
          <div className='rounded-lg border-l-4 border-gray-400 p-4'>
            <div className='space-y-2'>
              <div className='h-4 w-full animate-pulse rounded bg-gray-300'></div>
              <div className='h-4 w-4/5 animate-pulse rounded bg-gray-300'></div>
              <div className='h-4 w-3/4 animate-pulse rounded bg-gray-300'></div>
            </div>
          </div>

          {/* 비디오 플레이어 */}
          <div className='relative h-48 w-full animate-pulse rounded-lg bg-gray-200'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='h-12 w-12 animate-pulse rounded-full bg-gray-300'></div>
            </div>
          </div>

          {/* 비디오 설명 */}
          <div className='h-5 w-64 animate-pulse rounded bg-gray-200'></div>

          {/* 번호가 매겨진 리스트 */}
          <div className='space-y-4'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='flex items-start space-x-3'>
                <div className='h-8 w-8 animate-pulse rounded-full bg-gray-300'></div>
                <div className='flex-1 space-y-2'>
                  <div className='h-5 w-full animate-pulse rounded bg-gray-200'></div>
                  <div className='h-4 w-4/5 animate-pulse rounded bg-gray-200'></div>
                  <div className='h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
