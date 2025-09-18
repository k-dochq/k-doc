'use client';

import { type Locale } from 'shared/config';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { BackIcon } from 'shared/ui/icons';

interface ReviewImagesHeaderProps {
  headerText?: string | null;
  lang: Locale;
  className?: string;
}

export function ReviewImagesHeader({ headerText, lang }: ReviewImagesHeaderProps) {
  const router = useLocalizedRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className='flex items-center justify-between py-4'>
      <button
        onClick={handleBackClick}
        aria-label='뒤로 가기'
        className='flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100'
      >
        <BackIcon />
      </button>
      <div className='flex items-center'>
        {headerText && <h1 className='text-lg font-semibold text-neutral-900'>{headerText}</h1>}
      </div>
    </div>
  );
}
