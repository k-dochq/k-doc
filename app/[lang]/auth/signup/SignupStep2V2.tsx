'use client';

import { type Locale, MAX_MOBILE_WIDTH_CLASS } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type SignupFormData } from 'features/email-auth/model/useSignupForm';
import { getTermsOfServiceLink, getPrivacyPolicyLink } from 'shared/config/policy-links';

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

function AllAgreeCheckedIcon() {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='20' height='20' rx='4' fill='#7657FF' />
      <path
        d='M14.6673 6.79169L8.25065 13.2084L5.33398 10.2917'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function AllAgreeUncheckedIcon() {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4 0.5H16C17.933 0.5 19.5 2.067 19.5 4V16C19.5 17.933 17.933 19.5 16 19.5H4C2.067 19.5 0.5 17.933 0.5 16V4C0.5 2.067 2.067 0.5 4 0.5Z'
        fill='#F5F5F5'
      />
      <path
        d='M4 0.5H16C17.933 0.5 19.5 2.067 19.5 4V16C19.5 17.933 17.933 19.5 16 19.5H4C2.067 19.5 0.5 17.933 0.5 16V4C0.5 2.067 2.067 0.5 4 0.5Z'
        stroke='#D4D4D4'
      />
    </svg>
  );
}

function SubAgreeCheckedIcon() {
  return (
    <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M20.5335 9.5083L11.5501 18.4916L7.4668 14.4083'
        stroke='#7657FF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function SubAgreeUncheckedIcon() {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M16.3342 5.30835L7.35091 14.2917L3.26758 10.2083'
        stroke='#D4D4D4'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
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

  return (
    <div className='p-5'>
      {/* 제목 섹션 */}
      <div className='mb-8 text-3xl font-semibold'>
        {titleLines.map((line, index) => (
          <div key={index} className={index === 0 ? 'text-primary-900' : ''}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
