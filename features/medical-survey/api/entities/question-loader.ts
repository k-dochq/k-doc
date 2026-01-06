import { type Dictionary } from 'shared/model/types';
import { type SurveyQuestion, QUESTION_IDS } from './types';

/**
 * Dictionary에서 질문 데이터를 로드하여 SurveyQuestion 배열로 변환
 */
export function loadQuestionsFromDictionary(dict: Dictionary): SurveyQuestion[] {
  const questions: SurveyQuestion[] = [];

  const medicalSurveyQuestions = (
    dict.consultation as {
      medicalSurvey?: {
        questions?: Record<
          string,
          { question?: string; yesLabel?: string; noLabel?: string; placeholder?: string }
        >;
      };
    }
  )?.medicalSurvey?.questions;

  if (!medicalSurveyQuestions) {
    return questions;
  }

  for (const questionId of QUESTION_IDS) {
    const questionData = medicalSurveyQuestions[questionId];

    if (!questionData?.question) {
      continue;
    }

    // yes_no 타입 질문 (yesLabel, noLabel이 있는 경우)
    if (questionData.yesLabel && questionData.noLabel) {
      questions.push({
        id: questionId,
        type: 'yes_no',
        question: questionData.question,
        yesLabel: questionData.yesLabel,
        noLabel: questionData.noLabel,
      });
    }
    // text 타입 질문 (placeholder가 있는 경우)
    else if (questionData.placeholder !== undefined) {
      questions.push({
        id: questionId,
        type: 'text',
        question: questionData.question,
        placeholder: questionData.placeholder,
      });
    }
  }

  return questions;
}
