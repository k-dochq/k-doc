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
      className={`fixed bottom-0 left-1/2 z-50 h-[120px] w-full -translate-x-1/2 px-5 ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      <button
        type='button'
        onClick={handleConsult}
        disabled={isLoading}
        className='relative flex h-[62px] w-full items-center justify-center overflow-hidden rounded-full disabled:opacity-70'
      >
        {/* Outer glow/shadow layer */}
        <div className='absolute inset-0 rounded-full shadow-[inset_0_-4px_12px_rgba(0,0,0,0.3)]' />

        {/* Animated border */}
        <div className='animated-border-wrapper absolute -inset-[1px] rounded-full'>
          <div className='animated-border absolute inset-0 rounded-full' />
        </div>

        {/* Button background */}
        <div
          className='absolute inset-[4px] rounded-full'
          style={{
            background: 'linear-gradient(180deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.2)',
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
