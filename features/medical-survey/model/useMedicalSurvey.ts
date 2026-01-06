'use client';

import { useState, useCallback } from 'react';
import { type SurveyQuestion, type SurveyAnswer } from '../api/entities/types';

interface UseMedicalSurveyProps {
  questions: SurveyQuestion[];
}

interface UseMedicalSurveyReturn {
  currentQuestionIndex: number;
  currentQuestion: SurveyQuestion | null;
  availableQuestions: SurveyQuestion[];
  answers: Map<string, boolean | string>;
  updateAnswer: (questionId: string, answer: boolean | string) => void;
  goToNextQuestion: () => void;
  isQuestionAnswered: (questionId: string) => boolean;
  getAnswer: (questionId: string) => boolean | string | null;
  getAllAnswers: () => SurveyAnswer[];
  isAllAnswered: () => boolean;
  isCurrentQuestionAnswered: () => boolean;
  isLastQuestion: () => boolean;
}

export function useMedicalSurvey({ questions }: UseMedicalSurveyProps): UseMedicalSurveyReturn {
  const [answers, setAnswers] = useState<Map<string, boolean | string>>(new Map());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 조건부 질문 필터링: q1의 답변에 따라 표시할 질문 결정
  const getAvailableQuestions = useCallback((): SurveyQuestion[] => {
    const q1Answer = answers.get('q1');
    const availableQuestions: SurveyQuestion[] = [questions[0]]; // q1은 항상 포함

    if (q1Answer === true) {
      // q1이 "예"면 q1-1 (text) 추가
      const q1_1 = questions.find((q) => q.id === 'q1-1');
      if (q1_1) {
        availableQuestions.push(q1_1);
      }
    } else if (q1Answer === false) {
      // q1이 "아니요"면 q2 (yes_no) 추가
      const q2 = questions.find((q) => q.id === 'q2');
      if (q2) {
        availableQuestions.push(q2);
      }
    }

    return availableQuestions;
  }, [questions, answers]);

  const availableQuestions = getAvailableQuestions();
  const currentQuestion = availableQuestions[currentQuestionIndex] || null;

  const updateAnswer = useCallback((questionId: string, answer: boolean | string) => {
    setAnswers((prev) => {
      const newAnswers = new Map(prev);

      // q1의 답변이 변경되면 관련 질문의 답변 제거 및 인덱스 리셋
      if (questionId === 'q1') {
        const prevQ1Answer = prev.get('q1');
        if (prevQ1Answer !== answer) {
          // q1 답변이 변경되면 q1-1 또는 q2의 답변 제거
          if (prevQ1Answer === true) {
            // 이전에 "예"였다면 q1-1 답변 제거
            newAnswers.delete('q1-1');
          } else if (prevQ1Answer === false) {
            // 이전에 "아니요"였다면 q2 답변 제거
            newAnswers.delete('q2');
          }
          // q1 답변 변경 시 첫 번째 질문으로 리셋
          setCurrentQuestionIndex(0);
        }
      }

      newAnswers.set(questionId, answer);
      return newAnswers;
    });
  }, []);

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => {
      const available = getAvailableQuestions();
      if (prev < available.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [getAvailableQuestions]);

  const isQuestionAnswered = useCallback(
    (questionId: string) => {
      const answer = answers.get(questionId);
      if (answer === undefined || answer === null) {
        return false;
      }
      // string 타입인 경우 빈 문자열 체크
      if (typeof answer === 'string') {
        return answer.trim().length > 0;
      }
      return true;
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
    const available = getAvailableQuestions();
    return available.every((q) => isQuestionAnswered(q.id));
  }, [getAvailableQuestions, isQuestionAnswered]);

  const isCurrentQuestionAnswered = useCallback((): boolean => {
    if (!currentQuestion) {
      return false;
    }
    return isQuestionAnswered(currentQuestion.id);
  }, [currentQuestion, isQuestionAnswered]);

  const isLastQuestion = useCallback((): boolean => {
    const available = getAvailableQuestions();
    return currentQuestionIndex === available.length - 1;
  }, [currentQuestionIndex, getAvailableQuestions]);

  return {
    currentQuestionIndex,
    currentQuestion,
    availableQuestions,
    answers,
    updateAnswer,
    goToNextQuestion,
    isQuestionAnswered,
    getAnswer,
    getAllAnswers,
    isAllAnswered,
    isCurrentQuestionAnswered,
    isLastQuestion,
  };
}
