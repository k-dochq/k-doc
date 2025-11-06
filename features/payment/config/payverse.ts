/**
 * Payverse 연동 정보 상수
 * TODO: 향후 환경 변수로 이동 고려
 */
export const PAYVERSE_CONFIG = {
  /** 상점 ID */
  MID: '202511003M',
  /** 상점 이름 */
  MID_NAME: 'Fillman_USD',
  /** 클라이언트 키 */
  CLIENT_KEY: 'tnzjj2xi709a8526',
  /** 시크릿 키 */
  SECRET_KEY: 'tmdh40gi709a8526',
  /** 기본 통화 */
  CURRENCY: 'USD',
} as const;
