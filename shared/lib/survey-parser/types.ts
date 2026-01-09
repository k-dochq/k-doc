// 의료설문 버튼 데이터 타입
export interface SurveyButtonData {
  consultationId: string; // hospitalId와 userId로 생성
  userId: string;
  hospitalId: string;
  language: string; // 'ko_KR' | 'en_US' | 'zh_TW' | 'ja_JP' | 'th_TH'
  buttonText: string; // 언어별 "의료 설문 작성하기"
  cooldownDays?: number; // 중복 설문 불가 기간 (일 단위)
}
