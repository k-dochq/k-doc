import { redirect } from 'next/navigation';
import { type Locale } from 'shared/config';

interface PaymentReturnPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    resultStatus?: string;
    resultCode?: string;
    resultMessage?: string;
    tid?: string;
    orderId?: string;
    mallReserved?: string;
  }>;
}

export default async function PaymentReturnPage({ params, searchParams }: PaymentReturnPageProps) {
  const { lang } = await params;
  const queryParams = await searchParams;

  // resultStatus에 따라 성공/실패 페이지로 리다이렉트
  const resultStatus = queryParams.resultStatus;

  // 쿼리 파라미터를 URLSearchParams로 변환
  const searchParamsObj = new URLSearchParams();
  if (queryParams.orderId) searchParamsObj.set('orderId', queryParams.orderId);
  if (queryParams.tid) searchParamsObj.set('tid', queryParams.tid);
  if (queryParams.resultMessage) searchParamsObj.set('resultMessage', queryParams.resultMessage);
  if (queryParams.resultCode) searchParamsObj.set('resultCode', queryParams.resultCode);

  const queryString = searchParamsObj.toString();

  if (resultStatus === 'SUCCESS') {
    // 성공 페이지로 리다이렉트
    redirect(`/${lang}/payment/success${queryString ? `?${queryString}` : ''}`);
  } else if (resultStatus === 'FAILURE' || resultStatus === 'FAILED' || resultStatus === 'CANCEL') {
    // 실패 페이지로 리다이렉트
    redirect(`/${lang}/payment/failure${queryString ? `?${queryString}` : ''}`);
  }

  // resultStatus가 없거나 예상치 못한 값인 경우 기본 화면 표시
  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='mb-4 text-2xl font-bold'>결제 결과 처리</h1>
        <div className='space-y-2'>
          <p className='text-gray-600'>결제 상태: {resultStatus || 'Unknown'}</p>
          {queryParams.orderId && <p className='text-gray-600'>주문번호: {queryParams.orderId}</p>}
          {queryParams.tid && <p className='text-gray-600'>거래번호: {queryParams.tid}</p>}
          {queryParams.resultMessage && (
            <p className='text-gray-600'>메시지: {queryParams.resultMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
