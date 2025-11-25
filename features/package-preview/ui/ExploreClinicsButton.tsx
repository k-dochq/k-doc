'use client';

import { ArrowRightIcon } from 'shared/ui/arrow-right-icon';
import { LocaleLink } from 'shared/ui/locale-link';

interface ExploreClinicsButtonProps {
  text: string;
}

export function ExploreClinicsButton({ text }: ExploreClinicsButtonProps) {
  return (
    <LocaleLink href='/hospitals' className='block w-full'>
      <button
        type='button'
        className='relative flex w-full items-center justify-center gap-2 rounded-full bg-[#ff5dca] py-6 text-white shadow-[inset_8px_8px_12px_0px_rgba(255,255,255,0.4),inset_-8px_-10px_8px_0px_rgba(198,23,141,0.6)] md:py-8'
      >
        <span className='text-xl leading-[1.3] font-semibold tracking-[-0.8px] md:text-4xl'>
          {text}
        </span>
        <span className='hidden shrink-0 text-white md:block'>
          <ArrowRightIcon size={40} className='text-white' strokeWidth={2} />
        </span>
        <span className='block shrink-0 text-white md:hidden'>
          <ArrowRightIcon size={24} className='text-white' strokeWidth={2} />
        </span>
      </button>
    </LocaleLink>
  );
}
