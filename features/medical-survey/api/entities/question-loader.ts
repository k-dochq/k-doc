import { type Dictionary } from 'shared/model/types';
import { type YesNoQuestion, QUESTION_IDS } from './types';

/**
 * Dictionary에서 질문 데이터를 로드하여 YesNoQuestion 배열로 변환
 */
export function loadQuestionsFromDictionary(dict: Dictionary): YesNoQuestion[] {
  const questions: YesNoQuestion[] = [];

  const medicalSurveyQuestions = (
    dict.consultation as {
      medicalSurvey?: {
        questions?: Record<string, { question?: string; yesLabel?: string; noLabel?: string }>;
      };
    }
  )?.medicalSurvey?.questions;

  if (!medicalSurveyQuestions) {
    return questions;
  }

  for (const questionId of QUESTION_IDS) {
    const questionData = medicalSurveyQuestions[questionId];

    if (questionData?.question && questionData.yesLabel && questionData.noLabel) {
      questions.push({
        id: questionId,
        type: 'yes_no',
        question: questionData.question,
        yesLabel: questionData.yesLabel,
        noLabel: questionData.noLabel,
      });
    }
  }

  return questions;
}
