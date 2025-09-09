import Image from 'next/image';

export default function Loading() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div className='flex flex-col items-center space-y-6'>
        {/* K-DOC 로고 */}
        <div className='relative h-20 w-20'>
          <Image src='/kdoc_logo.png' alt='K-DOC 로고' fill className='object-contain' priority />
        </div>

        {/* 로딩 스피너 */}
        <div className='relative'>
          <div className='h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500'></div>
        </div>

        {/* 로딩 텍스트 */}
        <div className='text-center'>
          <p className='text-base font-medium text-gray-800'>페이지를 불러오는 중...</p>
          <p className='mt-1 text-sm text-gray-500'>잠시만 기다려주세요</p>
        </div>
      </div>
    </div>
  );
}
