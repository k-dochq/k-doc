interface MedicalSurveyProgressBarProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  className?: string;
}

export function MedicalSurveyProgressBar({
  totalQuestions,
  currentQuestionIndex,
  className = '',
}: MedicalSurveyProgressBarProps) {
  // 전체 진행률 계산 (0-100%)
  const progressPercentage =
    totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <div className={`flex justify-center ${className}`}>
      <div className='relative w-full'>
        {/* 배경 바 */}
        <div className='h-[3px] overflow-hidden rounded-full bg-[#FCE4FF]'>
          {/* 진행 바 */}
          <div
            className='h-full rounded-full bg-[#f15bff] transition-all duration-300 ease-in-out'
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
