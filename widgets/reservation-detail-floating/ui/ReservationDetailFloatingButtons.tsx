'use client';

import { MAX_MOBILE_WIDTH_CLASS, type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useCheckConsultationHistory } from 'features/consultation-request/model/useCheckConsultationHistory';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';

interface ReservationDetailFloatingButtonsProps {
  hospitalId: string;
  reservationId: string;
  lang: Locale;
  dict: Dictionary;
}

/**
 * 예약 상세 페이지 하단 고정 버튼 컴포넌트 (예약 취소, 상담하기)
 */
export function ReservationDetailFloatingButtons({
  hospitalId,
  reservationId,
  lang,
  dict,
}: ReservationDetailFloatingButtonsProps) {
  const router = useLocalizedRouter();
  const { isAuthenticated } = useAuth();
  const checkConsultationHistory = useCheckConsultationHistory();

  // 예약 취소 핸들러 (추후 구현)
  const handleCancelReservation = () => {
    // TODO: 예약 취소 로직 구현
    console.log('예약 취소:', reservationId);
  };

  // 상담하기 핸들러
  const handleConsultationRequest = async () => {
    // 로그인 체크
    if (!isAuthenticated) {
      openModal({
        content: (
          <LoginRequiredModal
            lang={lang}
            dict={dict}
            redirectPath={`/reservation/${reservationId}`}
          />
        ),
      });
      return;
    }

    checkConsultationHistory.mutate(
      { hospitalId },
      {
        onSuccess: (data) => {
          if (data.hasHistory) {
            // 기존 상담 내역이 있으면 채팅 페이지로 이동 (하드 내비게이션)
            const href = `/${lang}/chat/${hospitalId}`;
            if (typeof window !== 'undefined') {
              window.location.href = href;
            }
          } else {
            // 상담 내역이 없으면 상담신청 폼 페이지로 이동
            router.push(`/hospital/${hospitalId}/consultation`);
          }
        },
        onError: (error) => {
          console.error('Error checking consultation history:', error);
          // 에러 발생 시 상담신청 폼 페이지로 이동
          router.push(`/hospital/${hospitalId}/consultation`);
        },
      },
    );
  };

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 mx-auto border-t border-neutral-200 bg-white px-5 pt-4 pb-8 ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      <div className='flex gap-2'>
        {/* 예약 취소 버튼 */}
        <button
          onClick={handleCancelReservation}
          className='flex h-14 flex-1 items-center justify-center rounded-xl bg-[#e5e5e5] px-5 py-4 text-base leading-6 font-medium text-[#404040] transition-colors duration-200 hover:bg-[#d5d5d5]'
        >
          {dict.consultation?.reservationDetail?.cancel || '예약 취소'}
        </button>

        {/* 상담하기 버튼 */}
        <button
          onClick={handleConsultationRequest}
          disabled={checkConsultationHistory.isPending}
          className='bg-sub-900 hover:bg-sub-900/90 flex h-14 flex-1 items-center justify-center rounded-xl px-5 py-4 text-base leading-6 font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'
        >
          {checkConsultationHistory.isPending
            ? dict.hospitalDetailConsultation?.checking || '확인 중...'
            : dict.consultation?.reservationDetail?.consultation || '상담 하기'}
        </button>
      </div>
    </div>
  );
}
