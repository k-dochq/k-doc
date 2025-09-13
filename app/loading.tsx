import { HeaderLogo } from 'widgets/header/ui/HeaderLogo';

export default function Loading() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div className='flex flex-col items-center space-y-6'>
        {/* K-DOC 로고 with 애니메이션 */}
        <div className='text-primary animate-bounce'>
          <HeaderLogo />
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
