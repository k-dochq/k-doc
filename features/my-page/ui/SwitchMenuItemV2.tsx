'use client';

import { Switch } from 'shared/ui/switch';

interface SwitchMenuItemV2Props {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function SwitchMenuItemV2({
  title,
  checked,
  onChange,
  disabled = false,
}: SwitchMenuItemV2Props) {
  return (
    <div className='flex w-full items-center justify-between rounded-xl bg-white p-4'>
      <span className='text-sm font-medium text-neutral-700'>{title}</span>
      <div className='shrink-0'>
        <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} />
      </div>
    </div>
  );
}
