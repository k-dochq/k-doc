'use client';

interface FormCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  description: string;
  error?: string;
}

export function FormCheckbox({ checked, onChange, title, description, error }: FormCheckboxProps) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <label className='flex cursor-pointer items-start gap-3'>
        <input
          type='checkbox'
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className='mt-0.5 h-4 w-4 rounded border-neutral-300 text-[#da47ef] focus:ring-2 focus:ring-[#da47ef]'
        />
        <div className='flex flex-col gap-1 text-xs leading-4'>
          <div className='font-bold text-neutral-900'>{title}</div>
          <div className='font-normal text-neutral-500'>{description}</div>
        </div>
      </label>
      {error && <p className='ml-7 text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}
