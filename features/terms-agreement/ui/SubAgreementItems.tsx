'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getTermsOfServiceLink, getPrivacyPolicyLink } from 'shared/config/policy-links';
import { SubAgreementItem } from './SubAgreementItem';

interface SubAgreementItemsProps {
  agreements: {
    age14Plus: boolean;
    termsOfService: boolean;
    privacyPolicy: boolean;
    marketingNotifications: boolean;
  };
  onItemChange: (
    key: 'age14Plus' | 'termsOfService' | 'privacyPolicy' | 'marketingNotifications',
    checked: boolean,
  ) => void;
  dict: Dictionary;
  lang: Locale;
  disabled?: boolean;
}

export function SubAgreementItems({
  agreements,
  onItemChange,
  dict,
  lang,
  disabled = false,
}: SubAgreementItemsProps) {
  const age14Text = dict.auth?.signup?.termsAgreement?.age14Plus || 'I am over 14 years old.';
  const termsText =
    dict.auth?.signup?.termsAgreement?.termsOfService || 'Terms of Service (required)';
  const privacyText =
    dict.auth?.signup?.termsAgreement?.privacyPolicy || 'Privacy Policy (required)';
  const marketingText =
    dict.auth?.signup?.termsAgreement?.marketingNotifications ||
    'Receive event and service benefit notifications (optional)';

  return (
    <div className='mt-2 space-y-0.5 rounded-2xl'>
      <SubAgreementItem
        checked={agreements.age14Plus}
        label={age14Text}
        onToggle={() => onItemChange('age14Plus', !agreements.age14Plus)}
        disabled={disabled}
      />
      <SubAgreementItem
        checked={agreements.termsOfService}
        label={termsText}
        onToggle={() => onItemChange('termsOfService', !agreements.termsOfService)}
        disabled={disabled}
        link={getTermsOfServiceLink(lang)}
      />
      <SubAgreementItem
        checked={agreements.privacyPolicy}
        label={privacyText}
        onToggle={() => onItemChange('privacyPolicy', !agreements.privacyPolicy)}
        disabled={disabled}
        link={getPrivacyPolicyLink(lang)}
      />
      <SubAgreementItem
        checked={agreements.marketingNotifications}
        label={marketingText}
        onToggle={() => onItemChange('marketingNotifications', !agreements.marketingNotifications)}
        disabled={disabled}
      />
    </div>
  );
}
