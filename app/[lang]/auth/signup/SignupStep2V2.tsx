'use client';

import { type Locale } from 'shared/config';
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
  error,
}: SignupStep2V2Props) {
  const allTitle =
    dict.auth?.signup?.termsAgreement?.allAgreed || 'Agree to all terms and conditions';

  const age14Text = dict.auth?.signup?.termsAgreement?.age14Plus || 'I am over 14 years old.';
  const termsText =
    dict.auth?.signup?.termsAgreement?.termsOfService || 'Terms of Service (required)';
  const privacyText =
    dict.auth?.signup?.termsAgreement?.privacyPolicy || 'Privacy Policy (required)';
  const marketingText =
    dict.auth?.signup?.termsAgreement?.marketingNotifications ||
    'Receive event and service benefit notifications (optional)';

  return (
    <div className='p-5'>
      <div className='space-y-4'>
        {/* 전체 동의 */}
        <button
          type='button'
          onClick={() => onAllChange(!agreements.allAgreed)}
          className='flex w-full items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3'
        >
          <div className='flex items-center gap-3'>
            {agreements.allAgreed ? <AllAgreeCheckedIcon /> : <AllAgreeUncheckedIcon />}
            <span className='text-sm font-medium text-neutral-900'>{allTitle}</span>
          </div>
        </button>

        {/* 개별 동의 항목 */}
        <div className='space-y-3 rounded-2xl border border-neutral-200 bg-white p-4'>
          {/* 만 14세 이상 */}
          <button
            type='button'
            onClick={() => onItemChange('age14Plus', !agreements.age14Plus)}
            className='flex w-full items-center justify-between'
          >
            <div className='flex items-center gap-3'>
              {agreements.age14Plus ? <SubAgreeCheckedIcon /> : <SubAgreeUncheckedIcon />}
              <span className='text-sm text-neutral-900'>{age14Text}</span>
            </div>
          </button>

          {/* 이용약관 */}
          <button
            type='button'
            onClick={() => onItemChange('termsOfService', !agreements.termsOfService)}
            className='flex w-full items-center justify-between'
          >
            <div className='flex items-center gap-3'>
              {agreements.termsOfService ? <SubAgreeCheckedIcon /> : <SubAgreeUncheckedIcon />}
              <span className='text-sm text-neutral-900'>{termsText}</span>
            </div>
            <a
              href={getTermsOfServiceLink(lang)}
              target='_blank'
              rel='noopener noreferrer'
              className='text-xs text-neutral-400 underline-offset-2 hover:underline'
            >
              View details
            </a>
          </button>

          {/* 개인정보 처리방침 */}
          <button
            type='button'
            onClick={() => onItemChange('privacyPolicy', !agreements.privacyPolicy)}
            className='flex w-full items-center justify-between'
          >
            <div className='flex items-center gap-3'>
              {agreements.privacyPolicy ? <SubAgreeCheckedIcon /> : <SubAgreeUncheckedIcon />}
              <span className='text-sm text-neutral-900'>{privacyText}</span>
            </div>
            <a
              href={getPrivacyPolicyLink(lang)}
              target='_blank'
              rel='noopener noreferrer'
              className='text-xs text-neutral-400 underline-offset-2 hover:underline'
            >
              View details
            </a>
          </button>

          {/* 마케팅 수신 동의 */}
          <button
            type='button'
            onClick={() =>
              onItemChange('marketingNotifications', !agreements.marketingNotifications)
            }
            className='flex w-full items-center justify-between'
          >
            <div className='flex items-center gap-3'>
              {agreements.marketingNotifications ? (
                <SubAgreeCheckedIcon />
              ) : (
                <SubAgreeUncheckedIcon />
              )}
              <span className='text-sm text-neutral-900'>{marketingText}</span>
            </div>
          </button>
        </div>

        {error && (
          <div className='rounded-2xl border border-red-200 bg-red-50 p-4'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        <div className='h-[16px]' />
      </div>
    </div>
  );
}
