'use client';

import { type Dictionary } from 'shared/model/types';

interface ProcedureFilterHeaderProps {
  dict: Dictionary;
  onReset: () => void;
}

export function ProcedureFilterHeader({ dict, onReset }: ProcedureFilterHeaderProps) {
  return (
    <div className='flex items-center justify-between px-5 pb-3'>
      <p className="font-['Pretendard'] text-lg font-bold leading-7 text-[#404040]">
        {dict.search?.drawer?.procedure?.title}
      </p>
      <button type='button' onClick={onReset} className='flex items-center gap-1'>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <path d='M11.0461 13.3333C12.8854 12.2842 14.0938 10.2689 14.0938 7.99998C14.0937 6.79445 13.7363 5.616 13.0665 4.61364C12.3968 3.61129 11.4448 2.83004 10.3311 2.36871C9.2173 1.90738 7.99175 1.78667 6.80939 2.02186C5.62703 2.25704 4.54096 2.83756 3.68853 3.68999C2.83609 4.54243 2.25558 5.62849 2.02039 6.81085C1.78521 7.99322 1.90591 9.21876 2.36725 10.3325C2.82858 11.4463 3.60982 12.3982 4.61218 13.068C5.61454 13.7377 6.79299 14.0952 7.99851 14.0952' stroke='#737373' strokeLinecap='round' strokeLinejoin='round' />
          <path d='M11.0461 10.2859V13.3335H14.0938' stroke='#737373' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
        <p className="font-['Pretendard'] text-sm font-normal leading-5 text-[#a3a3a3]">
          {dict.search?.drawer?.procedure?.reset}
        </p>
      </button>
    </div>
  );
}
