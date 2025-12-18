'use client';

import { useState } from 'react';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { MAX_MOBILE_WIDTH_CLASS, type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';
import { SelectFieldV2, PhoneNumberFieldV2 } from 'features/consultation-request/ui/FormFieldsV2';
import { FormDatePickerV2 } from 'features/consultation-request/ui/FormDatePickerV2';
import { COUNTRY_CODES, getCountryName } from 'entities/country-code';
import { useSignupForm } from 'features/email-auth/model/useSignupForm';
import { useEmailSignup } from 'features/email-auth/model/useEmailSignup';

interface SignUpContentV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function SignUpContentV2({ lang, dict, redirectTo }: SignUpContentV2Props) {
  const { formData, errors, updateField, validateForm } = useSignupForm({
    lang,
    dict,
  });
  const { signUpWithEmail, isLoading, error } = useEmailSignup({ locale: lang, dict });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    const result = await signUpWithEmail({
      email: formData.email,
      password: formData.password,
      passportName: formData.passportName,
      nationality: formData.nationality,
      gender: formData.gender,
      countryCode: formData.countryCode,
      phoneNumberOnly: formData.phoneNumberOnly,
      birthDate: formData.birthDate,
      marketingNotifications: false,
    });

    if (result.success) {
      const targetUrl = redirectTo || `/${lang}/main`;
      window.location.href = targetUrl;
    } else {
      setIsSubmitting(false);
    }
  };

  const isBusy = isLoading || isSubmitting;

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2
        title={dict.auth?.signup?.title || '회원가입'}
        fallbackUrl={`/${lang}/auth/login`}
      />

      <div className='h-[58px]' />

      <form id='signup-form-v2' onSubmit={handleSubmit} className='flex flex-col gap-5 p-5'>
        <InputFieldV2
          label={dict.auth?.signup?.email || '이메일'}
          required
          type='email'
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder={dict.auth?.signup?.placeholders?.email || 'your-email@example.com'}
          error={errors.email}
          disabled={isBusy}
        />

        <InputFieldV2
          label={dict.auth?.signup?.password || '비밀번호'}
          required
          type='password'
          value={formData.password}
          onChange={(e) => updateField('password', e.target.value)}
          placeholder={dict.auth?.signup?.placeholders?.password || '6자 이상의 비밀번호'}
          error={errors.password}
          disabled={isBusy}
        />

        <InputFieldV2
          label={dict.auth?.signup?.confirmPassword || '비밀번호 확인'}
          required
          type='password'
          value={formData.confirmPassword}
          onChange={(e) => updateField('confirmPassword', e.target.value)}
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
          onChange={(e) => updateField('passportName', e.target.value)}
          placeholder={
            dict.auth?.signup?.placeholders?.passportName || '여권에 기재된 영문 이름을 입력하세요'
          }
          error={errors.passportName}
          disabled={isBusy}
        />

        <SelectFieldV2
          label={dict.auth?.signup?.nationality || '국적'}
          value={formData.nationality}
          onChange={(value) => updateField('nationality', value)}
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
          onChange={(value) => updateField('gender', value)}
          options={genderOptions}
          placeholder={dict.auth?.signup?.placeholders?.gender || '성별을 선택하세요 (선택사항)'}
          error={errors.gender}
          disabled={isBusy}
        />

        {/* Date of Birth - 생년월일 (Optional 표시 포함) */}
        <FormDatePickerV2
          label={dict.auth?.signup?.birthDate || '생년월일'}
          value={formData.birthDate ? new Date(formData.birthDate) : undefined}
          onChange={(date) =>
            updateField('birthDate', date ? date.toISOString().split('T')[0] : '')
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

        {/* 휴대폰 번호 - ConsultationFormV2와 동일한 V2 컴포넌트 사용 */}
        <PhoneNumberFieldV2
          countryCode={formData.countryCode}
          phoneNumberOnly={formData.phoneNumberOnly}
          onCountryCodeChange={(value: string) => updateField('countryCode', value)}
          onPhoneNumberChange={(value: string) => updateField('phoneNumberOnly', value)}
          countryCodeError={errors.countryCode}
          phoneNumberError={errors.phoneNumberOnly}
          disabled={isBusy}
          lang={lang}
          dict={dict}
          required={false}
        />

        {error && (
          <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}
      </form>

      <div className='h-[112px]' />

      <div
        className={`fixed right-0 bottom-0 left-0 z-30 mx-auto border-t border-neutral-200 bg-white px-5 pt-4 pb-8 ${MAX_MOBILE_WIDTH_CLASS}`}
      >
        <button
          type='submit'
          form='signup-form-v2'
          disabled={isBusy}
          className='bg-sub-900 hover:bg-sub-900/90 h-14 w-full rounded-xl text-base leading-6 font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'
        >
          {dict.auth?.signup?.signupButton || '회원가입'}
        </button>
      </div>
    </div>
  );
}
