'use client';

import { type Dictionary } from 'shared/model/types';

interface ProcedureFilterApplyButtonProps {
  dict: Dictionary;
  selectedCount: number;
  onApply: () => void;
}

export function ProcedureFilterApplyButton({
  dict,
  selectedCount,
  onApply,
}: ProcedureFilterApplyButtonProps) {
  return (
    <div className='px-5 py-4'>
      <button
        type='button'
        onClick={onApply}
        className='flex w-full items-center justify-center rounded-full bg-[#6C4EF3] py-4'
      >
        <p className="font-['Pretendard'] text-base font-semibold leading-6 text-white">
          {dict.search?.drawer?.procedure?.confirm}
          {selectedCount > 0 ? `(${selectedCount})` : ''}
        </p>
      </button>
    </div>
  );
}
