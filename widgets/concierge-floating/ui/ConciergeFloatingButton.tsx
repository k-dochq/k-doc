'use client';

import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config/layout';
import { type Dictionary } from 'shared/model/types';

interface ConciergeFloatingButtonProps {
  dict: Dictionary;
}

export function ConciergeFloatingButton({ dict }: ConciergeFloatingButtonProps) {
  return (
    <div className={`fixed bottom-0 left-1/2 z-50 w-full -translate-x-1/2 px-5 pb-14 ${MAX_MOBILE_WIDTH_CLASS}`}>
      <button
        type='button'
        className='relative flex h-[62px] w-full items-center justify-center overflow-hidden rounded-full'
      >
        {/* Animated border */}
        <div className='animated-border absolute -inset-[1px] rounded-full' />

        {/* Button background */}
        <div
          className='absolute inset-[3px] rounded-full'
          style={{
            background: 'linear-gradient(180deg, #5a39ec 0%, #29128e 100%)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.25)',
          }}
        />

        {/* Label */}
        <span className='relative z-10 text-[16px] font-medium leading-6 text-white'>
          {dict.concierge.floatingButtonText}
        </span>
      </button>
    </div>
  );
}
