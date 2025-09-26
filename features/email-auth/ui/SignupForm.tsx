'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FormButton } from 'shared/ui/form-button';
import { useSignupForm } from 'features/email-auth/model/useSignupForm';
import { useEmailSignup } from 'features/email-auth/model/useEmailSignup';
import { TermsAgreement } from 'features/terms-agreement';
import {
  RequiredInput,
  OptionalInput,
  OptionalSelect,
  RequiredSelect,
  PhoneNumberInput,
} from './inputs';

interface AgreementState {
  allAgreed: boolean;
  age14Plus: boolean;
  termsOfService: boolean;
  privacyPolicy: boolean;
  marketingNotifications: boolean;
}

interface SignupFormProps {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function SignupForm({ lang, dict, redirectTo }: SignupFormProps) {
  const { formData, errors, updateField, validateForm, isFormValid } = useSignupForm({
    lang,
    dict,
  });
  const { signUpWithEmail, isLoading, error } = useEmailSignup({ locale: lang, dict });

  const [agreements, setAgreements] = useState<AgreementState>({
    allAgreed: false,
    age14Plus: false,
    termsOfService: false,
    privacyPolicy: false,
    marketingNotifications: false,
  });

  // 필수 약관 동의 여부 확인
  const isRequiredAgreementsValid =
    agreements.age14Plus && agreements.termsOfService && agreements.privacyPolicy;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !isRequiredAgreementsValid) {
      return;
    }

    const result = await signUpWithEmail({
      email: formData.email,
      password: formData.password,
      passportName: formData.passportName,
      nationality: formData.nationality,
      gender: formData.gender,
      countryCode: formData.countryCode,
      phoneNumberOnly: formData.phoneNumberOnly,
      birthDate: formData.birthDate,
    });

    if (result.success) {
      // 회원가입 성공 시 redirectTo가 있으면 해당 페이지로, 없으면 메인 페이지로 이동
      const targetUrl = redirectTo || `/${lang}/main`;
      window.location.href = targetUrl;
    }
  };

  return (
    <div className='flex w-full flex-col gap-5'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        {/* 이메일 입력 */}
        <RequiredInput
          label={dict.auth?.signup?.email || '이메일'}
          value={formData.email}
          onChange={(value) => updateField('email', value)}
          placeholder={dict.auth?.signup?.placeholders?.email || 'your-email@example.com'}
          error={errors.email}
          disabled={isLoading}
          type='email'
          dict={dict}
        />

        {/* 비밀번호 입력 */}
        <RequiredInput
          label={dict.auth?.signup?.password || '비밀번호'}
          value={formData.password}
          onChange={(value) => updateField('password', value)}
          placeholder={dict.auth?.signup?.placeholders?.password || '6자 이상의 비밀번호'}
          error={errors.password}
          disabled={isLoading}
          type='password'
          dict={dict}
        />

        {/* 비밀번호 확인 입력 */}
        <RequiredInput
          label={dict.auth?.signup?.confirmPassword || '비밀번호 확인'}
          value={formData.confirmPassword}
          onChange={(value) => updateField('confirmPassword', value)}
          placeholder={
            dict.auth?.signup?.placeholders?.confirmPassword || '비밀번호를 다시 입력하세요'
          }
          error={errors.confirmPassword}
          disabled={isLoading}
          type='password'
          dict={dict}
        />

        {/* 여권 영문 이름 입력 (필수) */}
        <RequiredInput
          label={dict.auth?.signup?.passportName || '여권 영문 이름'}
          value={formData.passportName}
          onChange={(value) => updateField('passportName', value)}
          placeholder={
            dict.auth?.signup?.placeholders?.passportName || '여권에 기재된 영문 이름을 입력하세요'
          }
          error={errors.passportName}
          disabled={isLoading}
          type='text'
          dict={dict}
        />

        {/* 국적 입력 (선택) */}
        <OptionalSelect
          label={dict.auth?.signup?.nationality || '국적'}
          value={formData.nationality}
          onChange={(value) => updateField('nationality', value)}
          placeholder={
            dict.auth?.signup?.placeholders?.nationality || '국적을 선택하세요 (선택사항)'
          }
          error={errors.nationality}
          disabled={isLoading}
          dict={dict}
        >
          <option value='thailand'>{dict.auth?.signup?.nationalities?.thailand || '태국'}</option>
          <option value='korea'>{dict.auth?.signup?.nationalities?.korea || '한국'}</option>
        </OptionalSelect>

        {/* 성별 입력 (필수) */}
        <RequiredSelect
          label={dict.auth?.signup?.gender || '성별'}
          value={formData.gender}
          onChange={(value) => updateField('gender', value)}
          placeholder={dict.auth?.signup?.placeholders?.gender || '성별을 선택하세요'}
          error={errors.gender}
          disabled={isLoading}
          dict={dict}
        >
          <option value='female'>{dict.auth?.signup?.genders?.female || '여성'}</option>
          <option value='male'>{dict.auth?.signup?.genders?.male || '남성'}</option>
        </RequiredSelect>

        {/* 휴대폰번호 입력 (선택) */}
        <PhoneNumberInput
          countryCode={formData.countryCode}
          phoneNumberOnly={formData.phoneNumberOnly}
          onCountryCodeChange={(value) => updateField('countryCode', value)}
          onPhoneNumberChange={(value) => updateField('phoneNumberOnly', value)}
          countryCodeError={errors.countryCode}
          phoneNumberError={errors.phoneNumberOnly}
          disabled={isLoading}
          lang={lang}
          dict={dict}
        />

        {/* 생년월일 입력 (선택) */}
        <OptionalInput
          label={dict.auth?.signup?.birthDate || '생년월일'}
          value={formData.birthDate}
          onChange={(value) => updateField('birthDate', value)}
          placeholder={
            dict.auth?.signup?.placeholders?.birthDate || '생년월일을 선택하세요 (선택사항)'
          }
          error={errors.birthDate}
          disabled={isLoading}
          type='date'
          dict={dict}
        />

        {/* 에러 메시지 */}
        {error && (
          <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        {/* 약관동의 섹션 */}
        <TermsAgreement lang={lang} dict={dict} onAgreementChange={setAgreements} />

        {/* 약관 동의 에러 메시지 */}
        {!isRequiredAgreementsValid && (
          <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
            <p className='text-sm text-red-600'>
              {dict.auth?.signup?.termsAgreement?.requiredError || '필수 약관에 동의해주세요.'}
            </p>
          </div>
        )}

        {/* 회원가입 버튼 */}
        <FormButton type='submit' loading={isLoading} disabled={isLoading}>
          {dict.auth?.signup?.signupButton || '회원가입'}
        </FormButton>
      </form>
    </div>
  );
}
