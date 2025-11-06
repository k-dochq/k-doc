'use client';

import { type Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface PaymentErrorProps {
  lang: Locale;
  dict: Dictionary;
  error: Error;
  errorMessage?: string;
  onGoHome?: () => void;
  onRetry?: () => void;
}

export function PaymentError({
  lang,
  dict,
  error,
  errorMessage,
  onGoHome,
  onRetry,
}: PaymentErrorProps) {
  const router = useLocalizedRouter();

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      router.push('/');
    }
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  // 에러 메시지 결정
  let displayMessage = errorMessage || dict.payment.error.unknownError;

  if (
    error.message === 'MISSING_ORDER_ID' ||
    error.message === 'MISSING_CUSTOMER_ID' ||
    error.message === 'MISSING_PRODUCT_NAME' ||
    error.message === 'MISSING_AMOUNT'
  ) {
    displayMessage = dict.payment.error.missingParams;
  } else if (error.message === 'INVALID_AMOUNT') {
    displayMessage = dict.payment.error.invalidAmount;
  } else if (error.message === 'INVALID_CURRENCY') {
    displayMessage = dict.payment.error.invalidCurrency;
  }

  // 재시도 가능한 에러인지 확인
  const canRetry =
    error.message.includes('TIMEOUT') ||
    error.message.includes('NETWORK') ||
    error.message.includes('SDK') ||
    error.message.includes('sign');

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='mx-auto max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm'>
        {/* 에러 아이콘 */}
        <div className='mb-4 flex justify-center'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
            <svg
              width='32'
              height='32'
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

        {/* 에러 제목 */}
        <h3 className='mb-2 text-lg font-semibold text-gray-900'>
          {dict.payment.error.paymentFailed}
        </h3>

        {/* 에러 메시지 */}
        <p className='mb-6 text-sm text-gray-600'>{displayMessage}</p>

        {/* 버튼 그룹 */}
        <div className='flex flex-col gap-3'>
          {canRetry && onRetry && (
            <button
              onClick={handleRetry}
              className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
            >
              {dict.payment.error.retry}
            </button>
          )}
          <button
            onClick={handleGoHome}
            className='rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none'
          >
            {dict.payment.error.goHome}
          </button>
        </div>
      </div>
    </div>
  );
}
