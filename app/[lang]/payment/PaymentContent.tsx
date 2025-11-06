'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';
import { PaymentHandler } from 'features/payment/ui/PaymentHandler';
import { PaymentInfoCard } from './PaymentInfoCard';
import { PaymentLoading } from './PaymentLoading';
import { PaymentError } from './PaymentError';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface PaymentContentProps {
  lang: Locale;
  dict: Dictionary;
  orderId: string;
  customerId: string;
  productName: string;
  amount: number;
  currency: string;
}

export function PaymentContent({
  lang,
  dict,
  orderId,
  customerId,
  productName,
  amount,
  currency,
}: PaymentContentProps) {
  const router = useLocalizedRouter();
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>();
  const [error, setError] = useState<Error | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleLoading = (isLoading: boolean, message?: string) => {
    setLoading(isLoading);
    setLoadingMessage(message);
  };

  const handleError = (err: Error, message?: string) => {
    setError(err);
    setErrorMessage(message);
    setLoading(false);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleRetry = () => {
    setError(null);
    setErrorMessage(undefined);
    setLoading(true);
    // 페이지 새로고침하여 재시도
    window.location.reload();
  };

  // 에러 상태
  if (error) {
    return (
      <PaymentError
        lang={lang}
        dict={dict}
        error={error}
        errorMessage={errorMessage}
        onGoHome={handleGoHome}
        onRetry={handleRetry}
      />
    );
  }

  // 로딩 상태
  if (loading) {
    return <PaymentLoading lang={lang} dict={dict} message={loadingMessage} />;
  }

  // 정상 상태 (결제 정보 표시)
  return (
    <div className='container mx-auto px-4 py-8'>
      <PaymentInfoCard
        lang={lang}
        dict={dict}
        productName={productName}
        amount={amount}
        currency={currency}
        orderId={orderId}
      />

      {/* PaymentHandler는 자동으로 결제 요청 실행 */}
      <PaymentHandler
        orderId={orderId}
        customerId={customerId}
        productName={productName}
        amount={amount}
        currency={currency}
        dict={dict}
        onLoading={handleLoading}
        onError={handleError}
      />
    </div>
  );
}
