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
import { SignupFloatingButton } from 'features/email-auth';
import { COUNTRY_CODES, getCountryName } from 'entities/country-code';

interface SignupStep1FormV2Props {
  lang: Locale;
  dict: Dictionary;
  formData: SignupFormData;
  errors: SignupFormErrors;
  isBusy: boolean;
  onUpdateField: <K extends keyof SignupFormData>(field: K, value: SignupFormData[K]) => void;
  onNextStep: () => void;
  formId: string;
}

export function SignupStep1FormV2({
  lang,
  dict,
  formData,
  errors,
  isBusy,
  onUpdateField,
  onNextStep,
  formId,
}: SignupStep1FormV2Props) {
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
    { value: 'female', label: dict.auth?.signup?.genders?.female || 'Female' },
    { value: 'male', label: dict.auth?.signup?.genders?.male || 'Male' },
  ] as const;

  return (
    <>
      <form id={formId} className='flex flex-col gap-5 p-5'>
        <InputFieldV2
          label={dict.auth?.signup?.email || 'Email'}
          required
          type='email'
          value={formData.email}
          onChange={(e) => onUpdateField('email', e.target.value)}
          placeholder={dict.auth?.signup?.placeholders?.email || 'your-email@example.com'}
          error={errors.email}
          disabled={isBusy}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />

        <InputFieldV2
          label={dict.auth?.signup?.password || 'Password'}
          required
          type='password'
          value={formData.password}
          onChange={(e) => onUpdateField('password', e.target.value)}
          placeholder={dict.auth?.signup?.placeholders?.password || '6+ characters'}
          error={errors.password}
          disabled={isBusy}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />

        <InputFieldV2
          label={dict.auth?.signup?.confirmPassword || 'Confirm Password'}
          required
          type='password'
          value={formData.confirmPassword}
          onChange={(e) => onUpdateField('confirmPassword', e.target.value)}
          placeholder={dict.auth?.signup?.placeholders?.confirmPassword || 'Confirm your password'}
          error={errors.confirmPassword}
          disabled={isBusy}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />

        <InputFieldV2
          label={dict.auth?.signup?.passportName || 'Passport Name (English)'}
          required
          type='text'
          value={formData.passportName}
          onChange={(e) => onUpdateField('passportName', e.target.value)}
          placeholder={
            dict.auth?.signup?.placeholders?.passportName || 'Enter your passport name in English'
          }
          error={errors.passportName}
          disabled={isBusy}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />

        <SelectFieldV2
          label={dict.auth?.signup?.nationality || 'Nationality'}
          value={formData.nationality}
          onChange={(value) => onUpdateField('nationality', value)}
          options={nationalityOptions}
          placeholder={dict.auth?.signup?.placeholders?.nationality || 'Select your nationality'}
          error={errors.nationality}
          disabled={isBusy}
        />

        <SelectFieldV2
          label={dict.auth?.signup?.gender || 'Gender'}
          value={formData.gender}
          onChange={(value) => onUpdateField('gender', value)}
          options={genderOptions}
          placeholder={dict.auth?.signup?.placeholders?.gender || 'Select your gender'}
          error={errors.gender}
          disabled={isBusy}
        />

        <FormDatePickerV2
          label={dict.auth?.signup?.birthDate || 'Date of Birth'}
          value={formData.birthDate ? new Date(formData.birthDate) : undefined}
          onChange={(date) =>
            onUpdateField('birthDate', date ? date.toISOString().split('T')[0] : '')
          }
          locale={lang}
          dict={dict}
          placeholder={dict.auth?.signup?.placeholders?.birthDate || 'Select your date of birth'}
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
        label={dict.auth?.signup?.signupButton || 'Register'}
        onClick={onNextStep}
        disabled={isBusy}
      />
    </>
  );
}
