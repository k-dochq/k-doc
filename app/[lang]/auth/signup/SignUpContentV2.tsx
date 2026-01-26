'use client';

import { useState } from 'react';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { type Locale } from 'shared/config';
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
    allAgreed: true,
    age14Plus: true,
    termsOfService: true,
    privacyPolicy: true,
    marketingNotifications: true,
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

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2
        title={dict.auth?.signup?.title || 'Register'}
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
          onNextStep={handleGoToStep2}
          formId='signup-step1-form'
        />
      )}

      {step === 2 && (
        <SignupStep2V2
          lang={lang}
          dict={dict}
          formData={formData}
          agreements={agreements}
          onAllChange={handleAllAgreementChange}
          onItemChange={handleIndividualAgreementChange}
          onSignup={handleFinalSignup}
          isBusy={isBusy}
          isRequiredAgreementsValid={isRequiredAgreementsValid}
          error={error ?? undefined}
        />
      )}
    </div>
  );
}
