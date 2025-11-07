'use client';

import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type PaymentButtonData } from 'shared/lib/payment-parser/types';

interface PaymentButtonsProps {
  data: PaymentButtonData;
}

export function PaymentButtons({ data }: PaymentButtonsProps) {
  const router = useLocalizedRouter();

  const handlePaymentClick = () => {
    // 쿼리 파라미터 생성
    const params = new URLSearchParams({
      orderId: data.orderId,
      customerId: data.customerId,
      productName: data.productName,
      amount: data.amount,
    });

    // redirectUrl이 있으면 추가
    if (data.redirectUrl) {
      params.set('redirectUrl', data.redirectUrl);
    }

    // /payment 페이지로 하드 네비게이션
    router.push(`/payment?${params.toString()}`);
  };

  return (
    <div className='flex w-full flex-col gap-[10px] pt-2'>
      {/* 결제 버튼 */}
      <button
        onClick={handlePaymentClick}
        className='flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#ff60f7] to-[#ae33fb] px-5 py-3 transition-opacity hover:opacity-90 active:opacity-80'
      >
        <p className="font-['Pretendard:Medium',sans-serif] text-[14px] leading-[20px] text-white">
          {data.paymentButtonText}
        </p>
      </button>
      {/* 취소 버튼 */}
      <div className='flex w-full items-center justify-center'>
        <p className="font-['Pretendard:Regular',sans-serif] text-[14px] leading-[20px] text-neutral-500">
          {data.cancelButtonText}
        </p>
      </div>
    </div>
  );
}
