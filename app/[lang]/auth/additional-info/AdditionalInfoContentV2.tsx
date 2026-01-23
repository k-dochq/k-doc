'use client';

import { useState } from 'react';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useAdditionalInfoForm } from 'features/social-auth/model/useAdditionalInfoForm';
import { useUpdateUserProfile } from 'features/user-profile/model/useUpdateUserProfile';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { getFirstTouch, clearFirstTouch } from 'shared/lib/marketing-attribution';
import { trackSignUpComplete, trackCompleteRegistration } from 'shared/lib/analytics';
import { AdditionalInfoStep1FormV2 } from 'features/social-auth/ui/AdditionalInfoStep1FormV2';
import { AdditionalInfoStep2V2 } from 'features/social-auth/ui/AdditionalInfoStep2V2';
import { localeToDatabaseLocale } from 'shared/lib/utils/locale-mapper';

interface AdditionalInfoContentV2Props {
  lang: Locale;
  dict: Dictionary;
  userEmail: string;
  redirectTo?: string;
  provider?: string;
}

interface AgreementState {
  allAgreed: boolean;
  age14Plus: boolean;
  termsOfService: boolean;
  privacyPolicy: boolean;
  marketingNotifications: boolean;
}

export function AdditionalInfoContentV2({
  lang,
  dict,
  userEmail,
  redirectTo,
  provider,
}: AdditionalInfoContentV2Props) {
  const router = useLocalizedRouter();
  const { formData, errors, updateField, validateForm } = useAdditionalInfoForm({
    lang,
    dict,
  });
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

  const {
    mutate: updateProfile,
    isPending: isLoading,
    error,
  } = useUpdateUserProfile({
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
    onError: () => {
      setIsSubmitting(false);
    },
  });

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

  const handleFinalSubmit = async () => {
    const isValid = validateForm();
    if (!isValid || !isRequiredAgreementsValid || isSubmitting) return;

    setIsSubmitting(true);

    // gender를 genderType으로 변환 (MALE, FEMALE)
    const genderType = formData.gender === 'male' ? 'MALE' : 'FEMALE';

    // 휴대폰번호 합치기
    const fullPhoneNumber =
      formData.countryCode && formData.phoneNumberOnly
        ? `${formData.countryCode}${formData.phoneNumberOnly}`
        : formData.phoneNumberOnly;

    // Locale을 UserLocale 형식으로 변환
    const userLocale = localeToDatabaseLocale(lang);

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
    <div className='min-h-screen bg-white'>
      <PageHeaderV2
        title={dict.auth?.additionalInfo?.title || 'Additional Information'}
        fallbackUrl={`/${lang}/main`}
      />

      <div className='h-[58px]' />

      {step === 1 && (
        <AdditionalInfoStep1FormV2
          lang={lang}
          dict={dict}
          userEmail={userEmail}
          formData={formData}
          errors={errors}
          isBusy={isBusy}
          onUpdateField={
            updateField as <K extends keyof typeof formData>(
              field: K,
              value: (typeof formData)[K],
            ) => void
          }
          onNextStep={handleGoToStep2}
          formId='additional-info-step1-form'
        />
      )}

      {step === 2 && (
        <AdditionalInfoStep2V2
          lang={lang}
          dict={dict}
          agreements={agreements}
          onAllChange={handleAllAgreementChange}
          onItemChange={handleIndividualAgreementChange}
          onSubmit={handleFinalSubmit}
          isBusy={isBusy}
          isRequiredAgreementsValid={isRequiredAgreementsValid}
          error={error?.message || dict.auth?.signup?.errors?.updateProfileError || undefined}
        />
      )}
    </div>
  );
}
