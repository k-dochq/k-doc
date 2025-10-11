'use client';

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function SubmitButton({ onClick, disabled = false, children }: SubmitButtonProps) {
  return (
    <div className='pt-4 pb-10'>
      <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        className={`w-full rounded-xl px-10 py-4 text-base leading-6 font-normal text-white transition-colors duration-200 ${
          disabled
            ? 'cursor-not-allowed bg-neutral-300'
            : 'bg-[#da47ef] hover:bg-[#c93ee6] active:bg-[#b835d3]'
        } `}
      >
        {children}
      </button>
    </div>
  );
}
