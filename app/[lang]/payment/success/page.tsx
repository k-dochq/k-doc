import { type Locale } from 'shared/config';

interface PaymentSuccessPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    orderId?: string;
    tid?: string;
    resultMessage?: string;
  }>;
}

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: PaymentSuccessPageProps) {
  const { lang } = await params;
  const queryParams = await searchParams;

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='mb-4 text-2xl font-bold'>결제 성공</h1>
        <div className='space-y-2'>
          {queryParams.orderId && <p className='text-gray-600'>주문번호: {queryParams.orderId}</p>}
          {queryParams.tid && <p className='text-gray-600'>거래번호: {queryParams.tid}</p>}
          {queryParams.resultMessage && (
            <p className='text-gray-600'>{queryParams.resultMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
