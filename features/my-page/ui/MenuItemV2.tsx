'use client';

import { ArrowRightIcon } from 'features/terms-agreement/ui/AgreementIcons';

interface MenuItemV2Props {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

export function MenuItemV2({ title, onClick, disabled = false }: MenuItemV2Props) {
  return (
    <button
      type='button'
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className='flex w-full items-center justify-between rounded-xl bg-white p-4 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50'
    >
      <span className='text-sm font-medium text-neutral-700'>{title}</span>
      <div className='shrink-0'>
        <ArrowRightIcon />
      </div>
    </button>
  );
}
