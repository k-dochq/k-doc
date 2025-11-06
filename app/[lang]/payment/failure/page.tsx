import { type Locale } from 'shared/config';

interface PaymentFailurePageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    resultCode?: string;
    resultMessage?: string;
    orderId?: string;
  }>;
}

export default async function PaymentFailurePage({
  params,
  searchParams,
}: PaymentFailurePageProps) {
  const { lang } = await params;
  const queryParams = await searchParams;

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='mb-4 text-2xl font-bold'>결제 실패</h1>
        <div className='space-y-2'>
          {queryParams.resultCode && (
            <p className='text-gray-600'>에러 코드: {queryParams.resultCode}</p>
          )}
          {queryParams.orderId && <p className='text-gray-600'>주문번호: {queryParams.orderId}</p>}
          {queryParams.resultMessage && (
            <p className='text-gray-600'>{queryParams.resultMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
