'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 페이지 레벨 에러 로깅
    console.error('Page error occurred:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-lg rounded-lg bg-white p-8 shadow-md'>
        {/* 에러 아이콘 */}
        <div className='mb-6 flex justify-center'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-orange-100'>
            <AlertCircle className='h-6 w-6 text-orange-600' />
          </div>
        </div>

        {/* 에러 메시지 */}
        <div className='mb-8 text-center'>
          <h1 className='mb-3 text-xl font-semibold text-gray-900'>Page Error</h1>

          <p className='leading-relaxed text-gray-600'>There was a problem loading this page.</p>
        </div>

        {/* 개발 환경에서만 에러 세부사항 표시 */}
        {process.env.NODE_ENV === 'development' && (
          <details className='mb-6 rounded-lg bg-gray-50 p-4'>
            <summary className='mb-2 cursor-pointer text-sm font-medium text-gray-700'>
              Error Details
            </summary>
            <div className='max-h-32 overflow-auto rounded border bg-white p-3 font-mono text-xs text-gray-600'>
              <div className='mb-2'>
                <strong>Message:</strong> {error.message}
              </div>
              {error.digest && (
                <div className='mb-2'>
                  <strong>Digest:</strong> {error.digest}
                </div>
              )}
              {error.stack && (
                <div>
                  <strong>Stack:</strong>
                  <pre className='mt-1 whitespace-pre-wrap'>{error.stack}</pre>
                </div>
              )}
            </div>
          </details>
        )}

        {/* 액션 버튼들 */}
        <div className='flex flex-col gap-3 sm:flex-row'>
          <button
            onClick={reset}
            className='flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            <RefreshCw className='mr-2 h-4 w-4' />
            Try Again
          </button>

          <button
            onClick={handleGoBack}
            className='flex flex-1 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
