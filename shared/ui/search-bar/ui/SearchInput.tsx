import { SearchIconV2 } from '../SearchIconV2';

interface SearchInputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

export function SearchInput({ value, placeholder, onChange, onKeyDown, onFocus }: SearchInputProps) {
  return (
    <div className='flex items-center gap-1.5 rounded-full border border-neutral-200 bg-[#f1f1f1] px-4 py-3'>
      <div className='shrink-0'>
        <SearchIconV2 />
      </div>
      <div className='flex-1'>
        <input
          type='text'
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          placeholder={placeholder}
          className='w-full bg-transparent text-sm font-medium text-gray-900 placeholder-neutral-400 focus:outline-none'
        />
      </div>
    </div>
  );
}
