import { PayverseSDKLoader } from 'features/payment';

export default async function PaymentPage() {
  return (
    <div className='min-h-screen'>
      <PayverseSDKLoader />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='mb-4 text-2xl font-bold'>결제 페이지</h1>
        <p className='text-gray-600'>결제 페이지가 여기에 표시됩니다.</p>
      </div>
    </div>
  );
}
