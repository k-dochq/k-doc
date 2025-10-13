interface SelectAllButtonProps {
  isAllSelected: boolean;
  onClick: () => void;
  className?: string;
}

export function SelectAllButton({
  isAllSelected,
  onClick,
  className,
}: SelectAllButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-4 w-4 items-center justify-center rounded transition-colors ${
        isAllSelected ? 'border-0' : 'border border-neutral-300'
      } ${className || ''}`}
      style={{
        backgroundColor: isAllSelected ? '#da47ef' : 'transparent',
      }}
    >
      {isAllSelected && (
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='h-full w-full'
        >
          <path
            d='M13 4L6 11L3 8'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </button>
  );
}
