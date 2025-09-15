export function ReviewDetailSkeleton() {
  return (
    <div className='space-y-6 p-4'>
      {/* 사용자 정보 */}
      <div className='flex items-center space-x-3'>
        <div className='h-10 w-10 animate-pulse rounded-full bg-gray-200'></div>
        <div className='flex-1'>
          <div className='h-5 w-24 animate-pulse rounded bg-gray-200'></div>
        </div>
        <div className='flex items-center space-x-1'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='h-4 w-4 animate-pulse rounded bg-gray-200'></div>
          ))}
        </div>
      </div>

      {/* Before/After 이미지 섹션 */}
      <div className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {/* Before 이미지 */}
          <div className='space-y-2'>
            <div className='aspect-[4/3] animate-pulse rounded-lg bg-gray-200'></div>
            <div className='h-6 w-16 animate-pulse rounded bg-gray-200'></div>
          </div>

          {/* After 이미지들 */}
          <div className='space-y-2'>
            <div className='aspect-[4/3] animate-pulse rounded-lg bg-gray-200'></div>
            <div className='h-6 w-16 animate-pulse rounded bg-gray-200'></div>
          </div>
        </div>

        {/* 추가 After 이미지 */}
        <div className='flex justify-center'>
          <div className='h-8 w-8 animate-pulse rounded bg-gray-200'></div>
        </div>
      </div>

      {/* 해시태그 */}
      <div className='flex flex-wrap gap-2'>
        <div className='h-6 w-20 animate-pulse rounded-full bg-gray-200'></div>
        <div className='h-6 w-16 animate-pulse rounded-full bg-gray-200'></div>
      </div>

      {/* 시술시기 */}
      <div className='h-4 w-32 animate-pulse rounded bg-gray-200'></div>

      {/* 리뷰 내용 */}
      <div className='space-y-3'>
        <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
        <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
        <div className='h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>
        <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
        <div className='h-4 w-2/3 animate-pulse rounded bg-gray-200'></div>
        <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
        <div className='h-4 w-4/5 animate-pulse rounded bg-gray-200'></div>
      </div>
    </div>
  );
}
