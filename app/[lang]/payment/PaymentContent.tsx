'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';
import { PaymentHandler } from 'features/payment/ui/PaymentHandler';
import { PaymentLoading } from './PaymentLoading';
import { PaymentError as PaymentErrorClient } from './PaymentErrorClient';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface PaymentContentProps {
  lang: Locale;
  dict: Dictionary;
  orderId: string;
  customerId: string;
  productName: string;
  amount: number;
  returnUrl?: string;
}

export function PaymentContent({
  lang,
  dict,
  orderId,
  customerId,
  productName,
  amount,
  returnUrl,
}: PaymentContentProps) {
  const router = useLocalizedRouter();
  const [error, setError] = useState<Error | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleError = (err: Error, message?: string) => {
    setError(err);
    setErrorMessage(message);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleRetry = () => {
    setError(null);
    setErrorMessage(undefined);
    // 페이지 새로고침하여 재시도
    window.location.reload();
  };

  // 에러 상태
  if (error) {
    return (
      <PaymentErrorClient
        lang={lang}
        dict={dict}
        error={error}
        errorMessage={errorMessage}
        onGoHome={handleGoHome}
        onRetry={handleRetry}
      />
    );
  }

  // 기본 UI는 로딩 UI, PaymentHandler는 항상 렌더링하여 결제 프로세스 시작
  return (
    <>
      <PaymentLoading lang={lang} dict={dict} />
      <PaymentHandler
        orderId={orderId}
        customerId={customerId}
        productName={productName}
        amount={amount}
        dict={dict}
        returnUrl={returnUrl}
        onError={handleError}
      />
    </>
  );
}
