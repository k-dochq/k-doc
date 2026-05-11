'use client';

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function SubmitButton({ onClick, disabled = false, children }: SubmitButtonProps) {
  return (
    <div className='px-5 pt-4 pb-10'>
      <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        className={`w-full rounded-xl px-10 py-4 text-base leading-6 font-normal text-white transition-colors duration-200 ${
          disabled
            ? 'cursor-not-allowed bg-neutral-300'
            : 'bg-primary-900 hover:bg-primary-900/90 active:bg-primary-900/80'
        } `}
      >
        {children}
      </button>
    </div>
  );
}
