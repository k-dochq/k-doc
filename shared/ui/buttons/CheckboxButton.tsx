interface CheckboxButtonProps {
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export function CheckboxButton({ isSelected, onClick, className = '' }: CheckboxButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded transition-colors ${
        isSelected ? 'border-0' : 'border border-neutral-300'
      } ${className}`}
      style={{
        backgroundColor: isSelected ? '#da47ef' : 'transparent',
      }}
    >
      {isSelected && (
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='16' height='16' rx='4' fill='var(--color-primary-900)' />
          <path
            d='M11.7333 5.43332L6.59993 10.5667L4.2666 8.23332'
            stroke='white'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </button>
  );
}
