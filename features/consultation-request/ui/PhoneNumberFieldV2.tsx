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
  const optionalText = dict.auth?.signup?.optional || '선택';

  const countryOptions = useMemo(
    () =>
      COUNTRY_CODES.map((country) => ({
        value: country.code,
        label: `${country.code} ${getCountryName(country, lang)}`,
      })),
    [lang],
  );

  const countryHasValue = !!countryCode;
  const phoneHasValue = phoneNumberOnly.trim().length > 0;

  const countryStateClass = error
    ? errorBorder
    : `${countryHasValue ? filledBorder : emptyBorder} ${focusClass} ${
        countryHasValue ? 'text-neutral-900' : 'text-neutral-400'
      }`;
  const phoneStateClass = error
    ? errorBorder
    : `${phoneHasValue ? filledBorder : emptyBorder} ${focusClass} text-neutral-900`;

  const countryClassName = `${baseInputClasses} h-[52px] appearance-none pr-10 ${countryStateClass} ${
    disabled ? disabledState : ''
  }`;
  const phoneInputClassName = `${baseInputClasses} h-[52px] ${phoneStateClass} ${
    disabled ? disabledState : ''
  }`;

  return (
    <div className='flex w-full flex-col gap-2'>
      <FieldLabel
        label={label}
        required={required}
        optionalText={!required ? optionalText : undefined}
      />
      <div className='flex gap-2'>
        <div className='w-32'>
          <select
            value={countryCode}
            onChange={(e) => onCountryCodeChange(e.target.value)}
            disabled={disabled}
            className={countryClassName}
            style={{
              backgroundImage: selectArrowSvg,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '20px',
              backgroundPosition: 'right 12px center',
            }}
          >
            <option value=''>
              {dict.auth?.signup?.placeholders?.countryCode || '국가번호를 선택하세요'}
            </option>
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
