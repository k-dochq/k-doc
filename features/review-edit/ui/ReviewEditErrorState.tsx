'use client';

import { PageHeaderV2 } from 'shared/ui/page-header/PageHeaderV2';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ReviewEditErrorStateProps {
  lang: Locale;
  dict: Dictionary;
  reviewId: string;
  error?: string | null;
}

export function ReviewEditErrorState({ lang, dict, reviewId, error }: ReviewEditErrorStateProps) {
  const router = useLocalizedRouter();

  return (
    <>
      <PageHeaderV2
        title={dict.reviewWrite?.form?.title || 'Edit Review'}
        fallbackUrl={`/${lang}/review/${reviewId}`}
      />
      <div className='flex min-h-screen flex-col items-center justify-center p-5 pt-[58px]'>
        <div className='space-y-4 text-center'>
          <h2 className='text-xl font-semibold text-gray-900'>
            {dict.reviewWrite?.error?.title || 'Error'}
          </h2>
          <p className='text-gray-600'>
            {error || dict.reviewWrite?.error?.message || 'Something went wrong'}
          </p>
          <button
            onClick={() => router.push(`/review/${reviewId}`)}
            className='rounded-xl bg-[#DA47EF] px-6 py-3 font-semibold text-white hover:bg-[#C63DD6]'
          >
            {dict.reviewWrite?.error?.retry || 'Go Back'}
          </button>
        </div>
      </div>
    </>
  );
}
