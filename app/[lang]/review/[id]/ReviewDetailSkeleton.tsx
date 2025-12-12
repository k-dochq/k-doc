export function ReviewDetailSkeleton() {
  return (
    <div className='min-h-screen bg-white'>
      {/* PageHeader 스켈레톤 */}
      <div className='flex items-center justify-between border-b border-neutral-100 px-5 py-4'>
        {/* 뒤로가기 버튼 */}
        <div className='h-6 w-6 animate-pulse rounded bg-gray-200'></div>

        {/* 제목 */}
        <div className='h-6 w-20 animate-pulse rounded bg-gray-200'></div>

        {/* 좋아요 버튼 */}
        <div className='h-8 w-16 animate-pulse rounded-full bg-gray-200'></div>
      </div>

      {/* 리뷰 컨텐츠 */}
      <div className='px-5 py-4'>
        {/* 첫 번째 섹션: 프로필 사진, 닉네임, 작성일자, 평점 */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            {/* 프로필 사진 */}
            <div className='h-10 w-10 animate-pulse rounded-full bg-gray-200'></div>
            <div className='space-y-1'>
              {/* 닉네임 */}
              <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
              {/* 작성일자 */}
              <div className='h-3 w-16 animate-pulse rounded bg-gray-200'></div>
            </div>
          </div>
          {/* 평점 */}
          <div className='flex items-center space-x-1'>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className='h-4 w-4 animate-pulse rounded bg-gray-200'></div>
            ))}
          </div>
        </div>

        {/* 두 번째 섹션: Before/After 이미지 */}
        <div className='mt-3 space-y-2'>
          <div className='grid grid-cols-2 gap-2'>
            {/* Before 이미지 */}
            <div className='aspect-[4/3] animate-pulse rounded-lg bg-gray-200'></div>
            {/* After 이미지 */}
            <div className='aspect-[4/3] animate-pulse rounded-lg bg-gray-200'></div>
          </div>
          {/* 추가 이미지 인디케이터 */}
          <div className='flex justify-center space-x-1'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='h-2 w-2 animate-pulse rounded-full bg-gray-200'></div>
            ))}
          </div>
        </div>

        {/* 세 번째 섹션: 해시태그, 시술시기 */}
        <div className='mt-3 space-y-2'>
          {/* 해시태그들 */}
          <div className='flex flex-wrap gap-2'>
            <div className='h-6 w-16 animate-pulse rounded-full bg-gray-200'></div>
            <div className='h-6 w-20 animate-pulse rounded-full bg-gray-200'></div>
            <div className='h-6 w-14 animate-pulse rounded-full bg-gray-200'></div>
          </div>
          {/* 시술시기 */}
          <div className='h-4 w-24 animate-pulse rounded bg-gray-200'></div>
        </div>

        {/* 네 번째 섹션: 리뷰 내용 */}
        <div className='mt-3 space-y-2'>
          <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
          <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
          <div className='h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>
          <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
          <div className='h-4 w-2/3 animate-pulse rounded bg-gray-200'></div>
          <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
          <div className='h-4 w-4/5 animate-pulse rounded bg-gray-200'></div>
        </div>

        {/* 다섯 번째 섹션: 병원 정보 */}
        <div className='mt-3 rounded-lg border border-neutral-200 p-4'>
          <div className='flex items-center space-x-3'>
            {/* 병원 이미지 */}
            <div className='h-12 w-12 animate-pulse rounded-lg bg-gray-200'></div>
            <div className='flex-1 space-y-2'>
              {/* 병원명 */}
              <div className='h-5 w-32 animate-pulse rounded bg-gray-200'></div>
              {/* 병원 주소 */}
              <div className='h-4 w-40 animate-pulse rounded bg-gray-200'></div>
            </div>
          </div>
        </div>

        {/* 여섯 번째 섹션: 조회수 */}
        <div className='mt-3'>
          <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
        </div>
      </div>

      {/* 구분선 */}
      <div className='h-2 w-full bg-neutral-100'></div>

      {/* 일곱 번째 섹션: 같은 병원의 다른 시술후기 */}
      <div className='p-5'>
        {/* 섹션 제목 */}
        <div className='mb-4 h-6 w-32 animate-pulse rounded bg-gray-200'></div>

        {/* 리뷰 카드들 */}
        <div className='space-y-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='rounded-lg border border-neutral-200 p-4'>
              <div className='mb-3 flex items-center space-x-3'>
                {/* 프로필 사진 */}
                <div className='h-8 w-8 animate-pulse rounded-full bg-gray-200'></div>
                <div className='flex-1 space-y-1'>
                  {/* 닉네임 */}
                  <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
                  {/* 작성일자 */}
                  <div className='h-3 w-16 animate-pulse rounded bg-gray-200'></div>
                </div>
                {/* 평점 */}
                <div className='h-3 w-16 animate-pulse rounded bg-gray-200'></div>
              </div>

              {/* 이미지 */}
              <div className='mb-3 aspect-[4/3] animate-pulse rounded-lg bg-gray-200'></div>

              {/* 리뷰 내용 */}
              <div className='space-y-2'>
                <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
                <div className='h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
