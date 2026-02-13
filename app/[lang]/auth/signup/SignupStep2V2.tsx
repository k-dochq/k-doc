'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type SignupFormData } from 'features/email-auth/model/useSignupForm';
import { AllAgreementCheckbox, SubAgreementItems, AgreementTitle } from 'features/terms-agreement';
import { SignupFloatingButton } from 'features/email-auth';

interface SignupStep2V2Props {
  lang: Locale;
  dict: Dictionary;
  formData: SignupFormData;
  agreements: {
    allAgreed: boolean;
    age14Plus: boolean;
    termsOfService: boolean;
    privacyPolicy: boolean;
    marketingNotifications: boolean;
  };
  onAllChange: (checked: boolean) => void;
  onItemChange: (
    key: 'age14Plus' | 'termsOfService' | 'privacyPolicy' | 'marketingNotifications',
    checked: boolean,
  ) => void;
  onSignup: () => void;
  isBusy: boolean;
  isRequiredAgreementsValid: boolean;
  error?: string;
}

export function SignupStep2V2({
  lang,
  dict,
  agreements,
  onAllChange,
  onItemChange,
  onSignup,
  isBusy,
  isRequiredAgreementsValid,
  error,
}: SignupStep2V2Props) {
  const titleLines =
    dict.auth?.signup?.termsAgreement?.title ?? [
      'K-DOC',
      'Please agree to',
      'use the service',
    ];

  const allTitle =
    dict.auth?.signup?.termsAgreement?.allAgreed || 'Agree to all terms and conditions';

  const agreeAndStartLabel =
    dict.auth?.signup?.termsAgreement?.agreeAndStart || 'Agree to all and start';

  return (
    <>
      <div className='p-5'>
        <AgreementTitle titleLines={titleLines} />

        <AllAgreementCheckbox
          checked={agreements.allAgreed}
          label={allTitle}
          onToggle={() => onAllChange(!agreements.allAgreed)}
          disabled={isBusy}
        />

        <SubAgreementItems
          agreements={agreements}
          onItemChange={onItemChange}
          dict={dict}
          lang={lang}
          disabled={isBusy}
        />

        {error && (
          <div className='mt-4 rounded-lg border border-red-200 bg-red-50 p-3'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}
      </div>

      <div className='h-[112px]' />

      <SignupFloatingButton
        label={agreeAndStartLabel}
        onClick={onSignup}
        disabled={isBusy || !isRequiredAgreementsValid}
      />
    </>
  );
}
