'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type SignupFormData } from 'features/email-auth/model/useSignupForm';
import { AllAgreementCheckbox, SubAgreementItems, AgreementTitle } from 'features/terms-agreement';

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
  agreeAndStartLabel: string;
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
  agreeAndStartLabel,
  error,
}: SignupStep2V2Props) {
  const titleLines = (dict.auth?.signup?.termsAgreement?.title as string[] | undefined) || [
    'K-DOC',
    'Please agree to',
    'use the service',
  ];

  const allTitle =
    dict.auth?.signup?.termsAgreement?.allAgreed || 'Agree to all terms and conditions';

  return (
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
    </div>
  );
}
