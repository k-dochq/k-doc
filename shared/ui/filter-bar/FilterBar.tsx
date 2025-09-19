'use client';

import { useSearchParams } from 'next/navigation';
import { type Locale } from 'shared/config';
import { LocaleLink } from 'shared/ui/locale-link';

export interface FilterOption<T = string> {
  value: T;
  label: string;
  isDefault?: boolean;
}

interface FilterBarProps<T = string> {
  lang: Locale;
  options: FilterOption<T>[];
  basePath: string;
  paramName?: string;
  className?: string;
  rightContent?: React.ReactNode;
}

export function FilterBar<T extends string = string>({
  lang,
  options,
  basePath,
  paramName = 'sort',
  className = 'flex items-center justify-between border-t border-b border-white/60 bg-white/20 px-5 py-3',
  rightContent,
}: FilterBarProps<T>) {
  const searchParams = useSearchParams();

  // 현재 쿼리 파라미터를 유지하면서 특정 파라미터만 변경하는 헬퍼 함수
  const createFilterUrl = (value: T) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set(paramName, value);
    return `${basePath}?${params.toString()}`;
  };

  // 현재 선택된 옵션 가져오기
  const getCurrentOption = (): T => {
    const currentValue = searchParams?.get(paramName);
    const validOption = options.find((option) => option.value === currentValue);

    if (validOption) {
      return validOption.value;
    }

    // 기본값 찾기
    const defaultOption = options.find((option) => option.isDefault);
    return defaultOption ? defaultOption.value : options[0]?.value;
  };

  const currentOption = getCurrentOption();

  return (
    <div className={className}>
      <div className='flex items-center gap-2'>
        {options.map((option, index) => (
          <div key={option.value} className='flex items-center gap-2'>
            <LocaleLink
              href={createFilterUrl(option.value)}
              replace
              className={`text-[13px] ${
                currentOption === option.value
                  ? 'text-primary font-semibold'
                  : 'font-medium text-neutral-900'
              }`}
            >
              {option.label}
            </LocaleLink>
            {index < options.length - 1 && (
              <div className='h-3 w-0 border-l border-neutral-900'></div>
            )}
          </div>
        ))}
      </div>
      {rightContent && <div>{rightContent}</div>}
    </div>
  );
}
