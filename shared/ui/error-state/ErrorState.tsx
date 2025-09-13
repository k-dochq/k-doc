'use client';

import { type Locale } from 'shared/config';

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
  retryButtonText?: string;
  className?: string;
}

export function ErrorState({
  title,
  message,
  onRetry,
  retryButtonText = '다시 시도',
  className = '',
}: ErrorStateProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // 기본적으로 페이지 새로고침
      window.location.reload();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      {/* 에러 아이콘 */}
      <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='text-red-600'
        >
          <path
            d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
            fill='currentColor'
          />
        </svg>
      </div>

      {/* 에러 메시지 */}
      <h3 className='mb-2 text-lg font-semibold text-gray-900'>{title}</h3>
      <p className='mb-6 max-w-sm text-center text-sm text-gray-600'>{message}</p>

      {/* 재시도 버튼 */}
      <button
        onClick={handleRetry}
        className='flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none'
      >
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='text-white'
        >
          <path
            d='M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z'
            fill='currentColor'
          />
        </svg>
        {retryButtonText}
      </button>
    </div>
  );
}
