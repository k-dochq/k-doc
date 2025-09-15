import { ResetIcon } from 'shared/ui/icons';

interface ResetButtonProps {
  onClick: () => void;
  className?: string;
}

export function ResetButton({ onClick, className }: ResetButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 transition-opacity hover:opacity-70 ${className || ''}`}
    >
      <ResetIcon />
      <span className='text-xs leading-[14px] font-medium text-neutral-500'>초기화</span>
    </button>
  );
}
