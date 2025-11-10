'use client';

import React from 'react';
import { extractPaymentFlag, removePaymentFlag } from './payment-parser';
import { PaymentButtons } from 'shared/ui/payment-buttons';
import { parseTextWithLinks } from 'shared/lib/url-parser';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ParseTextWithPaymentButtonsParams {
  message: string;
  lang: Locale;
  dict: Dictionary;
  redirectUrl?: string;
}

/**
 * 메시지에서 payment flag를 찾아서 버튼으로 변환하고, 나머지 텍스트는 링크로 변환
 * @param params 파라미터 객체
 * @param params.message 메시지 내용
 * @param params.lang 언어 코드
 * @param params.dict 다국어 dictionary
 * @param params.redirectUrl 결제 완료 후 리다이렉트할 URL (선택사항)
 * @returns React 요소 배열 (텍스트, 링크, 버튼 컴포넌트)
 */
export function parseTextWithPaymentButtons({
  message,
  lang,
  dict,
  redirectUrl,
}: ParseTextWithPaymentButtonsParams): (string | React.ReactElement)[] {
  if (!message) return [message];

  const paymentData = extractPaymentFlag(message);

  // payment flag가 없으면 기존 parseTextWithLinks 사용
  if (!paymentData) {
    return parseTextWithLinks(message);
  }

  // payment flag를 제거한 메시지
  const textWithoutFlag = removePaymentFlag(message);

  const result: (string | React.ReactElement)[] = [];

  // 텍스트가 있으면 먼저 파싱하여 추가
  if (textWithoutFlag.trim()) {
    const parsedText = parseTextWithLinks(textWithoutFlag);
    // 각 요소에 고유한 key 부여
    parsedText.forEach((item, index) => {
      if (React.isValidElement(item)) {
        // 이미 React 요소인 경우 고유한 key로 재설정
        result.push(
          React.cloneElement(item, {
            key: `link-${index}`,
          }),
        );
      } else {
        result.push(item);
      }
    });
  }

  // PaymentButtons 컴포넌트 추가 (redirectUrl 전달)
  const paymentDataWithRedirect = redirectUrl ? { ...paymentData, redirectUrl } : paymentData;
  result.push(
    <PaymentButtons key='payment-buttons' data={paymentDataWithRedirect} lang={lang} dict={dict} />,
  );

  return result;
}
