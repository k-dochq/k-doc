'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const pathname = usePathname();

  useEffect(() => {
    // 에러 로깅 - 프로덕션에서는 Sentry, LogRocket 등 사용
    console.error('Global error occurred:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      pathname,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
    });

    // 에러 추적 서비스에 전송 (예: Sentry)
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     tags: {
    //       section: 'global-error',
    //     },
    //     extra: {
    //       digest: error.digest,
    //       pathname,
    //     },
    //   });
    // }
  }, [error, pathname]);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleReportIssue = () => {
    // GitHub Issues나 고객 지원 시스템으로 리다이렉트
    const issueUrl = `mailto:support@kdoc.com?subject=Error Report&body=Error ID: ${error.digest || 'unknown'}%0AMessage: ${encodeURIComponent(error.message)}%0APage: ${encodeURIComponent(pathname)}`;
    window.open(issueUrl, '_blank');
  };

  return (
    <html lang='en'>
      <head>
        <title>Something went wrong - K-Doc</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
        <div className='w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg'>
          {/* 에러 아이콘 */}
          <div className='mb-6 flex justify-center'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
              <AlertTriangle className='h-8 w-8 text-red-600' />
            </div>
          </div>

          {/* 에러 메시지 */}
          <h1 className='mb-4 text-2xl font-bold text-gray-900'>Something went wrong</h1>

          <p className='mb-8 leading-relaxed text-gray-600'>
            An unexpected error occurred. Please try again later.
          </p>

          {/* 에러 ID (있는 경우) */}
          {error.digest && (
            <div className='mb-6 rounded-lg bg-gray-100 p-3'>
              <p className='mb-1 text-sm text-gray-500'>Error ID</p>
              <code className='font-mono text-xs break-all text-gray-700'>{error.digest}</code>
            </div>
          )}

          {/* 액션 버튼들 */}
          <div className='space-y-3'>
            <button
              onClick={reset}
              className='flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
            >
              <RefreshCw className='mr-2 h-4 w-4' />
              Try Again
            </button>

            <button
              onClick={handleGoHome}
              className='flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
            >
              <Home className='mr-2 h-4 w-4' />
              Go Home
            </button>

            <button
              onClick={handleReportIssue}
              className='w-full text-sm text-gray-500 underline transition-colors hover:text-gray-700'
            >
              Report Issue
            </button>
          </div>

          {/* 브랜드 로고/이름 */}
          <div className='mt-8 border-t border-gray-200 pt-6'>
            <p className='text-sm text-gray-400'>K-Doc</p>
          </div>
        </div>
      </body>
    </html>
  );
}
