import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { COUNTRY_CODES, getCountryName } from 'entities/country-code';

interface PhoneNumberInputProps {
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

export function PhoneNumberInput({
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
}: PhoneNumberInputProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>
        <span>
          {required ? (
            <span className='text-red-500'>*</span>
          ) : (
            <span className='text-neutral-500'>[{dict.auth?.signup?.optional || '선택'}]</span>
          )}{' '}
          {dict.consultation?.request?.form?.phoneNumber?.label ||
            dict.auth?.signup?.phoneNumber ||
            '휴대폰번호'}
        </span>
      </label>
      <div className='flex gap-2'>
        {/* 국가번호 선택 */}
        <div className='w-32'>
          <select
            value={countryCode}
            onChange={(e) => onCountryCodeChange(e.target.value)}
            disabled={disabled}
            className='w-full rounded-xl border border-neutral-300 bg-white px-3 py-4 pr-8 text-sm text-neutral-900 focus:border-transparent focus:ring-2 focus:ring-[#DA47EF] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            style={{
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M16.25 7.08325L10.4167 12.9166L4.58333 7.08325' stroke='%23A3A3A3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '20px',
              backgroundPosition: 'right 8px center',
            }}
          >
            <option value=''>
              {dict.auth?.signup?.placeholders?.countryCode || '국가번호를 선택하세요'}
            </option>
            {COUNTRY_CODES.map((country) => {
              const label = `${country.code} ${getCountryName(country)}`;
              return (
                <option key={`${country.code}-${country.name}`} value={country.code}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
        {/* 휴대폰번호 입력 */}
        <div className='flex-1'>
          <input
            type='tel'
            value={phoneNumberOnly}
            onChange={(e) => {
              // 숫자만 입력 가능하도록 필터링
              const numericValue = e.target.value.replace(/[^0-9]/g, '');
              onPhoneNumberChange(numericValue);
            }}
            placeholder={
              required
                ? dict.consultation?.request?.form?.phoneNumber?.placeholder ||
                  dict.auth?.signup?.placeholders?.phoneNumberOnly ||
                  '휴대폰번호를 입력하세요'
                : dict.auth?.signup?.placeholders?.phoneNumberOnly || '휴대폰번호를 입력하세요'
            }
            disabled={disabled}
            className='w-full rounded-xl border border-neutral-300 bg-white px-4 py-4 text-sm text-neutral-900 focus:border-transparent focus:ring-2 focus:ring-[#DA47EF] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
          />
        </div>
      </div>
      {(countryCodeError || phoneNumberError) && (
        <p className='text-sm leading-5 text-red-500'>{countryCodeError || phoneNumberError}</p>
      )}
    </div>
  );
}
