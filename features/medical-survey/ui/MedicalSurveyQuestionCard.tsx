'use client';

import { type SurveyQuestion } from '../api/entities/types';
import { MedicalSurveyProgressBar } from './MedicalSurveyProgressBar';
import { MedicalSurveyYesNoButton } from './MedicalSurveyYesNoButton';
import { MedicalSurveyTextarea } from './MedicalSurveyTextarea';

interface MedicalSurveyQuestionCardProps {
  question: SurveyQuestion;
  totalQuestions: number;
  currentQuestionIndex: number;
  answer: boolean | string | null;
  onAnswerChange: (answer: boolean | string) => void;
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

      {/* 답변 영역 (spacing 11 아래) */}
      <div className='mt-11'>
        {question.type === 'yes_no' ? (
          <div className='flex flex-col gap-2'>
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
        ) : (
          <MedicalSurveyTextarea
            value={typeof answer === 'string' ? answer : ''}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder={question.placeholder}
            maxLength={2000}
            currentLength={typeof answer === 'string' ? answer.length : 0}
          />
        )}
      </div>
    </div>
  );
}
