import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { PayverseSDKLoader } from 'features/payment';
import { PaymentHandler } from 'features/payment/ui/PaymentHandler';
import { PAYVERSE_CONFIG } from 'features/payment/config/payverse';
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
    currency?: string;
  }>;
}

export default async function PaymentPage({ params, searchParams }: PaymentPageProps) {
  const { lang } = await params;
  const queryParams = await searchParams;
  const dict = await getDictionary(lang);

  // 쿼리 파라미터 검증
  const { orderId, customerId, productName, amountStr, currency, validationError } =
    validateParams(queryParams);

  // 파라미터 검증 실패 시 에러 표시
  if (validationError) {
    return (
      <div className='min-h-screen'>
        <PaymentError
          lang={lang}
          dict={dict}
          error={validationError}
          onGoHome={() => {
            // 클라이언트에서 처리
          }}
        />
      </div>
    );
  }

  // 파라미터가 유효한 경우
  const amount = parseFloat(amountStr!);
  const finalCurrency = currency || PAYVERSE_CONFIG.CURRENCY;

  return (
    <div className='min-h-screen'>
      <PayverseSDKLoader />
      <Suspense fallback={<PaymentLoading lang={lang} dict={dict} />}>
        <PaymentContent
          lang={lang}
          dict={dict}
          orderId={orderId!}
          customerId={customerId!}
          productName={productName!}
          amount={amount}
          currency={finalCurrency}
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
  currency?: string;
}): {
  orderId: string | null;
  customerId: string | null;
  productName: string | null;
  amountStr: string | null;
  currency: string | null;
  validationError: Error | null;
} {
  // 필수 파라미터 확인
  if (!params.orderId || params.orderId.trim() === '') {
    return {
      orderId: null,
      customerId: null,
      productName: null,
      amountStr: null,
      currency: null,
      validationError: new Error('MISSING_ORDER_ID'),
    };
  }

  if (!params.customerId || params.customerId.trim() === '') {
    return {
      orderId: params.orderId,
      customerId: null,
      productName: null,
      amountStr: null,
      currency: null,
      validationError: new Error('MISSING_CUSTOMER_ID'),
    };
  }

  if (!params.productName || params.productName.trim() === '') {
    return {
      orderId: params.orderId,
      customerId: params.customerId,
      productName: null,
      amountStr: null,
      currency: null,
      validationError: new Error('MISSING_PRODUCT_NAME'),
    };
  }

  if (!params.amount || params.amount.trim() === '') {
    return {
      orderId: params.orderId,
      customerId: params.customerId,
      productName: params.productName,
      amountStr: null,
      currency: null,
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
      currency: params.currency || null,
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
      currency: params.currency || null,
      validationError: new Error('INVALID_AMOUNT'),
    };
  }

  // currency 검증 (지원되는 통화: USD, KRW, THB)
  if (params.currency) {
    const supportedCurrencies = ['USD', 'KRW', 'THB'];
    if (!supportedCurrencies.includes(params.currency.toUpperCase())) {
      return {
        orderId: params.orderId,
        customerId: params.customerId,
        productName: params.productName,
        amountStr: params.amount,
        currency: params.currency,
        validationError: new Error('INVALID_CURRENCY'),
      };
    }
  }

  return {
    orderId: params.orderId,
    customerId: params.customerId,
    productName: params.productName,
    amountStr: params.amount,
    currency: params.currency || null,
    validationError: null,
  };
}
