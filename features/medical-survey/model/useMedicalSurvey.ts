'use client';

import { useState, useCallback, useMemo } from 'react';
import { type YesNoQuestion, type SurveyAnswer } from '../api/entities/types';

interface UseMedicalSurveyProps {
  questions: YesNoQuestion[];
}

interface UseMedicalSurveyReturn {
  currentQuestionIndex: number;
  currentQuestion: YesNoQuestion | null;
  answers: Map<string, boolean>;
  updateAnswer: (questionId: string, answer: boolean) => void;
  isQuestionAnswered: (questionId: string) => boolean;
  getAnswer: (questionId: string) => boolean | null;
  getAllAnswers: () => SurveyAnswer[];
  isAllAnswered: () => boolean;
}

export function useMedicalSurvey({ questions }: UseMedicalSurveyProps): UseMedicalSurveyReturn {
  const [answers, setAnswers] = useState<Map<string, boolean>>(new Map());

  const currentQuestionIndex = 0; // 단일 질문이므로 항상 0
  const currentQuestion = questions[0] || null;

  const updateAnswer = useCallback((questionId: string, answer: boolean) => {
    setAnswers((prev) => {
      const newAnswers = new Map(prev);
      newAnswers.set(questionId, answer);
      return newAnswers;
    });
  }, []);

  const isQuestionAnswered = useCallback(
    (questionId: string) => {
      return answers.has(questionId);
    },
    [answers],
  );

  const getAnswer = useCallback(
    (questionId: string) => {
      return answers.get(questionId) ?? null;
    },
    [answers],
  );

  const getAllAnswers = useCallback((): SurveyAnswer[] => {
    return Array.from(answers.entries()).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));
  }, [answers]);

  const isAllAnswered = useCallback((): boolean => {
    return questions.every((q) => answers.has(q.id));
  }, [questions, answers]);

  return {
    currentQuestionIndex,
    currentQuestion,
    answers,
    updateAnswer,
    isQuestionAnswered,
    getAnswer,
    getAllAnswers,
    isAllAnswered,
  };
}
