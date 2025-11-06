import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { PayverseSDKLoader } from 'features/payment';
import { PaymentContent } from './PaymentContent';
import { PaymentLoading } from './PaymentLoading';
import { PaymentError } from './PaymentError';

interface PaymentPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    orderId?: string;
    customerId?: string;
    productName?: string;
    amount?: string;
    redirectUrl?: string;
  }>;
}

export default async function PaymentPage({ params, searchParams }: PaymentPageProps) {
  const { lang } = await params;
  const queryParams = await searchParams;
  const dict = await getDictionary(lang);

  // 쿼리 파라미터 검증
  const { orderId, customerId, productName, amountStr, validationError } =
    validateParams(queryParams);

  // 파라미터 검증 실패 시 에러 표시
  if (validationError) {
    return (
      <div className='min-h-screen'>
        <PaymentError lang={lang} dict={dict} error={validationError} />
      </div>
    );
  }

  // 파라미터가 유효한 경우 (validationError가 null이므로 모든 값이 존재함)
  if (!orderId || !customerId || !productName || !amountStr) {
    return (
      <div className='min-h-screen'>
        <PaymentError lang={lang} dict={dict} error={new Error('MISSING_REQUIRED_PARAMS')} />
      </div>
    );
  }

  const amount = parseFloat(amountStr);
  if (isNaN(amount) || !isFinite(amount) || amount <= 0) {
    return (
      <div className='min-h-screen'>
        <PaymentError lang={lang} dict={dict} error={new Error('INVALID_AMOUNT')} />
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <PayverseSDKLoader />
      <Suspense fallback={<PaymentLoading lang={lang} dict={dict} />}>
        <PaymentContent
          lang={lang}
          dict={dict}
          orderId={orderId}
          customerId={customerId}
          productName={productName}
          amount={amount}
          redirectUrl={queryParams.redirectUrl}
        />
      </Suspense>
    </div>
  );
}

/**
 * 쿼리 파라미터 검증 함수
 */
function validateParams(params: {
  orderId?: string;
  customerId?: string;
  productName?: string;
  amount?: string;
}): {
  orderId: string | null;
  customerId: string | null;
  productName: string | null;
  amountStr: string | null;
  validationError: Error | null;
} {
  // 필수 파라미터 확인
  if (!params.orderId || params.orderId.trim() === '') {
    return {
      orderId: null,
      customerId: null,
      productName: null,
      amountStr: null,
      validationError: new Error('MISSING_ORDER_ID'),
    };
  }

  if (!params.customerId || params.customerId.trim() === '') {
    return {
      orderId: params.orderId,
      customerId: null,
      productName: null,
      amountStr: null,
      validationError: new Error('MISSING_CUSTOMER_ID'),
    };
  }

  if (!params.productName || params.productName.trim() === '') {
    return {
      orderId: params.orderId,
      customerId: params.customerId,
      productName: null,
      amountStr: null,
      validationError: new Error('MISSING_PRODUCT_NAME'),
    };
  }

  if (!params.amount || params.amount.trim() === '') {
    return {
      orderId: params.orderId,
      customerId: params.customerId,
      productName: params.productName,
      amountStr: null,
      validationError: new Error('MISSING_AMOUNT'),
    };
  }

  // amount가 숫자인지 확인
  const amountNum = parseFloat(params.amount);
  if (isNaN(amountNum) || !isFinite(amountNum)) {
    return {
      orderId: params.orderId,
      customerId: params.customerId,
      productName: params.productName,
      amountStr: params.amount,
      validationError: new Error('INVALID_AMOUNT'),
    };
  }

  // amount가 0보다 큰지 확인
  if (amountNum <= 0) {
    return {
      orderId: params.orderId,
      customerId: params.customerId,
      productName: params.productName,
      amountStr: params.amount,
      validationError: new Error('INVALID_AMOUNT'),
    };
  }

  return {
    orderId: params.orderId,
    customerId: params.customerId,
    productName: params.productName,
    amountStr: params.amount,
    validationError: null,
  };
}
