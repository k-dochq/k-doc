'use client';

import { useState } from 'react';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { MAX_MOBILE_WIDTH_CLASS, type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useSignupForm } from 'features/email-auth/model/useSignupForm';
import { useEmailSignup } from 'features/email-auth/model/useEmailSignup';
import { SignupStep1FormV2 } from './SignupStep1FormV2';
import { SignupStep2V2 } from './SignupStep2V2';

interface SignUpContentV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

interface AgreementState {
  allAgreed: boolean;
  age14Plus: boolean;
  termsOfService: boolean;
  privacyPolicy: boolean;
  marketingNotifications: boolean;
}

export function SignUpContentV2({ lang, dict, redirectTo }: SignUpContentV2Props) {
  const { formData, errors, updateField, validateForm } = useSignupForm({
    lang,
    dict,
  });
  const { signUpWithEmail, isLoading, error } = useEmailSignup({ locale: lang, dict });
  const [step, setStep] = useState<1 | 2>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreements, setAgreements] = useState<AgreementState>({
    allAgreed: false,
    age14Plus: false,
    termsOfService: false,
    privacyPolicy: false,
    marketingNotifications: false,
  });

  const isRequiredAgreementsValid =
    agreements.age14Plus && agreements.termsOfService && agreements.privacyPolicy;

  const isBusy = isTransitioning || isLoading || isSubmitting;

  const handleGoToStep2 = () => {
    const isValid = validateForm();
    if (!isValid || isTransitioning) return;
    setIsTransitioning(true);
    // 간단한 전환 연출 여지를 남겨두기 위해 비동기 흐름 유지
    Promise.resolve().then(() => {
      setStep(2);
      setIsTransitioning(false);
    });
  };

  const handleAllAgreementChange = (checked: boolean) => {
    const next: AgreementState = {
      allAgreed: checked,
      age14Plus: checked,
      termsOfService: checked,
      privacyPolicy: checked,
      marketingNotifications: checked,
    };
    setAgreements(next);
  };

  const handleIndividualAgreementChange = (
    key: keyof Omit<AgreementState, 'allAgreed'>,
    checked: boolean,
  ) => {
    const next: AgreementState = {
      ...agreements,
      [key]: checked,
    };
    next.allAgreed =
      next.age14Plus && next.termsOfService && next.privacyPolicy && next.marketingNotifications;
    setAgreements(next);
  };

  const handleFinalSignup = async () => {
    const isValid = validateForm();
    if (!isValid || !isRequiredAgreementsValid || isSubmitting) return;

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
      marketingNotifications: agreements.marketingNotifications,
    });

    if (result.success) {
      const targetUrl: string = redirectTo ?? `/${lang}/main`;
      window.location.href = targetUrl;
    } else {
      setIsSubmitting(false);
    }
  };

  const agreeAndStartLabel =
    lang === 'en'
      ? 'Agree to all and start'
      : lang === 'th'
        ? 'ยอมรับทั้งหมดและเริ่มต้น'
        : '전체 동의하고 시작하기';

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2
        title={dict.auth?.signup?.title || '회원가입'}
        fallbackUrl={`/${lang}/auth/login`}
      />

      <div className='h-[58px]' />

      {step === 1 && (
        <SignupStep1FormV2
          lang={lang}
          dict={dict}
          formData={formData}
          errors={errors}
          isBusy={isBusy}
          onUpdateField={updateField}
          formId='signup-step1-form'
        />
      )}

      <div className='h-[112px]' />

      {step === 2 && (
        <SignupStep2V2
          lang={lang}
          dict={dict}
          formData={formData}
          agreements={agreements}
          onAllChange={handleAllAgreementChange}
          onItemChange={handleIndividualAgreementChange}
          error={error ?? undefined}
        />
      )}

      {step === 1 && (
        <div
          className={`fixed right-0 bottom-0 left-0 z-30 mx-auto border-t border-neutral-200 bg-white px-5 pt-4 pb-8 ${MAX_MOBILE_WIDTH_CLASS}`}
        >
          <button
            type='button'
            onClick={handleGoToStep2}
            disabled={isBusy}
            className='bg-sub-900 hover:bg-sub-900/90 h-14 w-full rounded-xl text-base leading-6 font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'
          >
            {dict.auth?.signup?.signupButton || '회원가입'}
          </button>
        </div>
      )}

      {step === 2 && (
        <div
          className={`fixed right-0 bottom-0 left-0 z-30 mx-auto border-t border-neutral-200 bg-white px-5 pt-4 pb-8 ${MAX_MOBILE_WIDTH_CLASS}`}
        >
          <button
            type='button'
            onClick={handleFinalSignup}
            disabled={isBusy || !isRequiredAgreementsValid}
            className='bg-sub-900 hover:bg-sub-900/90 h-14 w-full rounded-xl text-base leading-6 font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'
          >
            {agreeAndStartLabel}
          </button>
        </div>
      )}
    </div>
  );
}
