import { type Dictionary } from 'shared/model/types';

interface OptionalSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  children: React.ReactNode;
  dict?: Dictionary;
}

export function OptionalSelect({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  children,
  dict,
}: OptionalSelectProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>
        <span>
          <span className='text-neutral-500'>[{dict?.auth?.signup?.optional || '선택'}]</span>{' '}
          {label}
        </span>
      </label>
      <div className='relative'>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full rounded-xl border px-4 py-4 pr-8 text-sm text-neutral-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            value ? 'border-transparent' : 'border-neutral-300'
          }`}
          style={{
            appearance: 'none',
            backgroundColor: 'white',
            backgroundImage: value 
              ? 'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)'
              : 'white',
            backgroundOrigin: value ? 'border-box' : undefined,
            backgroundClip: value 
              ? 'padding-box, border-box'
              : undefined,
            backgroundSize: value 
              ? '100% 100%, 100% 100%'
              : undefined,
          }}
          onFocus={(e) => {
            if (!value) {
              e.target.style.backgroundImage = 'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)';
              e.target.style.backgroundOrigin = 'border-box';
              e.target.style.backgroundClip = 'padding-box, border-box';
              e.target.style.backgroundSize = '100% 100%, 100% 100%';
              e.target.style.borderColor = 'transparent';
            }
          }}
          onBlur={(e) => {
            if (!value) {
              e.target.style.backgroundImage = 'white';
              e.target.style.backgroundOrigin = 'initial';
              e.target.style.backgroundClip = 'initial';
              e.target.style.backgroundSize = 'initial';
              e.target.style.borderColor = '';
            }
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
