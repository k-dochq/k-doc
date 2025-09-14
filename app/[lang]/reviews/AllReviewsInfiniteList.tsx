'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption } from 'shared/model/types/review-query';
import { type MedicalSpecialtyType } from '@prisma/client';

interface AllReviewsInfiniteListProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    category?: MedicalSpecialtyType;
    sort?: ReviewSortOption;
  };
}

export function AllReviewsInfiniteList({ lang, dict, searchParams }: AllReviewsInfiniteListProps) {
  return (
    <div className='bg-gray-50'>
      {/* TODO: 리뷰 리스트 구현 예정 */}
      <div className='flex flex-col items-center justify-center py-12'>
        <div className='text-center'>
          <h2 className='mb-2 text-lg font-medium text-gray-900'>리뷰 리스트 구현 예정</h2>
          <p className='text-gray-500'>
            카테고리: {searchParams.category || '전체'}, 정렬: {searchParams.sort || 'latest'}
          </p>
        </div>
      </div>
    </div>
  );
}
