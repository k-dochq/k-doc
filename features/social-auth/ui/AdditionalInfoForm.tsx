'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FormButton } from 'shared/ui/form-button';
import { useAdditionalInfoForm } from '../model/useAdditionalInfoForm';
import { useUpdateUserProfile } from 'features/user-profile/model/useUpdateUserProfile';
import { TermsAgreement } from 'features/terms-agreement';
import {
  RequiredInput,
  OptionalSelect,
  RequiredSelect,
  PhoneNumberInput,
} from 'features/email-auth/ui/inputs';
import { DatePicker } from 'shared/ui/simple-date-picker';
import { COUNTRY_CODES, getCountryName } from 'entities/country-code';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { getFirstTouch, clearFirstTouch } from 'shared/lib/marketing-attribution';
import { trackSignUpComplete, trackCompleteRegistration } from 'shared/lib/analytics';

interface AgreementState {
  allAgreed: boolean;
  age14Plus: boolean;
  termsOfService: boolean;
  privacyPolicy: boolean;
  marketingNotifications: boolean;
}

interface AdditionalInfoFormProps {
  lang: Locale;
  dict: Dictionary;
  userEmail: string;
  redirectTo?: string;
  provider?: string;
}

export function AdditionalInfoForm({
  lang,
  dict,
  userEmail,
  redirectTo,
  provider,
}: AdditionalInfoFormProps) {
  const router = useLocalizedRouter();
  const { formData, errors, updateField, validateForm, isFormValid } = useAdditionalInfoForm({
    lang,
    dict,
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [agreements, setAgreements] = useState<AgreementState>({
    allAgreed: false,
    age14Plus: false,
    termsOfService: false,
    privacyPolicy: false,
    marketingNotifications: false,
  });

  const { mutate: updateProfile, isPending: isLoading } = useUpdateUserProfile({
    onSuccess: () => {
      // 회원가입 성공 - 마케팅 어트리뷰션 LocalStorage 초기화
      clearFirstTouch();

      // 회원가입 성공 - 이벤트 전송
      trackCompleteRegistration();
      trackSignUpComplete(provider || 'social');

      // 추가정보 입력 성공 시 redirectTo가 있으면 해당 페이지로, 없으면 메인 페이지로 이동
      const targetUrl = redirectTo || `/${lang}/main`;
      router.push(targetUrl);
    },
    onError: (error) => {
      setServerError(
        error.message ||
          dict.auth?.signup?.errors?.updateProfileError ||
          'An error occurred while saving your information.',
      );
    },
  });

  // 국가 코드를 국적 키로 매핑하는 함수
  const getNationalityKey = (countryCode: string): string => {
    const country = COUNTRY_CODES.find((c) => c.code === countryCode);
    if (!country) return '';
    return country.name.toLowerCase().replace(/\s+/g, '_');
  };

  // 국적 옵션 생성
  const nationalityOptions = COUNTRY_CODES.map((country) => ({
    value: getNationalityKey(country.code),
    label: getCountryName(country),
    countryCode: country.code,
  }));

  // 필수 약관 동의 여부 확인
  const isRequiredAgreementsValid =
    agreements.age14Plus && agreements.termsOfService && agreements.privacyPolicy;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !isRequiredAgreementsValid) {
      return;
    }

    // gender를 genderType으로 변환 (MALE, FEMALE)
    const genderType = formData.gender === 'male' ? 'MALE' : 'FEMALE';

    // 휴대폰번호 합치기
    const fullPhoneNumber =
      formData.countryCode && formData.phoneNumberOnly
        ? `${formData.countryCode}${formData.phoneNumberOnly}`
        : formData.phoneNumberOnly;

    // Locale을 UserLocale 형식으로 변환 (en -> en_US, ko -> ko_KR, th -> th_TH, zh-Hant -> zh_TW, ja -> ja_JP)
    const localeMap: Record<Locale, string> = {
      en: 'en_US',
      ko: 'ko_KR',
      th: 'th_TH',
      'zh-Hant': 'zh_TW',
      ja: 'ja_JP',
      hi: 'hi_IN',
    };
    const userLocale = localeMap[lang] || 'en_US';

    // LocalStorage에서 마케팅 어트리뷰션 데이터 읽기
    const marketingAttribution = getFirstTouch();

    updateProfile({
      passportName: formData.passportName,
      nationality: formData.nationality,
      gender: formData.gender,
      genderType: genderType,
      countryCode: formData.countryCode,
      phoneNumber: fullPhoneNumber,
      phoneNumberOnly: formData.phoneNumberOnly,
      birthDate: formData.birthDate,
      marketingNotifications: agreements.marketingNotifications,
      locale: userLocale,
      // 마케팅 어트리뷰션 데이터 추가 (있는 경우에만)
      ...(marketingAttribution && { marketingAttribution }),
    });
  };

  return (
    <div className='flex w-full flex-col gap-5'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        {/* 이메일 표시 (읽기 전용) */}
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-gray-700'>
            {dict.auth?.signup?.email || 'Email'}
            <span className='ml-1 text-red-500'>*</span>
          </label>
          <input
            type='email'
            value={userEmail}
            disabled
            className='w-full cursor-not-allowed rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500'
          />
          <p className='text-xs text-gray-500'>
            {dict.auth?.additionalInfo?.emailReadonly || 'This is your social account email'}
          </p>
        </div>

        {/* 여권 영문 이름 입력 (필수) */}
        <RequiredInput
          label={dict.auth?.signup?.passportName || 'Passport Name (English)'}
          value={formData.passportName}
          onChange={(value) => updateField('passportName', value)}
          placeholder={
            dict.auth?.signup?.placeholders?.passportName || 'Enter your passport name in English'
          }
          error={errors.passportName}
          disabled={isLoading}
          type='text'
          dict={dict}
        />

        {/* 국적 입력 (선택) */}
        <OptionalSelect
          label={dict.auth?.signup?.nationality || 'Nationality'}
          value={formData.nationality}
          onChange={(value) => updateField('nationality', value)}
          placeholder={
            dict.auth?.signup?.placeholders?.nationality || 'Select your nationality (optional)'
          }
          error={errors.nationality}
          disabled={isLoading}
          dict={dict}
        >
          {nationalityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </OptionalSelect>

        {/* 성별 입력 (선택) */}
        <OptionalSelect
          label={dict.auth?.signup?.gender || 'Gender'}
          value={formData.gender}
          onChange={(value) => updateField('gender', value)}
          placeholder={dict.auth?.signup?.placeholders?.gender || 'Select your gender (optional)'}
          error={errors.gender}
          disabled={isLoading}
          dict={dict}
        >
          <option value='female'>{dict.auth?.signup?.genders?.female || 'Female'}</option>
          <option value='male'>{dict.auth?.signup?.genders?.male || 'Male'}</option>
        </OptionalSelect>

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
        <DatePicker
          label={dict.auth?.signup?.birthDate || 'Birth Date'}
          value={formData.birthDate ? new Date(formData.birthDate) : undefined}
          onChange={(date) =>
            updateField('birthDate', date ? date.toISOString().split('T')[0] : '')
          }
          placeholder={
            dict.auth?.signup?.placeholders?.birthDate || 'Select your birth date (optional)'
          }
          error={errors.birthDate}
          locale={lang}
          dict={dict}
          required={false}
          yearRange={{ from: 1950, to: new Date().getFullYear() }}
          disabled={(date) => date > new Date()}
        />

        {/* 서버 에러 메시지 */}
        {serverError && (
          <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
            <p className='text-sm text-red-600'>{serverError}</p>
          </div>
        )}

        {/* 약관동의 섹션 */}
        <TermsAgreement lang={lang} dict={dict} onAgreementChange={setAgreements} />

        {/* 약관 동의 에러 메시지 */}
        {!isRequiredAgreementsValid && (
          <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
            <p className='text-sm text-red-600'>
              {dict.auth?.signup?.termsAgreement?.requiredError ||
                'Please agree to the required terms.'}
            </p>
          </div>
        )}

        {/* 완료 버튼 */}
        <FormButton type='submit' loading={isLoading} disabled={isLoading}>
          {dict.auth?.additionalInfo?.submitButton || dict.auth?.signup?.signupButton || 'Complete'}
        </FormButton>
      </form>
    </div>
  );
}
