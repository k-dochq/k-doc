'use client';

import { type YesNoQuestion } from '../api/entities/types';
import { MedicalSurveyQuestionCard } from './MedicalSurveyQuestionCard';

interface MedicalSurveyQuestionsProps {
  questions: YesNoQuestion[];
  currentQuestionIndex: number;
  currentQuestion: YesNoQuestion | null;
  getAnswer: (questionId: string) => boolean | null;
  updateAnswer: (questionId: string, answer: boolean) => void;
}

export function MedicalSurveyQuestions({
  questions,
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
        totalQuestions={questions.length}
        currentQuestionIndex={currentQuestionIndex}
        answer={answer}
        onAnswerChange={(newAnswer) => updateAnswer(currentQuestion.id, newAnswer)}
      />
    </div>
  );
}
