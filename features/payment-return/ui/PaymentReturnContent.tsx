'use client';

import { type Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { PaymentReturnSuccess } from './PaymentReturnSuccess';
import { PaymentReturnFailure } from './PaymentReturnFailure';
import { PaymentReturnProcessing } from './PaymentReturnProcessing';
import type { PaymentReturnQueryParams } from '../model/types';

interface PaymentReturnContentProps {
  lang: Locale;
  dict: Dictionary;
  queryParams: PaymentReturnQueryParams;
}

export function PaymentReturnContent({ lang, dict, queryParams }: PaymentReturnContentProps) {
  const router = useLocalizedRouter();

  // resultStatus 확인 (대소문자 구분 없이)
  const resultStatus = queryParams.resultStatus?.toUpperCase();
  const isSuccess = resultStatus === 'SUCCESS';

  // 실패 상태 판단: resultStatus가 실패 상태이거나, resultCode/resultMessage가 있으면 실패로 간주
  const isFailure =
    resultStatus === 'FAILURE' ||
    resultStatus === 'FAILED' ||
    resultStatus === 'CANCEL' ||
    resultStatus === 'DECLINE' ||
    resultStatus === 'CANCELLED' ||
    !!queryParams.resultCode ||
    (!!queryParams.resultMessage && resultStatus !== 'SUCCESS');

  const handleGoHome = () => {
    // redirectUrl이 있으면 그곳으로, 없으면 홈으로
    if (queryParams.redirectUrl) {
      window.location.href = queryParams.redirectUrl;
    } else {
      router.push('/');
    }
  };

  const handleRetry = () => {
    // 이전 페이지로 돌아가서 다시 시도
    router.back();
  };

  // 성공 UI
  if (isSuccess) {
    return (
      <PaymentReturnSuccess
        lang={lang}
        dict={dict}
        queryParams={queryParams}
        onGoHome={handleGoHome}
      />
    );
  }

  // 실패 UI
  if (isFailure) {
    return (
      <PaymentReturnFailure
        lang={lang}
        dict={dict}
        queryParams={queryParams}
        onGoHome={handleGoHome}
        onRetry={handleRetry}
      />
    );
  }

  // resultStatus가 없거나 예상치 못한 값인 경우 (처리 중 UI)
  return (
    <PaymentReturnProcessing
      lang={lang}
      dict={dict}
      queryParams={queryParams}
      onGoHome={handleGoHome}
    />
  );
}
