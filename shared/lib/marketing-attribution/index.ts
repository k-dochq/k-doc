/**
 * 마케팅 어트리뷰션 관련 유틸리티 및 타입
 */

// 타입 export
export type { MarketingAttribution } from './types';

// LocalStorage 유틸리티 export
export { getFirstTouch, hasFirstTouchSaved, saveFirstTouch, clearFirstTouch } from './localStorage';

// UTM 파라미터 파싱 유틸리티 export
export {
  parseUTMParams,
  getReferrer,
  getLandingUrl,
  createMarketingAttribution,
} from './parse-utm';
