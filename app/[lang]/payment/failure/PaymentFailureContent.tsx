'use client';

import { type Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface PaymentFailureContentProps {
  lang: Locale;
  dict: Dictionary;
  queryParams: {
    resultCode?: string;
    resultMessage?: string;
    orderId?: string;
  };
}

export function PaymentFailureContent({ lang, dict, queryParams }: PaymentFailureContentProps) {
  const router = useLocalizedRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleRetry = () => {
    // 이전 페이지로 돌아가서 다시 시도
    // 쿼리 파라미터가 있으면 다시 결제 페이지로 이동
    if (queryParams.orderId) {
      // 실제로는 결제 페이지로 다시 이동해야 하지만, 여기서는 홈으로 이동
      router.push('/');
    } else {
      router.back();
    }
  };

  // 에러 메시지 결정
  const errorMessage = queryParams.resultMessage || dict.payment.failure.message;

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='mx-auto max-w-md text-center'>
        {/* 실패 아이콘 */}
        <div className='mb-6 flex justify-center'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-red-100'>
            <svg
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='text-red-600'
            >
              <path
                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
                fill='currentColor'
              />
            </svg>
          </div>
        </div>

        {/* 실패 메시지 */}
        <h2 className='mb-2 text-2xl font-bold text-gray-900'>{dict.payment.failure.title}</h2>
        <p className='mb-8 text-base text-gray-600'>{errorMessage}</p>

        {/* 에러 정보 카드 */}
        {(queryParams.resultCode || queryParams.orderId) && (
          <div className='mb-8 rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm'>
            <div className='space-y-3 text-left'>
              {queryParams.resultCode && (
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>{dict.payment.failure.errorCode}</span>
                  <span className='text-sm font-medium text-red-900'>{queryParams.resultCode}</span>
                </div>
              )}
              {queryParams.orderId && (
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>{dict.payment.success.orderId}</span>
                  <span className='text-sm font-medium text-gray-900'>{queryParams.orderId}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 에러 정보 없음 메시지 */}
        {!queryParams.resultCode && !queryParams.resultMessage && (
          <div className='mb-8 rounded-lg bg-yellow-50 p-4'>
            <p className='text-sm text-yellow-800'>{dict.payment.failure.noErrorInfo}</p>
          </div>
        )}

        {/* 버튼 그룹 */}
        <div className='flex flex-col gap-3'>
          <button
            onClick={handleRetry}
            className='w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            {dict.payment.failure.retry}
          </button>
          <button
            onClick={handleGoHome}
            className='w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none'
          >
            {dict.payment.failure.goHome}
          </button>
        </div>
      </div>
    </div>
  );
}
