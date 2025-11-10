'use client';

import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type PaymentButtonData } from 'shared/lib/payment-parser/types';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { confirm } from 'shared/lib/modal';

interface PaymentButtonsProps {
  data: PaymentButtonData;
  lang: Locale;
  dict: Dictionary;
}

export function PaymentButtons({ data, lang, dict }: PaymentButtonsProps) {
  const router = useLocalizedRouter();

  const handlePaymentClick = () => {
    // 쿼리 파라미터 생성 (redirectUrl 제외)
    const params = new URLSearchParams({
      orderId: data.orderId,
      customerId: data.customerId,
      productName: data.productName,
      amount: data.amount,
    });

    // redirectUrl이 있으면 마지막에 추가 (인코딩)
    if (data.redirectUrl) {
      params.set('redirectUrl', encodeURIComponent(data.redirectUrl));
    }

    // /payment 페이지로 하드 네비게이션
    router.push(`/payment?${params.toString()}`);
  };

  const handleCancelClick = async () => {
    const result = await confirm({
      title: dict.consultation?.cancelReservation?.title || '예약 진행을 취소 하시겠습니까?',
      message:
        dict.consultation?.cancelReservation?.message ||
        '취소하게 되면,\n처음부터 다시 진행해야합니다.',
      confirmText: dict.consultation?.cancelReservation?.confirmButton || '예',
      cancelText: dict.consultation?.cancelReservation?.cancelButton || '아니요',
    });

    if (result) {
      // TODO: 예약 취소 로직 (나중에 구현)
      console.log('예약 취소 진행', data.orderId);
    }
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
      <button onClick={handleCancelClick} className='flex w-full items-center justify-center'>
        <p className='text-sm text-neutral-500'>{data.cancelButtonText}</p>
      </button>
    </div>
  );
}
