import { type Dictionary } from 'shared/model/types';

interface RequiredInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password';
}

export function RequiredInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  type = 'text',
}: RequiredInputProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>
        <span>
          <span style={{ color: '#AE33FB' }}>[필수]</span> {label}
        </span>
      </label>
      <div
        className='rounded-xl p-[2px]'
        style={{
          background: 'linear-gradient(90deg, #FF60F7 0%, #AE33FB 100%)',
        }}
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className='w-full rounded-xl border-0 bg-white px-4 py-4 text-sm text-neutral-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        />
      </div>
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}
