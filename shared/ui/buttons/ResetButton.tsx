import { ResetIcon } from 'shared/ui/icons';
import type { Dictionary } from 'shared/model/types';

interface ResetButtonProps {
  onClick: () => void;
  className?: string;
  dict: Dictionary;
}

export function ResetButton({ onClick, className, dict }: ResetButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 transition-opacity hover:opacity-70 ${className || ''}`}
    >
      <ResetIcon />
      <span className='text-[12px] text-neutral-500'>{dict.districtFilter.reset}</span>
    </button>
  );
}
