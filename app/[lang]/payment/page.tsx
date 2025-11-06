import { PayverseSDKLoader, PaymentButton } from 'features/payment';

export default async function PaymentPage() {
  // TODO: 실제 주문 정보는 API나 상태 관리에서 가져와야 합니다
  const orderInfo = {
    orderId: `order_${Date.now()}`,
    customerId: 'customer_001',
    productName: '테스트 상품',
    amount: 100,
    currency: 'USD',
  };

  return (
    <div className='min-h-screen'>
      <PayverseSDKLoader />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='mb-4 text-2xl font-bold'>결제 페이지</h1>
        <div className='mb-6 space-y-2'>
          <p className='text-gray-600'>상품명: {orderInfo.productName}</p>
          <p className='text-gray-600'>
            결제 금액: {orderInfo.amount} {orderInfo.currency}
          </p>
        </div>
        <PaymentButton {...orderInfo} />
      </div>
    </div>
  );
}
