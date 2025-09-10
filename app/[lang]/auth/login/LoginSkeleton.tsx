export function LoginSkeleton() {
  return (
    <div className='space-y-6'>
      {/* 소셜 로그인 버튼들 스켈레톤 */}
      <div className='space-y-3'>
        <div className='h-12 w-full animate-pulse rounded-lg bg-gray-200'></div>
        <div className='h-12 w-full animate-pulse rounded-lg bg-gray-200'></div>
      </div>

      {/* 구분선 */}
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300'></div>
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-gray-50 px-2 text-gray-500'>또는</span>
        </div>
      </div>

      {/* 이메일 로그인 폼 스켈레톤 */}
      <div className='space-y-4'>
        <div className='space-y-2'>
          <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
          <div className='h-10 w-full animate-pulse rounded-md bg-gray-200'></div>
        </div>
        <div className='space-y-2'>
          <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
          <div className='h-10 w-full animate-pulse rounded-md bg-gray-200'></div>
        </div>
        <div className='h-10 w-full animate-pulse rounded-md bg-gray-200'></div>
      </div>

      {/* 하단 링크들 */}
      <div className='space-y-2 text-center'>
        <div className='mx-auto h-4 w-32 animate-pulse rounded bg-gray-200'></div>
        <div className='mx-auto h-4 w-24 animate-pulse rounded bg-gray-200'></div>
      </div>
    </div>
  );
}
