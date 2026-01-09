'use client';

import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type SurveyButtonData } from 'shared/lib/survey-parser/types';
import { type Locale } from 'shared/config';

interface SurveyButtonProps {
  data: SurveyButtonData;
  lang: Locale;
}

export function SurveyButton({ data, lang }: SurveyButtonProps) {
  const router = useLocalizedRouter();

  const handleSurveyClick = () => {
    // 로컬스토리지에서 이전 설문 작성 여부 확인
    const storageKey = `medical-survey-${data.consultationId}`;
    const stored = localStorage.getItem(storageKey);

    if (stored) {
      try {
        const { completedAt, cooldownDays } = JSON.parse(stored);
        const cooldownPeriod = cooldownDays || data.cooldownDays || 0;

        if (cooldownPeriod > 0) {
          const daysSinceCompletion = (Date.now() - completedAt) / (1000 * 60 * 60 * 24);
          if (daysSinceCompletion < cooldownPeriod) {
            window.alert('이미 설문 작성을 완료하셨습니다.');
            return;
          }
        }
      } catch (error) {
        console.error('로컬스토리지 데이터 파싱 실패:', error);
        // 파싱 실패 시 계속 진행
      }
    }

    // cooldownDays를 임시로 로컬스토리지에 저장 (설문 페이지에서 사용)
    if (data.cooldownDays !== undefined) {
      const tempStorageKey = `medical-survey-temp-${data.consultationId}`;
      localStorage.setItem(
        tempStorageKey,
        JSON.stringify({
          cooldownDays: data.cooldownDays,
        }),
      );
    }

    // 의료설문 페이지로 이동
    router.push(`/medical-survey/${data.consultationId}`);
  };

  return (
    <div className='flex w-full flex-col gap-[10px] pt-2'>
      <button
        onClick={handleSurveyClick}
        className='flex w-full items-center justify-center rounded-xl px-5 py-3 transition-opacity hover:opacity-90 active:opacity-80'
        style={{ backgroundColor: '#7657FF' }}
      >
        <p className="font-['Pretendard:Medium',sans-serif] text-[14px] leading-[20px] text-white">
          {data.buttonText}
        </p>
      </button>
    </div>
  );
}
