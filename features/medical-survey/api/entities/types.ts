export type QuestionType = 'yes_no' | 'text';

// 질문 ID 목록 (순서대로)
export const QUESTION_IDS = ['q1', 'q1-1', 'q2'] as const;

export interface YesNoQuestion {
  id: string;
  type: 'yes_no';
  question: string; // 질문 텍스트 (dictionary에서 가져옴)
  yesLabel: string; // "네, 있어요" (dictionary에서 가져옴)
  noLabel: string; // "아니요, 없어요" (dictionary에서 가져옴)
  required?: boolean;
}

export interface TextQuestion {
  id: string;
  type: 'text';
  question: string; // 질문 텍스트 (dictionary에서 가져옴)
  placeholder?: string; // placeholder 텍스트 (dictionary에서 가져옴)
  required?: boolean;
}

export type SurveyQuestion = YesNoQuestion | TextQuestion;

export interface SurveyAnswer {
  questionId: string;
  answer: boolean | string; // yes_no는 boolean, text는 string
}

export interface SurveyData {
  questions: YesNoQuestion[];
  answers: SurveyAnswer[];
}
