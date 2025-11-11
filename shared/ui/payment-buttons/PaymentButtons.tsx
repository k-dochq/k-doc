'use client';

import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type PaymentButtonData } from 'shared/lib/payment-parser/types';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { confirm, alert, closeModal, setModalLoading } from 'shared/lib/modal';
import { useCancelReservation } from 'features/reservation-cancel/model/useCancelReservation';

interface PaymentButtonsProps {
  data: PaymentButtonData;
  lang: Locale;
  dict: Dictionary;
}

export function PaymentButtons({ data, lang, dict }: PaymentButtonsProps) {
  const router = useLocalizedRouter();
  const { mutate: cancelReservation, isPending } = useCancelReservation();

  const handlePaymentClick = () => {
    // 쿼리 파라미터 생성
    const params = new URLSearchParams({
      orderId: data.orderId,
      customerId: data.customerId,
      productName: data.productName,
      amount: data.amount,
    });

    // returnUrl이 있으면 추가 (인코딩하지 않음 - URLSearchParams가 자동 처리)
    if (data.returnUrl) {
      params.set('returnUrl', data.returnUrl);
    }

    // /payment 페이지로 하드 네비게이션
    router.push(`/payment?${params.toString()}`);
  };

  const handleCancelClick = async () => {
    console.log('[PaymentButtons] 취소 버튼 클릭됨, orderId:', data.orderId);

    const result = await confirm({
      title: dict.consultation?.cancelReservation?.title || '예약 진행을 취소 하시겠습니까?',
      message:
        dict.consultation?.cancelReservation?.message ||
        '취소하게 되면,\n처음부터 다시 진행해야합니다.',
      confirmText: dict.consultation?.cancelReservation?.confirmButton || '예',
      cancelText: dict.consultation?.cancelReservation?.cancelButton || '아니요',
    });

    console.log('[PaymentButtons] Confirm 결과:', result);

    if (result) {
      // Yes를 눌렀을 때: 로딩 상태 시작
      setModalLoading(true);
      console.log('[PaymentButtons] 취소 요청 시작, orderId:', data.orderId);

      cancelReservation(data.orderId, {
        onSuccess: (response) => {
          console.log('[PaymentButtons] 취소 성공:', response);
          // 로딩 상태 종료 및 모달 닫기
          setModalLoading(false);
          closeModal();
          // 성공 시 메시지는 서버에서 상담 메시지로 추가되므로
          // 페이지를 새로고침하여 최신 메시지를 표시
          if (response.success) {
            // 웹훅을 기다려야 하는 경우는 서버에서 이미 메시지가 추가됨
            // 페이지 새로고침으로 메시지 리스트 갱신
            window.location.reload();
          }
        },
        onError: (error) => {
          console.error('[PaymentButtons] 취소 실패:', error);
          // 로딩 상태 종료
          setModalLoading(false);
          // 모달은 열린 상태로 유지하고 에러 메시지 표시
          alert({
            message: error.message || '예약 취소 중 오류가 발생했습니다.',
          });
        },
      });
    } else {
      console.log('[PaymentButtons] 사용자가 취소를 선택함');
      // No를 눌렀을 때는 이미 모달이 닫혔음
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
      <button
        onClick={handleCancelClick}
        disabled={isPending}
        className='flex w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-50'
      >
        <p className='text-sm text-neutral-500'>{data.cancelButtonText}</p>
      </button>
    </div>
  );
}
