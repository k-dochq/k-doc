import Image from 'next/image';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-md text-center'>
        {/* K-DOC 로고 */}
        <div className='mb-8 flex justify-center'>
          <div className='relative h-16 w-16'>
            <Image src='/kdoc_logo.png' alt='K-DOC 로고' fill className='object-contain' priority />
          </div>
        </div>

        {/* 404 메시지 */}
        <div className='mb-8'>
          <h1 className='mb-2 text-6xl font-bold text-gray-800'>404</h1>
          <h2 className='mb-4 text-xl font-semibold text-gray-700'>페이지를 찾을 수 없습니다</h2>
          <p className='text-gray-500'>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
        </div>

        {/* 홈으로 돌아가기 버튼 */}
        <Link
          href='/'
          className='inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
        >
          <Home className='h-4 w-4' />
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
