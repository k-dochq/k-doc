'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getTermsOfServiceLink, getPrivacyPolicyLink } from 'shared/config/policy-links';

interface TermsAgreementProps {
  lang: Locale;
  dict: Dictionary;
  onAgreementChange?: (agreements: AgreementState) => void;
}

interface AgreementState {
  allAgreed: boolean;
  age14Plus: boolean;
  termsOfService: boolean;
  privacyPolicy: boolean;
  marketingNotifications: boolean;
}

export function TermsAgreement({ lang, dict, onAgreementChange }: TermsAgreementProps) {
  const [agreements, setAgreements] = useState<AgreementState>({
    allAgreed: false,
    age14Plus: false,
    termsOfService: false,
    privacyPolicy: false,
    marketingNotifications: false,
  });

  const handleAllAgreementChange = (checked: boolean) => {
    const newAgreements = {
      allAgreed: checked,
      age14Plus: checked,
      termsOfService: checked,
      privacyPolicy: checked,
      marketingNotifications: checked,
    };
    setAgreements(newAgreements);
    onAgreementChange?.(newAgreements);
  };

  const handleIndividualAgreementChange = (
    key: keyof Omit<AgreementState, 'allAgreed'>,
    checked: boolean,
  ) => {
    const newAgreements = {
      ...agreements,
      [key]: checked,
    };

    // 전체 동의 상태 업데이트
    newAgreements.allAgreed =
      newAgreements.age14Plus &&
      newAgreements.termsOfService &&
      newAgreements.privacyPolicy &&
      newAgreements.marketingNotifications;

    setAgreements(newAgreements);
    onAgreementChange?.(newAgreements);
  };

  return (
    <div className='flex flex-col gap-3'>
      {/* 전체 동의 */}
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          id='allAgreed'
          checked={agreements.allAgreed}
          onChange={(e) => handleAllAgreementChange(e.target.checked)}
          className='h-4 w-4 rounded border-neutral-300 text-purple-600 focus:ring-purple-500'
        />
        <label htmlFor='allAgreed' className='text-sm font-medium text-neutral-900'>
          {dict.auth?.signup?.termsAgreement?.allAgreed || '전체 동의'}
        </label>
      </div>

      {/* 개별 동의 항목들 */}
      <div className='ml-6 flex flex-col gap-2'>
        {/* 만 14세 이상 */}
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='age14Plus'
            checked={agreements.age14Plus}
            onChange={(e) => handleIndividualAgreementChange('age14Plus', e.target.checked)}
            className='h-4 w-4 rounded border-neutral-300 text-purple-600 focus:ring-purple-500'
          />
          <label htmlFor='age14Plus' className='text-sm text-neutral-900'>
            {dict.auth?.signup?.termsAgreement?.age14Plus || '만 14세 이상입니다.'}
          </label>
        </div>

        {/* 서비스 이용 약관 */}
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='termsOfService'
            checked={agreements.termsOfService}
            onChange={(e) => handleIndividualAgreementChange('termsOfService', e.target.checked)}
            className='h-4 w-4 rounded border-neutral-300 text-purple-600 focus:ring-purple-500'
          />
          <label htmlFor='termsOfService' className='text-sm text-neutral-900'>
            {dict.auth?.signup?.termsAgreement?.termsOfService || '서비스 이용 약관 (필수)'}
          </label>
          <a
            href={getTermsOfServiceLink(lang)}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm text-neutral-500 transition-colors hover:text-neutral-700'
          >
            {'>'}
          </a>
        </div>

        {/* 개인정보 수집/이용 동의 */}
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='privacyPolicy'
            checked={agreements.privacyPolicy}
            onChange={(e) => handleIndividualAgreementChange('privacyPolicy', e.target.checked)}
            className='h-4 w-4 rounded border-neutral-300 text-purple-600 focus:ring-purple-500'
          />
          <label htmlFor='privacyPolicy' className='text-sm text-neutral-900'>
            {dict.auth?.signup?.termsAgreement?.privacyPolicy || '개인정보 수집/이용 동의 (필수)'}
          </label>
          <a
            href={getPrivacyPolicyLink(lang)}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm text-neutral-500 transition-colors hover:text-neutral-700'
          >
            {'>'}
          </a>
        </div>

        {/* 이벤트/서비스 혜택 알림 */}
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='marketingNotifications'
            checked={agreements.marketingNotifications}
            onChange={(e) =>
              handleIndividualAgreementChange('marketingNotifications', e.target.checked)
            }
            className='h-4 w-4 rounded border-neutral-300 text-purple-600 focus:ring-purple-500'
          />
          <label htmlFor='marketingNotifications' className='text-sm text-neutral-900'>
            {dict.auth?.signup?.termsAgreement?.marketingNotifications ||
              '이벤트/서비스 혜택 알림 (선택)'}
          </label>
        </div>
      </div>
    </div>
  );
}
