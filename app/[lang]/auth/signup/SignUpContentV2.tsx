'use client';

import { useState } from 'react';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { MAX_MOBILE_WIDTH_CLASS, type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useSignupForm } from 'features/email-auth/model/useSignupForm';
import { SignupStep1FormV2 } from './SignupStep1FormV2';
import { SignupStep2V2 } from './SignupStep2V2';

interface SignUpContentV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function SignUpContentV2({ lang, dict, redirectTo }: SignUpContentV2Props) {
  const { formData, errors, updateField, validateForm } = useSignupForm({
    lang,
    dict,
  });
  const [step, setStep] = useState<1 | 2>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isBusy = isTransitioning;

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

      {step === 2 && <SignupStep2V2 lang={lang} dict={dict} formData={formData} />}

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
    </div>
  );
}
