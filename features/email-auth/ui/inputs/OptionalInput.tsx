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
        placeholder={type === 'date' ? dict?.auth?.signup?.dateFormat || '연도.월.일' : placeholder}
        disabled={disabled}
        className='w-full rounded-xl border border-neutral-300 bg-white px-4 py-4 text-sm text-neutral-900 focus:border-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        style={{
          backgroundImage: 'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          backgroundSize: '100% 100%, 100% 100%',
        }}
      />
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}
