'use client';

import { Switch } from 'shared/ui/switch';

interface SwitchMenuItemProps {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function SwitchMenuItem({
  title,
  checked,
  onChange,
  disabled = false,
}: SwitchMenuItemProps) {
  return (
    <div className='flex w-full items-center justify-between rounded-lg bg-white/50 p-4'>
      <span className='text-sm font-medium text-gray-900'>{title}</span>
      <div className='flex-shrink-0'>
        <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} />
      </div>
    </div>
  );
}
