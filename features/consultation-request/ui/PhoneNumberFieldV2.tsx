'use client';

import { useMemo } from 'react';
import { COUNTRY_CODES, getCountryName } from 'entities/country-code';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FieldLabel } from './FieldLabel';
import { FieldError } from './FieldError';
import {
  baseInputClasses,
  selectArrowSvg,
  focusClass,
  emptyBorder,
  filledBorder,
  errorBorder,
  disabledState,
} from './form-field-styles';

interface PhoneNumberFieldProps {
  countryCode: string;
  phoneNumberOnly: string;
  onCountryCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  countryCodeError?: string;
  phoneNumberError?: string;
  disabled?: boolean;
  lang: Locale;
  dict: Dictionary;
  required?: boolean;
}

export function PhoneNumberFieldV2({
  countryCode,
  phoneNumberOnly,
  onCountryCodeChange,
  onPhoneNumberChange,
  countryCodeError,
  phoneNumberError,
  disabled = false,
  lang,
  dict,
  required = false,
}: PhoneNumberFieldProps) {
  const error = countryCodeError || phoneNumberError;
  const label =
    dict.consultation?.request?.form?.phoneNumber?.label ||
    dict.auth?.signup?.phoneNumber ||
    '휴대폰번호';
  const placeholder =
    dict.consultation?.request?.form?.phoneNumber?.placeholder ||
    dict.auth?.signup?.placeholders?.phoneNumberOnly ||
    '휴대폰번호를 입력하세요';
  const optionalText = '';

  const countryOptions = useMemo(
    () =>
      COUNTRY_CODES.map((country) => ({
        value: country.code,
        label: `${country.code} ${getCountryName(country)}`,
        key: `${country.code}-${country.name}`, // 고유한 key 생성
      })),
    [],
  );

  const countryHasValue = !!countryCode;
  const phoneHasValue = phoneNumberOnly.trim().length > 0;
  const countryPlaceholder = dict.auth?.signup?.placeholders?.countryCode || 'Select';
  const selectedCountry = countryOptions.find((option) => option.value === countryCode);
  const triggerText = countryHasValue ? (selectedCountry?.value ?? '') : countryPlaceholder;
  const triggerTextClass = countryHasValue ? 'text-neutral-900' : 'text-neutral-400';

  const countryStateClass = error
    ? errorBorder
    : `${countryHasValue ? filledBorder : emptyBorder} ${focusClass} ${
        countryHasValue ? 'text-neutral-900' : 'text-neutral-400'
      }`;
  const phoneStateClass = error
    ? errorBorder
    : `${phoneHasValue ? filledBorder : emptyBorder} ${focusClass} text-neutral-900`;

  const countryClassName = `${baseInputClasses} h-[52px] appearance-none pr-10 ${countryStateClass} ${
    disabled ? disabledState : 'bg-white'
  }`;
  const phoneInputClassName = `${baseInputClasses} h-[52px] ${phoneStateClass} ${
    disabled ? disabledState : 'bg-white'
  }`;

  return (
    <div className='flex w-full flex-col gap-2'>
      <FieldLabel
        label={label}
        required={required}
        optionalText={!required ? optionalText : undefined}
      />
      <div className='flex gap-2'>
        <div className='w-[94px] max-w-[94px]'>
          <div className='relative'>
            <select
              value={countryCode}
              onChange={(e) => onCountryCodeChange(e.target.value)}
              disabled={disabled}
              className={`${countryClassName} text-transparent`}
              style={{
                backgroundImage: selectArrowSvg,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20px',
                backgroundPosition: 'right 12px center',
              }}
            >
              <option value=''>{countryPlaceholder}</option>
              {countryOptions.map((option) => (
                <option key={option.key} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span
              className={`pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm leading-6 ${triggerTextClass}`}
            >
              {triggerText}
            </span>
          </div>
        </div>
        <div className='flex-1'>
          <input
            type='tel'
            value={phoneNumberOnly}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, '');
              onPhoneNumberChange(numericValue);
            }}
            placeholder={placeholder}
            disabled={disabled}
            className={phoneInputClassName}
          />
        </div>
      </div>
      <FieldError message={error} />
    </div>
  );
}
