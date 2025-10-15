'use client';

import { useEffect } from 'react';
import { sendErrorToSlack } from 'shared/lib/error-tracking/send-error-to-slack';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // 전역 에러를 Slack으로 전송
    sendErrorToSlack({
      error,
      errorBoundary: 'global-error',
      additionalInfo: {
        digest: error.digest,
        errorType: 'Global Error',
        timestamp: new Date().toISOString(),
      },
    });
  }, [error]);

  const handleRetry = () => {
    reset();
  };

  const handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <html lang='ko'>
      <body>
        <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
          <div className='flex flex-col items-center justify-center py-12'>
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
            <h1 className='mb-2 text-xl font-semibold text-gray-900'>Application Error</h1>
            <p className='mb-6 max-w-sm text-center text-sm text-gray-600'>
              An unexpected error occurred. Our team has been notified and is working to fix this
              issue.
            </p>

            {/* 개발 환경에서만 에러 세부사항 표시 */}
            {process.env.NODE_ENV === 'development' && (
              <details className='mb-6 max-w-md rounded-lg bg-gray-50 p-4'>
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
                Try Again
              </button>

              <button
                onClick={handleGoHome}
                className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none'
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='text-gray-700'
                >
                  <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' fill='currentColor' />
                </svg>
                Go Home
              </button>
            </div>

            {/* 추가 정보 */}
            <div className='mt-6 text-center'>
              <p className='text-xs text-gray-500'>
                If this problem persists, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
