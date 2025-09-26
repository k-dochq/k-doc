import { type Dictionary } from 'shared/model/types';

interface OptionalInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'tel' | 'date';
  dict?: Dictionary;
}

export function OptionalInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  type = 'text',
  dict,
}: OptionalInputProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>
        <span>
          <span className='text-neutral-500'>[{dict?.auth?.signup?.optional || '선택'}]</span>{' '}
          {label}
        </span>
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className='w-full rounded-xl border border-neutral-300 bg-white px-4 py-4 text-sm text-neutral-900 focus:border-transparent focus:ring-2 focus:ring-[#DA47EF] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
      />
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}
