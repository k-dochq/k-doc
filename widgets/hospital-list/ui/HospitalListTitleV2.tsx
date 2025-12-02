'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { ArrowRightIconFigma } from 'shared/ui/arrow-right-icon-figma';

interface HospitalListTitleV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function HospitalListTitleV2({ lang, dict }: HospitalListTitleV2Props) {
  const router = useLocalizedRouter();

  const handleViewAll = () => {
    router.push('/hospitals');
  };

  return (
    <div className='flex w-full items-center justify-between'>
      <h2 className='text-2xl leading-8 font-semibold text-neutral-700'>
        {dict.hospitalList.title}
      </h2>

      <button
        onClick={handleViewAll}
        className='flex items-center gap-0.5 transition-opacity hover:opacity-80'
        aria-label={dict.hospitalList.viewAll}
      >
        <span className='text-sm leading-5 font-medium text-neutral-500'>
          {dict.hospitalList.viewAll}
        </span>
        <div className='flex size-4 shrink-0 items-center justify-center'>
          <ArrowRightIconFigma size={7} color='#737373' />
        </div>
      </button>
    </div>
  );
}
