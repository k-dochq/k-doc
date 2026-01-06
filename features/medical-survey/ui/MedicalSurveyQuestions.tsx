'use client';

import { type SurveyQuestion } from '../api/entities/types';
import { MedicalSurveyQuestionCard } from './MedicalSurveyQuestionCard';

interface MedicalSurveyQuestionsProps {
  questions: SurveyQuestion[];
  progressCurrentNumber: number;
  progressTotal: number;
  currentQuestionIndex: number;
  currentQuestion: SurveyQuestion | null;
  getAnswer: (questionId: string) => boolean | string | null;
  updateAnswer: (questionId: string, answer: boolean | string) => void;
}

export function MedicalSurveyQuestions({
  questions,
  progressCurrentNumber,
  progressTotal,
  currentQuestionIndex,
  currentQuestion,
  getAnswer,
  updateAnswer,
}: MedicalSurveyQuestionsProps) {
  if (!currentQuestion) {
    return null;
  }

  const answer = getAnswer(currentQuestion.id);

  return (
    <div className='p-5'>
      <MedicalSurveyQuestionCard
        question={currentQuestion}
        totalQuestions={progressTotal}
        currentQuestionIndex={progressCurrentNumber - 1}
        answer={answer}
        onAnswerChange={(newAnswer) => updateAnswer(currentQuestion.id, newAnswer)}
      />
    </div>
  );
}
