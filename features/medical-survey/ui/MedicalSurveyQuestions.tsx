'use client';

import { type SurveyQuestion } from '../api/entities/types';
import { MedicalSurveyQuestionCard } from './MedicalSurveyQuestionCard';

interface MedicalSurveyQuestionsProps {
  questions: SurveyQuestion[];
  currentQuestionIndex: number;
  currentQuestion: SurveyQuestion | null;
  getAnswer: (questionId: string) => boolean | string | null;
  updateAnswer: (questionId: string, answer: boolean | string) => void;
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
