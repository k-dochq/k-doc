'use client';

import { type YesNoQuestion } from '../api/entities/types';
import { MedicalSurveyProgressBar } from './MedicalSurveyProgressBar';
import { MedicalSurveyYesNoButton } from './MedicalSurveyYesNoButton';

interface MedicalSurveyQuestionCardProps {
  question: YesNoQuestion;
  totalQuestions: number;
  currentQuestionIndex: number;
  answer: boolean | null;
  onAnswerChange: (answer: boolean) => void;
}

export function MedicalSurveyQuestionCard({
  question,
  totalQuestions,
  currentQuestionIndex,
  answer,
  onAnswerChange,
}: MedicalSurveyQuestionCardProps) {
  return (
    <div className='flex flex-col'>
      {/* 프로그레스바 */}
      <MedicalSurveyProgressBar
        totalQuestions={totalQuestions}
        currentQuestionIndex={currentQuestionIndex}
      />

      {/* 질문 텍스트 (spacing 10 아래) */}
      <div className='mt-10'>
        <h2 className='text-xl font-semibold text-neutral-900'>{question.question}</h2>
      </div>

      {/* 답변 버튼 영역 (spacing 11 아래, gap-2 세로 방향) */}
      <div className='mt-11 flex flex-col gap-2'>
        <MedicalSurveyYesNoButton
          label={question.yesLabel}
          isSelected={answer === true}
          onClick={() => onAnswerChange(true)}
        />
        <MedicalSurveyYesNoButton
          label={question.noLabel}
          isSelected={answer === false}
          onClick={() => onAnswerChange(false)}
        />
      </div>
    </div>
  );
}
