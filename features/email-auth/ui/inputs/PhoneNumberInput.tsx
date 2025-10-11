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
  hideRequiredLabel?: boolean;
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
  hideRequiredLabel = false,
}: PhoneNumberInputProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>
        <span>
          {!hideRequiredLabel && (
            <>
              {required ? (
                <span className='text-red-500'>*</span>
              ) : (
                <span className='text-neutral-500'>[{dict.auth?.signup?.optional || '선택'}]</span>
              )}{' '}
            </>
          )}
          {dict.consultation?.request?.form?.phoneNumber?.label ||
            dict.auth?.signup?.phoneNumber ||
            '휴대폰번호'}
        </span>
      </label>
      <div className='flex gap-1'>
        {/* 국가번호 선택 */}
        <div className='w-32'>
          <div className='relative'>
            <select
              value={countryCode}
              onChange={(e) => onCountryCodeChange(e.target.value)}
              disabled={disabled}
              className={`w-full rounded-xl border px-3 py-4 pr-8 text-sm text-neutral-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                countryCode ? 'border-transparent' : 'border-neutral-300'
              }`}
              style={{
                appearance: 'none',
                backgroundColor: 'white',
                backgroundImage: countryCode 
                  ? 'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)'
                  : 'white',
                backgroundOrigin: countryCode ? 'border-box' : undefined,
                backgroundClip: countryCode 
                  ? 'padding-box, border-box'
                  : undefined,
                backgroundSize: countryCode 
                  ? '100% 100%, 100% 100%'
                  : undefined,
              }}
              onFocus={(e) => {
                if (!countryCode) {
                  e.target.style.backgroundImage = 'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)';
                  e.target.style.backgroundOrigin = 'border-box';
                  e.target.style.backgroundClip = 'padding-box, border-box';
                  e.target.style.backgroundSize = '100% 100%, 100% 100%';
                  e.target.style.borderColor = 'transparent';
                }
              }}
              onBlur={(e) => {
                if (!countryCode) {
                  e.target.style.backgroundImage = 'white';
                  e.target.style.backgroundOrigin = 'initial';
                  e.target.style.backgroundClip = 'initial';
                  e.target.style.backgroundSize = 'initial';
                  e.target.style.borderColor = '';
                }
              }}
            >
              <option value=''>
                {dict.auth?.signup?.placeholders?.countryCode || '국가번호를 선택하세요'}
              </option>
              {COUNTRY_CODES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code} {getCountryName(country, lang)}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M16.25 7.08325L10.4167 12.9166L4.58333 7.08325' stroke='#A3A3A3' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
              </svg>
            </div>
          </div>
        </div>
        {/* 휴대폰번호 입력 */}
        <div className='flex-1'>
          <input
            type='tel'
            value={phoneNumberOnly}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            placeholder={
              required
                ? dict.consultation?.request?.form?.phoneNumber?.placeholder ||
                  dict.auth?.signup?.placeholders?.phoneNumberOnly ||
                  '휴대폰번호를 입력하세요'
                : dict.auth?.signup?.placeholders?.phoneNumberOnly || '휴대폰번호를 입력하세요'
            }
            disabled={disabled}
            className={`w-full rounded-xl border px-4 py-4 text-sm text-neutral-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
              phoneNumberOnly ? 'border-transparent' : 'border-neutral-300'
            }`}
            style={{
              backgroundColor: 'white',
              backgroundImage: phoneNumberOnly 
                ? 'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)'
                : 'white',
              backgroundOrigin: phoneNumberOnly ? 'border-box' : undefined,
              backgroundClip: phoneNumberOnly 
                ? 'padding-box, border-box'
                : undefined,
              backgroundSize: phoneNumberOnly 
                ? '100% 100%, 100% 100%'
                : undefined,
            }}
            onFocus={(e) => {
              if (!phoneNumberOnly) {
                e.target.style.backgroundImage = 'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)';
                e.target.style.backgroundOrigin = 'border-box';
                e.target.style.backgroundClip = 'padding-box, border-box';
                e.target.style.backgroundSize = '100% 100%, 100% 100%';
                e.target.style.borderColor = 'transparent';
              }
            }}
            onBlur={(e) => {
              if (!phoneNumberOnly) {
                e.target.style.backgroundImage = 'white';
                e.target.style.backgroundOrigin = 'initial';
                e.target.style.backgroundClip = 'initial';
                e.target.style.backgroundSize = 'initial';
                e.target.style.borderColor = '';
              }
            }}
          />
        </div>
      </div>
      {(countryCodeError || phoneNumberError) && (
        <p className='text-sm leading-5 text-red-500'>{countryCodeError || phoneNumberError}</p>
      )}
    </div>
  );
}
