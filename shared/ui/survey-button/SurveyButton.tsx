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
