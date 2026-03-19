'use client';

import { Loader2 } from 'lucide-react';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config/layout';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useConciergeConsultation } from 'features/concierge-consultation';

interface ConciergeFloatingButtonProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConciergeFloatingButton({ lang, dict }: ConciergeFloatingButtonProps) {
  const { handleConsult, isLoading } = useConciergeConsultation(lang, dict);

  return (
    <div
      className={`fixed bottom-0 left-1/2 z-50 w-full -translate-x-1/2 px-5 pb-14 ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      <button
        type='button'
        onClick={handleConsult}
        disabled={isLoading}
        className='relative flex h-[62px] w-full items-center justify-center overflow-hidden rounded-full disabled:opacity-70'
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

        {/* Label / Spinner */}
        {isLoading ? (
          <Loader2 className='relative z-10 h-5 w-5 animate-spin text-white' />
        ) : (
          <span className='relative z-10 text-[16px] leading-6 font-medium text-white'>
            {dict.concierge.floatingButtonText}
          </span>
        )}
      </button>
    </div>
  );
}
