'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ReviewCarouselErrorProps {
  lang: Locale;
  dict: Dictionary;
  error?: Error;
  onRetry?: () => void;
}

export function ReviewCarouselError({ lang, dict, error, onRetry }: ReviewCarouselErrorProps) {
  return (
    <div className='w-full'>
      <div className='mb-4'>
        <h2 className='text-lg font-semibold text-gray-900'>
          {dict.reviewCarousel?.title || '시술후기'}
        </h2>
      </div>
      <div className='flex flex-col items-center justify-center py-8 text-center'>
        <div className='mb-4'>
          <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100'>
            <AlertCircle className='h-6 w-6 text-red-600' />
          </div>
        </div>
        <h3 className='mb-2 text-sm font-medium text-gray-900'>
          {dict.reviewCarousel?.error?.message || '리뷰를 불러오는 중 오류가 발생했습니다'}
        </h3>
        <p className='mb-4 max-w-sm text-xs text-gray-500'>
          {dict.reviewCarousel?.error?.description || '잠시 후 다시 시도해주세요.'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className='inline-flex items-center space-x-2 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none'
          >
            <RefreshCw className='h-4 w-4' />
            <span>{dict.reviewCarousel?.error?.retry || '다시 시도'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
