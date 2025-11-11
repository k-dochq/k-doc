/**
 * 환경 판단 함수
 * NEXT_PUBLIC_ENVIRONMENT 또는 ENVIRONMENT 중 하나 이상이 'production'이면 프로덕션 환경
 */
function isProduction(): boolean {
  return (
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' || process.env.ENVIRONMENT === 'production'
  );
}

/**
 * 프로덕션 환경 Payverse 설정
 */
const PRODUCTION_CONFIG = {
  /** 상점 ID (프로덕션) */
  MID: '202511019M',
  /** 상점 이름 */
  MID_NAME: 'Fillman_USD',
  /** 클라이언트 키 (프로덕션) */
  CLIENT_KEY: 'u0a1miqi777y62m3',
  /** 시크릿 키 (프로덕션) */
  SECRET_KEY: 'tmerq00i777y62m3',
  /** 기본 통화 */
  CURRENCY: 'USD',
} as const;

/**
 * 개발 환경 Payverse 설정
 */
const DEVELOPMENT_CONFIG = {
  /** 상점 ID (개발) */
  MID: '202511003M',
  /** 상점 이름 */
  MID_NAME: 'Fillman_USD',
  /** 클라이언트 키 (개발) */
  CLIENT_KEY: 'tnzjj2xi709a8526',
  /** 시크릿 키 (개발) */
  SECRET_KEY: 'tmdh40gi709a8526',
  /** 기본 통화 */
  CURRENCY: 'USD',
} as const;

/**
 * Payverse 연동 정보 상수
 * 환경에 따라 개발/프로덕션 설정 분기
 */
export const PAYVERSE_CONFIG = isProduction() ? PRODUCTION_CONFIG : DEVELOPMENT_CONFIG;

/**
 * Payverse API 엔드포인트
 * 환경변수에 따라 개발/프로덕션 URL 분기
 */
export const PAYVERSE_API_ENDPOINTS = {
  cancel: isProduction()
    ? 'https://pay.payverseglobal.com/payment/cancel'
    : 'https://pay-snd.payverseglobal.com/payment/cancel',
} as const;
