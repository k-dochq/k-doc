'use client';

import { type Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';
import type { PaymentReturnQueryParams } from '../model/types';

interface PaymentReturnProcessingProps {
  lang: Locale;
  dict: Dictionary;
  queryParams: PaymentReturnQueryParams;
  onGoHome: () => void;
}

export function PaymentReturnProcessing({
  lang,
  dict,
  queryParams,
  onGoHome,
}: PaymentReturnProcessingProps) {
  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='mx-auto max-w-md text-center'>
        {/* 로딩/처리 중 아이콘 */}
        <div className='mb-6 flex justify-center'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-blue-100'>
            <svg
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='animate-spin text-blue-600'
            >
              <circle
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
                className='opacity-25'
              />
              <path
                fill='currentColor'
                className='opacity-75'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
          </div>
        </div>

        {/* 처리 중 메시지 */}
        <h2 className='mb-2 text-2xl font-bold text-gray-900'>{dict.payment.loading.processing}</h2>
        <p className='mb-8 text-base text-gray-600'>
          {dict.payment.loading.preparing || '결제 결과를 처리하고 있습니다...'}
        </p>

        {/* 결제 정보 카드 */}
        {(queryParams.orderId || queryParams.tid || queryParams.resultCode) && (
          <div className='mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            <div className='space-y-3 text-left'>
              {queryParams.orderId && (
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>{dict.payment.success.orderId}</span>
                  <span className='text-sm font-medium text-gray-900'>{queryParams.orderId}</span>
                </div>
              )}
              {queryParams.tid && (
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>
                    {dict.payment.success.transactionId}
                  </span>
                  <span className='text-sm font-medium text-gray-900'>{queryParams.tid}</span>
                </div>
              )}
              {queryParams.resultCode && (
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>{dict.payment.failure.errorCode}</span>
                  <span className='text-sm font-medium text-red-900'>{queryParams.resultCode}</span>
                </div>
              )}
              {queryParams.resultStatus && (
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>상태</span>
                  <span className='text-sm font-medium text-gray-900'>
                    {queryParams.resultStatus}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 에러 메시지 */}
        {queryParams.resultMessage && (
          <div className='mb-8 rounded-lg bg-yellow-50 p-4'>
            <p className='text-sm text-yellow-800'>{queryParams.resultMessage}</p>
          </div>
        )}

        {/* 홈으로 가기 버튼 */}
        <button
          onClick={onGoHome}
          className='w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
        >
          {dict.payment.failure.goHome}
        </button>
      </div>
    </div>
  );
}
