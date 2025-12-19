'use client';

import { SubAgreeCheckedIcon, SubAgreeUncheckedIcon, ArrowRightIcon } from './AgreementIcons';

interface SubAgreementItemProps {
  checked: boolean;
  label: string;
  onToggle: () => void;
  disabled?: boolean;
  link?: string;
}

export function SubAgreementItem({
  checked,
  label,
  onToggle,
  disabled = false,
  link,
}: SubAgreementItemProps) {
  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className='flex w-full items-center py-2 pr-2 pl-3'>
      <button
        type='button'
        onClick={onToggle}
        disabled={disabled}
        className='flex min-w-0 flex-1 items-center gap-2 text-left'
      >
        <span className='shrink-0'>
          {checked ? <SubAgreeCheckedIcon /> : <SubAgreeUncheckedIcon />}
        </span>
        <span className='min-w-0 truncate text-sm text-neutral-700'>{label}</span>
      </button>
      {link && (
        <button
          type='button'
          onClick={handleArrowClick}
          disabled={disabled}
          className='ml-2 shrink-0'
          aria-label='View details'
        >
          <ArrowRightIcon />
        </button>
      )}
    </div>
  );
}
