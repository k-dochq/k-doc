'use client';

import { MAX_MOBILE_WIDTH_CLASS, type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface HospitalDetailConsultationFloatingProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

/**
 * 병원 상세 페이지 하단 고정 상담신청 버튼 컴포넌트
 */
export function HospitalDetailConsultationFloating({
  hospitalId,
  lang,
  dict,
}: HospitalDetailConsultationFloatingProps) {
  const handleConsultationRequest = () => {
    // TODO: 상담신청 페이지로 이동하는 로직 구현
    console.log('상담신청 요청:', hospitalId);
  };

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 mx-auto px-5 py-4 ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      <button
        onClick={handleConsultationRequest}
        className='bg-primary hover:bg-primary/70 w-full rounded-xl px-10 py-4 text-base leading-6 font-medium text-white transition-colors duration-200'
      >
        {dict.hospitalDetailConsultation.requestButton}
      </button>
    </div>
  );
}
