'use client';

import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { ArrowRightIconFigma } from 'shared/ui/arrow-right-icon-figma';

interface MainTipsTitleProps {
  dict: Dictionary;
}

export function MainTipsTitle({ dict }: MainTipsTitleProps) {
  const router = useLocalizedRouter();

  const handleViewAll = () => {
    router.push('/tips');
  };

  return (
    <div className='flex w-full items-center justify-between'>
      <h2 className='text-2xl leading-8 font-semibold text-neutral-700'>
        {dict.tips?.mainSectionTitle ?? 'K-DOC Tips'}
      </h2>

      <button
        onClick={handleViewAll}
        className='flex items-center gap-0.5 transition-opacity hover:opacity-80'
        aria-label={dict.tips?.viewAll ?? 'View all'}
      >
        <span className='text-sm leading-5 font-medium text-neutral-500'>
          {dict.tips?.viewAll ?? 'View all'}
        </span>
        <div className='flex size-4 shrink-0 items-center justify-center'>
          <ArrowRightIconFigma size={7} color='#737373' />
        </div>
      </button>
    </div>
  );
}
