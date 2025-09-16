'use client';

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly RadioOption[];
  error?: string;
}

export function FormRadioGroup({ label, value, onChange, options, error }: FormRadioGroupProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>{label}</label>
      <div className='flex gap-4'>
        {options.map((option) => (
          <label key={option.value} className='flex cursor-pointer items-center gap-2'>
            <input
              type='radio'
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className='h-4 w-4 border-neutral-300 text-[#da47ef] focus:ring-2 focus:ring-[#da47ef]'
            />
            <span className='text-sm leading-5 text-neutral-900'>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}
