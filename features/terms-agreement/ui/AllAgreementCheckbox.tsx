'use client';

import { AllAgreeCheckedIcon, AllAgreeUncheckedIcon } from './AgreementIcons';

interface AllAgreementCheckboxProps {
  checked: boolean;
  label: string;
  onToggle: () => void;
  disabled?: boolean;
}

export function AllAgreementCheckbox({
  checked,
  label,
  onToggle,
  disabled = false,
}: AllAgreementCheckboxProps) {
  return (
    <button
      type='button'
      onClick={onToggle}
      disabled={disabled}
      className={`flex w-full items-center gap-2 rounded-lg p-4 transition-colors ${
        checked ? 'border border-[#7657FF] bg-[#f6f4ff]' : 'border border-neutral-200 bg-white'
      }`}
    >
      {checked ? <AllAgreeCheckedIcon /> : <AllAgreeUncheckedIcon />}
      <span className='text-base font-semibold text-neutral-700'>{label}</span>
    </button>
  );
}
