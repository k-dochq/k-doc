'use client';

import { DotIcon } from 'shared/ui/icons';

interface PopularReviewCardV2LocationProps {
  regionLabel: string;
  district: string;
  hospitalName: string;
}

export function PopularReviewCardV2Location({
  regionLabel,
  district,
  hospitalName,
}: PopularReviewCardV2LocationProps) {
  return (
    <div className='flex w-full items-center gap-1 overflow-hidden'>
      <div className='flex min-w-0 shrink-0 items-center gap-1'>
        <p className='truncate text-xs leading-4 font-medium text-neutral-400'>{regionLabel}</p>
        <div className='flex h-[10px] w-0 shrink-0 items-center justify-center'>
          <div className='flex-none rotate-90'>
            <div className='h-0 w-[10px]'>
              <div className='absolute inset-0'>
                <div className='h-px w-full bg-neutral-400' />
              </div>
            </div>
          </div>
        </div>
        <div className='min-w-0 pl-0.5'>
          <p className='truncate text-xs leading-4 font-medium text-neutral-400'>{district}</p>
        </div>
      </div>
      <div className='size-[2px] shrink-0'>
        <DotIcon className='size-[2px]' />
      </div>
      <p className='min-w-0 truncate text-xs leading-4 font-medium text-neutral-400'>
        {hospitalName}
      </p>
    </div>
  );
}
