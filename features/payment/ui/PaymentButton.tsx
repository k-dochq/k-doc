'use client';

import { usePayment } from '../model/usePayment';

interface PaymentButtonProps {
  orderId: string;
  customerId: string;
  productName: string;
  amount: number;
}

/**
 * 결제하기 버튼 컴포넌트
 */
export function PaymentButton({ orderId, customerId, productName, amount }: PaymentButtonProps) {
  const { requestPayment } = usePayment();

  const handlePayment = async () => {
    try {
      await requestPayment({
        orderId,
        customerId,
        productName,
        amount,
      });
    } catch (error) {
      console.error('Payment request failed:', error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className='rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
    >
      결제하기
    </button>
  );
}
