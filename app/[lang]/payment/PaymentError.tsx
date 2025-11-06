'use client';

import { type Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { PaymentError as PaymentErrorComponent } from './PaymentErrorClient';

interface PaymentErrorProps {
  lang: Locale;
  dict: Dictionary;
  error: Error;
  errorMessage?: string;
}

/**
 * PaymentError 래퍼 컴포넌트
 * Server Component에서 사용할 수 있도록 클라이언트 컴포넌트로 래핑
 */
export function PaymentError({ lang, dict, error, errorMessage }: PaymentErrorProps) {
  return (
    <PaymentErrorComponent lang={lang} dict={dict} error={error} errorMessage={errorMessage} />
  );
}
