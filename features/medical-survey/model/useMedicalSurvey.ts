'use client';

import { useState, useCallback, useMemo } from 'react';
import { type SurveyQuestion, type SurveyAnswer } from '../api/entities/types';

// 질문 ID에서 기본 번호 추출 (q1, q1-1 → 1, q2 → 2)
function extractQuestionNumber(questionId: string): number {
  const match = questionId.match(/^q(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

// 질문의 다음 질문 ID 가져오기
function getNextQuestionId(
  question: SurveyQuestion,
  answer: boolean | string | null,
): string | undefined {
  if (question.type === 'yes_no') {
    if (answer === true && question.nextQuestion?.yes) {
      return question.nextQuestion.yes;
    } else if (answer === false && question.nextQuestion?.no) {
      return question.nextQuestion.no;
    }
  } else if (question.type === 'text') {
    return question.nextQuestion;
  }
  return undefined;
}

interface UseMedicalSurveyProps {
  questions: SurveyQuestion[];
}

interface UseMedicalSurveyReturn {
  currentQuestionIndex: number;
  currentQuestion: SurveyQuestion | null;
  availableQuestions: SurveyQuestion[];
  progressCurrentNumber: number; // progress bar 계산용 현재 문항 번호
  progressTotal: number; // progress bar 계산용 전체 문항 수
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

  // 질문 맵 생성 (ID로 빠르게 접근)
  const questionMap = useMemo(() => {
    const map = new Map<string, SurveyQuestion>();
    questions.forEach((q) => {
      map.set(q.id, q);
    });
    return map;
  }, [questions]);

  // 조건부 질문 필터링: 질문 데이터의 nextQuestion 정보를 기반으로 동적 계산
  const getAvailableQuestions = useCallback((): SurveyQuestion[] => {
    const availableQuestions: SurveyQuestion[] = [];
    const visited = new Set<string>();

    // 시작 질문 찾기 (첫 번째 질문)
    const startQuestion = questions[0];
    if (!startQuestion) {
      return availableQuestions;
    }

    // BFS로 질문 경로 탐색
    const queue: SurveyQuestion[] = [startQuestion];
    visited.add(startQuestion.id);

    while (queue.length > 0) {
      const current = queue.shift()!;
      availableQuestions.push(current);

      // 다음 질문 결정
      const answer = answers.get(current.id);
      const nextQuestionId = getNextQuestionId(current, answer ?? null);

      // 다음 질문이 있고 아직 방문하지 않았으면 추가
      if (nextQuestionId && !visited.has(nextQuestionId)) {
        const nextQuestion = questionMap.get(nextQuestionId);
        if (nextQuestion) {
          queue.push(nextQuestion);
          visited.add(nextQuestionId);
        }
      }
    }

    return availableQuestions;
  }, [questions, answers, questionMap]);

  const availableQuestions = getAvailableQuestions();
  const currentQuestion = availableQuestions[currentQuestionIndex] || null;

  // progress bar 계산용: 질문 데이터 기반으로 동적 계산
  const getProgressInfo = useCallback((): { currentNumber: number; total: number } => {
    if (!currentQuestion || questions.length === 0) {
      return { currentNumber: 1, total: 1 };
    }

    const currentNumber = extractQuestionNumber(currentQuestion.id);

    // 전체 질문 수 계산: 전체 질문 데이터에서 고유한 기본 번호 개수
    const uniqueNumbers = new Set<number>();
    questions.forEach((q) => {
      uniqueNumbers.add(extractQuestionNumber(q.id));
    });

    return {
      currentNumber,
      total: uniqueNumbers.size,
    };
  }, [currentQuestion, questions]);

  const progressInfo = getProgressInfo();

  const updateAnswer = useCallback(
    (questionId: string, answer: boolean | string) => {
      setAnswers((prev) => {
        const newAnswers = new Map(prev);
        const prevAnswer = prev.get(questionId);

        // 답변이 변경된 경우
        if (prevAnswer !== answer) {
          const question = questionMap.get(questionId);

          if (question) {
            // 이 질문의 nextQuestion으로 연결된 질문들의 답변 재귀적으로 제거
            const removeDependentAnswers = (qId: string) => {
              const q = questionMap.get(qId);
              if (!q) return;

              // 이 질문의 답변 제거
              newAnswers.delete(qId);

              // 이 질문의 모든 nextQuestion 재귀적으로 제거
              if (q.type === 'yes_no') {
                if (q.nextQuestion?.yes) removeDependentAnswers(q.nextQuestion.yes);
                if (q.nextQuestion?.no) removeDependentAnswers(q.nextQuestion.no);
              } else if (q.type === 'text' && q.nextQuestion) {
                removeDependentAnswers(q.nextQuestion);
              }
            };

            // 현재 질문의 모든 nextQuestion 제거
            if (question.type === 'yes_no') {
              if (question.nextQuestion?.yes) removeDependentAnswers(question.nextQuestion.yes);
              if (question.nextQuestion?.no) removeDependentAnswers(question.nextQuestion.no);
            } else if (question.type === 'text' && question.nextQuestion) {
              removeDependentAnswers(question.nextQuestion);
            }

            // 첫 번째 질문의 답변이 변경되면 첫 번째 질문으로 리셋
            if (questionId === questions[0]?.id) {
              setCurrentQuestionIndex(0);
            }
          }
        }

        newAnswers.set(questionId, answer);
        return newAnswers;
      });
    },
    [questionMap, questions],
  );

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
    return Array.from(answers.entries()).map(([questionId, answer]) => {
      const question = questionMap.get(questionId);
      return {
        questionId,
        answer,
        questionText: question?.question,
      };
    });
  }, [answers, questionMap]);

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
    progressCurrentNumber: progressInfo.currentNumber,
    progressTotal: progressInfo.total,
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
