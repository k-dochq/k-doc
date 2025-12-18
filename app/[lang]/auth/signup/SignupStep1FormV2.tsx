'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';
import { SelectFieldV2, PhoneNumberFieldV2 } from 'features/consultation-request/ui/FormFieldsV2';
import { FormDatePickerV2 } from 'features/consultation-request/ui/FormDatePickerV2';
import {
  type SignupFormData,
  type SignupFormErrors,
} from 'features/email-auth/model/useSignupForm';
import { COUNTRY_CODES, getCountryName } from 'entities/country-code';

interface SignupStep1FormV2Props {
  lang: Locale;
  dict: Dictionary;
  formData: SignupFormData;
  errors: SignupFormErrors;
  isBusy: boolean;
  onUpdateField: <K extends keyof SignupFormData>(field: K, value: SignupFormData[K]) => void;
  formId: string;
}

export function SignupStep1FormV2({
  lang,
  dict,
  formData,
  errors,
  isBusy,
  onUpdateField,
  formId,
}: SignupStep1FormV2Props) {
  const getNationalityKey = (countryCode: string): string => {
    const country = COUNTRY_CODES.find((c) => c.code === countryCode);
    if (!country) return '';
    return country.name.toLowerCase().replace(/\s+/g, '_');
  };

  const nationalityOptions = COUNTRY_CODES.map((country) => ({
    value: getNationalityKey(country.code),
    label: getCountryName(country, lang),
  }));

  const genderOptions = [
    { value: 'female', label: dict.auth?.signup?.genders?.female || '여성' },
    { value: 'male', label: dict.auth?.signup?.genders?.male || '남성' },
  ] as const;

  return (
    <form id={formId} className='flex flex-col gap-5 p-5'>
      <InputFieldV2
        label={dict.auth?.signup?.email || '이메일'}
        required
        type='email'
        value={formData.email}
        onChange={(e) => onUpdateField('email', e.target.value)}
        placeholder={dict.auth?.signup?.placeholders?.email || 'your-email@example.com'}
        error={errors.email}
        disabled={isBusy}
      />

      <InputFieldV2
        label={dict.auth?.signup?.password || '비밀번호'}
        required
        type='password'
        value={formData.password}
        onChange={(e) => onUpdateField('password', e.target.value)}
        placeholder={dict.auth?.signup?.placeholders?.password || '6자 이상의 비밀번호'}
        error={errors.password}
        disabled={isBusy}
      />

      <InputFieldV2
        label={dict.auth?.signup?.confirmPassword || '비밀번호 확인'}
        required
        type='password'
        value={formData.confirmPassword}
        onChange={(e) => onUpdateField('confirmPassword', e.target.value)}
        placeholder={
          dict.auth?.signup?.placeholders?.confirmPassword || '비밀번호를 다시 입력하세요'
        }
        error={errors.confirmPassword}
        disabled={isBusy}
      />

      <InputFieldV2
        label={dict.auth?.signup?.passportName || '여권 영문 이름'}
        required
        type='text'
        value={formData.passportName}
        onChange={(e) => onUpdateField('passportName', e.target.value)}
        placeholder={
          dict.auth?.signup?.placeholders?.passportName || '여권에 기재된 영문 이름을 입력하세요'
        }
        error={errors.passportName}
        disabled={isBusy}
      />

      <SelectFieldV2
        label={dict.auth?.signup?.nationality || '국적'}
        value={formData.nationality}
        onChange={(value) => onUpdateField('nationality', value)}
        options={nationalityOptions}
        placeholder={dict.auth?.signup?.placeholders?.nationality || '국적을 선택하세요 (선택사항)'}
        error={errors.nationality}
        disabled={isBusy}
      />

      <SelectFieldV2
        label={dict.auth?.signup?.gender || '성별'}
        value={formData.gender}
        onChange={(value) => onUpdateField('gender', value)}
        options={genderOptions}
        placeholder={dict.auth?.signup?.placeholders?.gender || '성별을 선택하세요 (선택사항)'}
        error={errors.gender}
        disabled={isBusy}
      />

      <FormDatePickerV2
        label={dict.auth?.signup?.birthDate || '생년월일'}
        value={formData.birthDate ? new Date(formData.birthDate) : undefined}
        onChange={(date) =>
          onUpdateField('birthDate', date ? date.toISOString().split('T')[0] : '')
        }
        locale={lang}
        dict={dict}
        placeholder={
          dict.auth?.signup?.placeholders?.birthDate || '생년월일을 선택하세요 (선택사항)'
        }
        error={errors.birthDate}
        required={false}
        yearRange={{ from: 1950, to: new Date().getFullYear() }}
        disabled={(date) => date > new Date()}
      />

      <PhoneNumberFieldV2
        countryCode={formData.countryCode}
        phoneNumberOnly={formData.phoneNumberOnly}
        onCountryCodeChange={(value: string) => onUpdateField('countryCode', value)}
        onPhoneNumberChange={(value: string) => onUpdateField('phoneNumberOnly', value)}
        countryCodeError={errors.countryCode}
        phoneNumberError={errors.phoneNumberOnly}
        disabled={isBusy}
        lang={lang}
        dict={dict}
        required={false}
      />
    </form>
  );
}
