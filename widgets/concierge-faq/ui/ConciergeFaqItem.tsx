'use client';

import { useState } from 'react';
import { MinusIcon } from './icons/MinusIcon';
import { PlusIcon } from './icons/PlusIcon';

interface ConciergeFaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function ConciergeFaqItem({ question, answer, defaultOpen = false }: ConciergeFaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className='w-full border-b border-[#d4d4d4]'>
      <button
        type='button'
        className='flex w-full items-center gap-[6px] px-5 py-4 text-left'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='flex-1 text-[18px] font-bold leading-7 text-[#404040]'>{question}</span>
        <span className='shrink-0'>{isOpen ? <MinusIcon /> : <PlusIcon />}</span>
      </button>
      {isOpen && (
        <div className='px-5 pb-5'>
          <p className='text-[16px] leading-6 text-[#737373]'>{answer}</p>
        </div>
      )}
    </div>
  );
}
