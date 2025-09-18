'use client';

import { type Locale } from 'shared/config';
import { BackIcon } from 'shared/ui/icons';

interface ReviewImagesSkeletonProps {
  lang: Locale;
  className?: string;
}

export function ReviewImagesSkeleton({ lang, className = '' }: ReviewImagesSkeletonProps) {
  return (
    <div className={`flex min-h-screen flex-col bg-white ${className}`}>
      {/* 헤더 스켈레톤 */}
      <header className='flex items-center justify-between bg-white px-4 py-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100'>
          <BackIcon className='h-6 w-6 text-neutral-500' />
        </div>

        <div className='flex flex-col items-center space-y-1'>
          <div className='h-5 w-24 animate-pulse rounded bg-gray-200'></div>
          <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
        </div>

        <div className='w-10' />
      </header>

      {/* 이미지 영역 스켈레톤 */}
      <div className='flex flex-1 items-center justify-center p-4'>
        <div className='aspect-[3/4] w-full max-w-md animate-pulse rounded-lg bg-gray-200'></div>
      </div>

      {/* 하단 네비게이션 스켈레톤 */}
      <div className='border-t border-gray-200 bg-gray-50 p-4'>
        <div className='text-center'>
          <div className='mx-auto h-4 w-16 animate-pulse rounded bg-gray-300'></div>
        </div>
      </div>
    </div>
  );
}
