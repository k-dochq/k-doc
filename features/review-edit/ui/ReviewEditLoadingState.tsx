'use client';

import { PageHeaderV2 } from 'shared/ui/page-header/PageHeaderV2';
import { Loader2 } from 'lucide-react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ReviewEditLoadingStateProps {
  lang: Locale;
  dict: Dictionary;
  reviewId: string;
}

export function ReviewEditLoadingState({ lang, dict, reviewId }: ReviewEditLoadingStateProps) {
  return (
    <>
      <PageHeaderV2
        title={dict.reviewWrite?.form?.title || 'Edit Review'}
        fallbackUrl={`/${lang}/review/${reviewId}`}
      />
      <div className='flex min-h-screen items-center justify-center pt-[58px]'>
        <Loader2 size={48} className='animate-spin text-[#DA47EF]' />
      </div>
    </>
  );
}
