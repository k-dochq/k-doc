'use client';

import { type Locale } from 'shared/config';
import { ReviewImagesHeader } from './ReviewImagesHeader';
import { ImageIcon } from 'lucide-react';

interface ReviewImagesEmptyStateProps {
  lang: Locale;
  className?: string;
}

export function ReviewImagesEmptyState({ lang, className = '' }: ReviewImagesEmptyStateProps) {
  return (
    <div className={`flex min-h-screen flex-col bg-white ${className}`}>
      <ReviewImagesHeader navigationData={null} lang={lang} />
      <div className='flex flex-1 items-center justify-center'>
        <div className='flex flex-col items-center justify-center py-12'>
          {/* 빈 상태 아이콘 */}
          <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100'>
            <ImageIcon className='h-8 w-8 text-gray-400' />
          </div>

          {/* 빈 상태 메시지 */}
          <h3 className='mb-2 text-lg font-semibold text-gray-900'>표시할 이미지가 없습니다</h3>
          <p className='max-w-sm text-center text-sm text-gray-600'>
            이 리뷰에는 아직 이미지가 등록되지 않았습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
