export type QuestionType = 'yes_no' | 'text';

// 질문 ID 목록 (순서대로)
export const QUESTION_IDS = ['q1'] as const;

export interface YesNoQuestion {
  id: string;
  type: 'yes_no';
  question: string; // 질문 텍스트 (dictionary에서 가져옴)
  yesLabel: string; // "네, 있어요" (dictionary에서 가져옴)
  noLabel: string; // "아니요, 없어요" (dictionary에서 가져옴)
  required?: boolean;
}

export interface SurveyAnswer {
  questionId: string;
  answer: boolean; // true: 네, false: 아니요
}

export interface SurveyData {
  questions: YesNoQuestion[];
  answers: SurveyAnswer[];
}
