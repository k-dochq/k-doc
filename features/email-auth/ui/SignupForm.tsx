'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FormInput } from 'shared/ui/form-input';
import { FormButton } from 'shared/ui/form-button';
import { useSignupForm } from 'features/email-auth/model/useSignupForm';
import { useEmailSignup } from 'features/email-auth/model/useEmailSignup';
import { TermsAgreement } from 'features/terms-agreement';
import { COUNTRY_CODES, getCountryName } from 'entities/country-code';

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
        <div className='flex w-full flex-col gap-2'>
          <label className='text-sm leading-5 font-medium text-neutral-900'>
            <span>
              <span style={{ color: '#AE33FB' }}>[{dict.auth?.signup?.required || '필수'}]</span>{' '}
              {dict.auth?.signup?.email || '이메일'}
            </span>
          </label>
          <div
            className='rounded-xl p-[2px]'
            style={{
              background: 'linear-gradient(90deg, #FF60F7 0%, #AE33FB 100%)',
            }}
          >
            <input
              type='email'
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder={dict.auth?.signup?.placeholders?.email || 'your-email@example.com'}
              disabled={isLoading}
              className='w-full rounded-xl border-0 bg-white px-4 py-4 text-sm text-neutral-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            />
          </div>
          {errors.email && <p className='text-sm leading-5 text-red-500'>{errors.email}</p>}
        </div>

        {/* 비밀번호 입력 */}
        <div className='flex w-full flex-col gap-2'>
          <label className='text-sm leading-5 font-medium text-neutral-900'>
            <span>
              <span style={{ color: '#AE33FB' }}>[{dict.auth?.signup?.required || '필수'}]</span>{' '}
              {dict.auth?.signup?.password || '비밀번호'}
            </span>
          </label>
          <div
            className='rounded-xl p-[2px]'
            style={{
              background: 'linear-gradient(90deg, #FF60F7 0%, #AE33FB 100%)',
            }}
          >
            <input
              type='password'
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder={dict.auth?.signup?.placeholders?.password || '6자 이상의 비밀번호'}
              disabled={isLoading}
              className='w-full rounded-xl border-0 bg-white px-4 py-4 text-sm text-neutral-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            />
          </div>
          {errors.password && <p className='text-sm leading-5 text-red-500'>{errors.password}</p>}
        </div>

        {/* 비밀번호 확인 입력 */}
        <div className='flex w-full flex-col gap-2'>
          <label className='text-sm leading-5 font-medium text-neutral-900'>
            <span>
              <span style={{ color: '#AE33FB' }}>[{dict.auth?.signup?.required || '필수'}]</span>{' '}
              {dict.auth?.signup?.confirmPassword || '비밀번호 확인'}
            </span>
          </label>
          <div
            className='rounded-xl p-[2px]'
            style={{
              background: 'linear-gradient(90deg, #FF60F7 0%, #AE33FB 100%)',
            }}
          >
            <input
              type='password'
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              placeholder={
                dict.auth?.signup?.placeholders?.confirmPassword || '비밀번호를 다시 입력하세요'
              }
              disabled={isLoading}
              className='w-full rounded-xl border-0 bg-white px-4 py-4 text-sm text-neutral-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            />
          </div>
          {errors.confirmPassword && (
            <p className='text-sm leading-5 text-red-500'>{errors.confirmPassword}</p>
          )}
        </div>

        {/* 여권 영문 이름 입력 (필수) */}
        <div className='flex w-full flex-col gap-2'>
          <label className='text-sm leading-5 font-medium text-neutral-900'>
            <span>
              <span style={{ color: '#AE33FB' }}>[{dict.auth?.signup?.required || '필수'}]</span>{' '}
              {dict.auth?.signup?.passportName || '여권 영문 이름'}
            </span>
          </label>
          <div
            className='rounded-xl p-[2px]'
            style={{
              background: 'linear-gradient(90deg, #FF60F7 0%, #AE33FB 100%)',
            }}
          >
            <input
              type='text'
              value={formData.passportName}
              onChange={(e) => updateField('passportName', e.target.value)}
              placeholder={
                dict.auth?.signup?.placeholders?.passportName ||
                '여권에 기재된 영문 이름을 입력하세요'
              }
              disabled={isLoading}
              className='w-full rounded-xl border-0 bg-white px-4 py-4 text-sm text-neutral-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            />
          </div>
          {errors.passportName && (
            <p className='text-sm leading-5 text-red-500'>{errors.passportName}</p>
          )}
        </div>

        {/* 국적 입력 (선택) */}
        <div className='flex w-full flex-col gap-2'>
          <label className='text-sm leading-5 font-medium text-neutral-900'>
            <span>
              <span className='text-neutral-500'>[{dict.auth?.signup?.optional || '선택'}]</span>{' '}
              {dict.auth?.signup?.nationality || '국적'}
            </span>
          </label>
          <select
            value={formData.nationality}
            onChange={(e) => updateField('nationality', e.target.value)}
            disabled={isLoading}
            className='w-full rounded-xl border border-neutral-300 bg-white px-4 py-4 pr-8 text-sm text-neutral-900 focus:border-transparent focus:ring-2 focus:ring-[#DA47EF] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            style={{
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M16.25 7.08325L10.4167 12.9166L4.58333 7.08325' stroke='%23A3A3A3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '20px',
              backgroundPosition: 'right 12px center',
            }}
          >
            <option value=''>
              {dict.auth?.signup?.placeholders?.nationality || '국적을 선택하세요 (선택사항)'}
            </option>
            <option value='thailand'>{dict.auth?.signup?.nationalities?.thailand || '태국'}</option>
            <option value='korea'>{dict.auth?.signup?.nationalities?.korea || '한국'}</option>
          </select>
          {errors.nationality && (
            <p className='text-sm leading-5 text-red-500'>{errors.nationality}</p>
          )}
        </div>

        {/* 성별 입력 (필수) */}
        <div className='flex w-full flex-col gap-2'>
          <label className='text-sm leading-5 font-medium text-neutral-900'>
            <span>
              <span style={{ color: '#AE33FB' }}>[{dict.auth?.signup?.required || '필수'}]</span>{' '}
              {dict.auth?.signup?.gender || '성별'}
            </span>
          </label>
          <div
            className='rounded-xl p-[2px]'
            style={{
              background: 'linear-gradient(90deg, #FF60F7 0%, #AE33FB 100%)',
            }}
          >
            <select
              value={formData.gender}
              onChange={(e) => updateField('gender', e.target.value)}
              disabled={isLoading}
              className='w-full rounded-xl border-0 bg-white px-4 py-4 pr-8 text-sm text-neutral-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
              style={{
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M16.25 7.08325L10.4167 12.9166L4.58333 7.08325' stroke='%23A3A3A3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20px',
                backgroundPosition: 'right 12px center',
              }}
            >
              <option value=''>
                {dict.auth?.signup?.placeholders?.gender || '성별을 선택하세요'}
              </option>
              <option value='female'>{dict.auth?.signup?.genders?.female || '여성'}</option>
              <option value='male'>{dict.auth?.signup?.genders?.male || '남성'}</option>
            </select>
          </div>
          {errors.gender && <p className='text-sm leading-5 text-red-500'>{errors.gender}</p>}
        </div>

        {/* 휴대폰번호 입력 (선택) */}
        <div className='flex w-full flex-col gap-2'>
          <label className='text-sm leading-5 font-medium text-neutral-900'>
            <span>
              <span className='text-neutral-500'>[{dict.auth?.signup?.optional || '선택'}]</span>{' '}
              {dict.auth?.signup?.phoneNumber || '휴대폰번호'}
            </span>
          </label>
          <div className='flex gap-2'>
            {/* 국가번호 선택 */}
            <div className='w-32'>
              <select
                value={formData.countryCode}
                onChange={(e) => updateField('countryCode', e.target.value)}
                disabled={isLoading}
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
                {COUNTRY_CODES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} {getCountryName(country, lang)}
                  </option>
                ))}
              </select>
            </div>
            {/* 휴대폰번호 입력 */}
            <div className='flex-1'>
              <input
                type='tel'
                value={formData.phoneNumberOnly}
                onChange={(e) => updateField('phoneNumberOnly', e.target.value)}
                placeholder={
                  dict.auth?.signup?.placeholders?.phoneNumberOnly || '휴대폰번호를 입력하세요'
                }
                disabled={isLoading}
                className='w-full rounded-xl border border-neutral-300 bg-white px-4 py-4 text-sm text-neutral-900 focus:border-transparent focus:ring-2 focus:ring-[#DA47EF] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
              />
            </div>
          </div>
          {(errors.countryCode || errors.phoneNumberOnly) && (
            <p className='text-sm leading-5 text-red-500'>
              {errors.countryCode || errors.phoneNumberOnly}
            </p>
          )}
        </div>

        {/* 생년월일 입력 (선택) */}
        <FormInput
          label={
            <span>
              <span className='text-neutral-500'>[{dict.auth?.signup?.optional || '선택'}]</span>{' '}
              {dict.auth?.signup?.birthDate || '생년월일'}
            </span>
          }
          type='date'
          value={formData.birthDate}
          onChange={(e) => updateField('birthDate', e.target.value)}
          placeholder={
            dict.auth?.signup?.placeholders?.birthDate || '생년월일을 선택하세요 (선택사항)'
          }
          error={errors.birthDate}
          disabled={isLoading}
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
