import { EyeIconFigma } from 'shared/ui/eye-icon-figma';

interface QuickMenuIconItemProps {
  label: string;
  iconSize?: number;
}

export function QuickMenuIconItem({ label, iconSize = 41 }: QuickMenuIconItemProps) {
  return (
    <div className='flex flex-col items-center gap-1'>
      <div className='flex size-[60px] shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white'>
        <EyeIconFigma size={iconSize} iconColor='#404040' arrowColor='#DA47EF' />
      </div>
      <p className='relative shrink-0 text-center text-xs leading-4 font-medium text-neutral-700'>
        {label}
      </p>
    </div>
  );
}
