'use client';

import { type Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';
import type { PaymentReturnQueryParams } from '../model/types';

interface PaymentReturnSuccessProps {
  lang: Locale;
  dict: Dictionary;
  queryParams: PaymentReturnQueryParams;
  onGoHome: () => void;
}

export function PaymentReturnSuccess({
  lang,
  dict,
  queryParams,
  onGoHome,
}: PaymentReturnSuccessProps) {
  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='mx-auto max-w-md text-center'>
        {/* 성공 아이콘 */}
        <div className='mb-6 flex justify-center'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-green-100'>
            <svg
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='text-green-600'
            >
              <path
                d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'
                fill='currentColor'
              />
            </svg>
          </div>
        </div>

        {/* 성공 메시지 */}
        <h2 className='mb-2 text-2xl font-bold text-gray-900'>{dict.payment.success.title}</h2>
        <p className='mb-8 text-base text-gray-600'>{dict.payment.success.message}</p>

        {/* 주문 정보 카드 */}
        {(queryParams.orderId || queryParams.tid) && (
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
            </div>
          </div>
        )}

        {/* 추가 메시지 */}
        {queryParams.resultMessage && (
          <div className='mb-8 rounded-lg bg-blue-50 p-4'>
            <p className='text-sm text-blue-800'>{queryParams.resultMessage}</p>
          </div>
        )}

        {/* 정보 없음 메시지 */}
        {!queryParams.orderId && !queryParams.tid && (
          <div className='mb-8 rounded-lg bg-yellow-50 p-4'>
            <p className='text-sm text-yellow-800'>{dict.payment.success.missingInfo}</p>
          </div>
        )}

        {/* 홈으로 가기 버튼 */}
        <button
          onClick={onGoHome}
          className='w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
        >
          {dict.payment.success.goHome}
        </button>
      </div>
    </div>
  );
}
