import { type Dictionary } from 'shared/model/types';

interface RequiredSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  children: React.ReactNode;
  dict?: Dictionary;
}

export function RequiredSelect({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  children,
  dict,
}: RequiredSelectProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>
        <span>
          <span style={{ color: '#AE33FB' }}>[{dict?.auth?.signup?.required || '필수'}]</span>{' '}
          {label}
        </span>
      </label>
      <div className='relative'>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className='w-full rounded-xl border border-transparent px-4 py-4 pr-8 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
          style={{
            appearance: 'none',
            backgroundImage: `linear-gradient(white, white), linear-gradient(90deg, #FF60F7 0%, #AE33FB 100%)`,
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}
        >
          <option value=''>{placeholder}</option>
          {children}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M16.25 7.08325L10.4167 12.9166L4.58333 7.08325' stroke='#A3A3A3' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
        </div>
      </div>
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}
