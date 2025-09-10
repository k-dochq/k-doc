export function ReviewDetailSkeleton() {
  return (
    <div className='mx-auto max-w-4xl'>
      <div className='rounded-lg border border-gray-200 bg-white p-6'>
        <div className='space-y-6'>
          {/* 리뷰 제목 */}
          <div className='space-y-2'>
            <div className='h-8 w-3/4 animate-pulse rounded bg-gray-200'></div>
            <div className='h-4 w-1/2 animate-pulse rounded bg-gray-200'></div>
          </div>

          {/* 병원 정보 */}
          <div className='flex items-center space-x-4 border-b border-gray-100 pb-4'>
            <div className='h-12 w-12 animate-pulse rounded-full bg-gray-200'></div>
            <div className='space-y-2'>
              <div className='h-5 w-32 animate-pulse rounded bg-gray-200'></div>
              <div className='h-4 w-24 animate-pulse rounded bg-gray-200'></div>
            </div>
          </div>

          {/* 평점 및 시술 정보 */}
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
              <div className='flex items-center space-x-2'>
                <div className='h-6 w-24 animate-pulse rounded bg-gray-200'></div>
                <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
              <div className='h-6 w-32 animate-pulse rounded bg-gray-200'></div>
            </div>
          </div>

          {/* 리뷰 내용 */}
          <div className='space-y-4'>
            <div className='h-5 w-24 animate-pulse rounded bg-gray-200'></div>
            <div className='space-y-2'>
              <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
              <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
              <div className='h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>
              <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
              <div className='h-4 w-2/3 animate-pulse rounded bg-gray-200'></div>
            </div>
          </div>

          {/* 이미지 영역 */}
          <div className='space-y-4'>
            <div className='h-5 w-20 animate-pulse rounded bg-gray-200'></div>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className='aspect-square animate-pulse rounded-lg bg-gray-200'
                ></div>
              ))}
            </div>
          </div>

          {/* 작성일 */}
          <div className='border-t border-gray-100 pt-4'>
            <div className='h-4 w-32 animate-pulse rounded bg-gray-200'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
