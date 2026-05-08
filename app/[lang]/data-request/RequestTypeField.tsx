'use client';

interface RequestTypeFieldProps {
  label: string;
  placeholder: string;
  updateLabel: string;
  deleteLabel: string;
  value: 'UPDATE' | 'DELETE' | '';
  error?: string;
  onChange: (value: 'UPDATE' | 'DELETE' | '') => void;
}

export function RequestTypeField({
  label,
  placeholder,
  updateLabel,
  deleteLabel,
  value,
  error,
  onChange,
}: RequestTypeFieldProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <p className='text-base leading-6 font-semibold text-neutral-700'>
        {label} <span className='text-[#f31110]'>*</span>
      </p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as 'UPDATE' | 'DELETE' | '')}
        className='h-[52px] rounded-xl border border-neutral-400 bg-white px-4 text-sm text-neutral-700'
      >
        <option value=''>{placeholder}</option>
        <option value='UPDATE'>{updateLabel}</option>
        <option value='DELETE'>{deleteLabel}</option>
      </select>
      {error ? <p className='text-xs text-[#f31110]'>{error}</p> : null}
    </div>
  );
}
