'use client';

import { MAX_MOBILE_WIDTH_CLASS, type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useCheckConsultationHistory } from 'features/consultation-request/model/useCheckConsultationHistory';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';

interface HospitalDetailConsultationFloatingV2Props {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

/**
 * 병원 상세 페이지 v2 하단 고정 상담신청 버튼 컴포넌트
 */
export function HospitalDetailConsultationFloatingV2({
  hospitalId,
  lang,
  dict,
}: HospitalDetailConsultationFloatingV2Props) {
  const router = useLocalizedRouter();
  const { isAuthenticated } = useAuth();
  const checkConsultationHistory = useCheckConsultationHistory();

  const handleConsultationRequest = async () => {
    // 로그인 체크
    if (!isAuthenticated) {
      openModal({
        content: (
          <LoginRequiredModal lang={lang} dict={dict} redirectPath={`/hospital/${hospitalId}`} />
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
      <button
        onClick={handleConsultationRequest}
        disabled={checkConsultationHistory.isPending}
        className='h-14 w-full rounded-xl bg-[#7657FF] text-base leading-6 font-medium text-white transition-colors duration-200 hover:bg-[#7657FF]/90 disabled:cursor-not-allowed disabled:bg-[#7657FF]/50'
      >
        {checkConsultationHistory.isPending
          ? dict.hospitalDetailConsultation.checking
          : dict.hospitalDetailConsultation.requestButton}
      </button>
    </div>
  );
}
