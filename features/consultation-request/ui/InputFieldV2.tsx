'use client';

import { type InputHTMLAttributes, type ReactNode } from 'react';
import { FieldLabel } from './FieldLabel';
import { FieldError } from './FieldError';
import { baseInputClasses, buildStateClass, disabledState } from './form-field-styles';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  label: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
};

export function InputFieldV2({
  label,
  required,
  error,
  helperText,
  disabled,
  rightIcon,
  onRightIconClick,
  ...props
}: InputProps) {
  // disabled일 때는 disabled 스타일이 우선 적용되도록 처리
  // error가 있으면 error border 유지, 없으면 neutral-200 border 적용
  const borderClass = disabled
    ? error
      ? 'border-[#f31110] focus:border-[#f31110]'
      : 'border-neutral-200'
    : '';

  // disabled일 때는 stateClass를 적용하지 않고 disabled 스타일만 적용
  // disabled가 아닐 때만 stateClass 적용
  const stateClass = disabled ? '' : buildStateClass(props.value, error);
  const finalStateClass = disabled ? borderClass : stateClass;

  // 배경색 결정: 에러일 때는 #FFF3F3, disabled일 때는 disabledState의 배경색, 그 외에는 bg-white
  const backgroundColorClass = error && !disabled ? 'bg-[#FFF3F3]' : disabled ? '' : 'bg-white';

  // 오른쪽 아이콘 표시 여부 (rightIcon 또는 에러 아이콘)
  const hasRightIcon = rightIcon || error;
  const rightPaddingClass = hasRightIcon ? 'pr-11' : '';

  return (
    <div className='flex w-full flex-col gap-2'>
      <FieldLabel label={label} required={required} />
      <div className='relative'>
        <input
          {...props}
          disabled={disabled}
          className={`${baseInputClasses} h-[52px] ${finalStateClass} ${disabled ? disabledState : ''} ${backgroundColorClass} ${rightPaddingClass}`}
        />
        {rightIcon && !error && (
          <div
            className={`absolute inset-y-0 right-4 flex items-center text-neutral-400 ${
              onRightIconClick ? 'cursor-pointer' : 'pointer-events-none'
            }`}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </div>
        )}
        {error && (
          <div className='absolute inset-y-0 right-4 flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
            >
              <path
                d='M9.99935 18.3334C14.6017 18.3334 18.3327 14.6024 18.3327 10C18.3327 5.39765 14.6017 1.66669 9.99935 1.66669C5.39698 1.66669 1.66602 5.39765 1.66602 10C1.66602 14.6024 5.39698 18.3334 9.99935 18.3334Z'
                fill='#F31110'
              />
              <path
                d='M9.99935 14.1667C10.4596 14.1667 10.8327 13.7936 10.8327 13.3333C10.8327 12.8731 10.4596 12.5 9.99935 12.5C9.53911 12.5 9.16602 12.8731 9.16602 13.3333C9.16602 13.7936 9.53911 14.1667 9.99935 14.1667Z'
                fill='white'
              />
              <path
                d='M9.99935 10.8333C9.77834 10.8333 9.56637 10.7455 9.41009 10.5892C9.25381 10.433 9.16602 10.221 9.16602 9.99998V6.66665C9.16602 6.44563 9.25381 6.23367 9.41009 6.07739C9.56637 5.92111 9.77834 5.83331 9.99935 5.83331C10.2204 5.83331 10.4323 5.92111 10.5886 6.07739C10.7449 6.23367 10.8327 6.44563 10.8327 6.66665V9.99998C10.8327 10.221 10.7449 10.433 10.5886 10.5892C10.4323 10.7455 10.2204 10.8333 9.99935 10.8333Z'
                fill='white'
              />
            </svg>
          </div>
        )}
      </div>
      {helperText && !error && <p className='text-xs text-neutral-500'>{helperText}</p>}
      <FieldError message={error} />
    </div>
  );
}
