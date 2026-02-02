'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';
import { SelectFieldV2, PhoneNumberFieldV2 } from 'features/consultation-request/ui/FormFieldsV2';
import { FormDatePickerV2 } from 'features/consultation-request/ui/FormDatePickerV2';
import { SignupFloatingButton } from 'features/email-auth';
import { COUNTRY_CODES, getCountryName } from 'entities/country-code';
import {
  type AdditionalInfoFormData,
  type AdditionalInfoFormErrors,
} from '../model/useAdditionalInfoForm';

interface AdditionalInfoStep1FormV2Props {
  lang: Locale;
  dict: Dictionary;
  userEmail: string;
  formData: AdditionalInfoFormData;
  errors: AdditionalInfoFormErrors;
  isBusy: boolean;
  onUpdateField: <K extends keyof AdditionalInfoFormData>(
    field: K,
    value: AdditionalInfoFormData[K],
  ) => void;
  onNextStep: () => void;
  formId: string;
}

export function AdditionalInfoStep1FormV2({
  lang,
  dict,
  userEmail,
  formData,
  errors,
  isBusy,
  onUpdateField,
  onNextStep,
  formId,
}: AdditionalInfoStep1FormV2Props) {
  const getNationalityKey = (countryCode: string): string => {
    const country = COUNTRY_CODES.find((c) => c.code === countryCode);
    if (!country) return '';
    return country.name.toLowerCase().replace(/\s+/g, '_');
  };

  const nationalityOptions = COUNTRY_CODES.map((country) => ({
    value: getNationalityKey(country.code),
    label: getCountryName(country),
  }));

  const genderOptions = [
    { value: 'female', label: dict.auth?.signup?.genders?.female || '여성' },
    { value: 'male', label: dict.auth?.signup?.genders?.male || '남성' },
  ] as const;

  return (
    <>
      <form id={formId} className='flex flex-col gap-5 p-5'>
        {/* 이메일 표시 (읽기 전용) */}
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-neutral-700'>
            {dict.auth?.signup?.email || 'Email'}
            <span className='ml-1 text-red-500'>*</span>
          </label>
          <input
            type='email'
            value={userEmail}
            disabled
            className='w-full cursor-not-allowed rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-neutral-500'
          />
          <p className='text-xs text-neutral-500'>
            {dict.auth?.additionalInfo?.emailReadonly || 'This is your social account email'}
          </p>
        </div>

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
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />

        <SelectFieldV2
          label={dict.auth?.signup?.nationality || '국적'}
          value={formData.nationality}
          onChange={(value) => onUpdateField('nationality', value)}
          options={nationalityOptions}
          placeholder={
            dict.auth?.signup?.placeholders?.nationality || '국적을 선택하세요 (선택사항)'
          }
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

      <div className='h-[112px]' />

      <SignupFloatingButton
        label={dict.auth?.signup?.signupButton || '회원가입'}
        onClick={onNextStep}
        disabled={isBusy}
      />
    </>
  );
}
