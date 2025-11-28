'use client';

import { useEffect } from 'react';
import { hasFirstTouchSaved, saveFirstTouch } from 'shared/lib/marketing-attribution/localStorage';
import { createMarketingAttribution } from 'shared/lib/marketing-attribution/parse-utm';

/**
 * 마케팅 어트리뷰션 추적 컴포넌트
 *
 * 사용자가 사이트에 처음 방문할 때 UTM 파라미터, Referrer, Landing URL을
 * LocalStorage에 first_touch로 저장합니다.
 *
 * 저장 조건:
 * - LocalStorage에 first_touch_saved 플래그가 없는 경우에만 저장
 * - 이미 저장된 경우 재방문자로 인식하여 저장하지 않음
 */
export function MarketingAttributionTracker() {
  useEffect(() => {
    // 이미 저장된 경우 처리하지 않음
    if (hasFirstTouchSaved()) {
      return;
    }

    try {
      // MarketingAttribution 객체 생성
      const attribution = createMarketingAttribution();

      // LocalStorage에 저장
      const saved = saveFirstTouch(attribution);

      if (saved) {
        console.log('Marketing attribution saved:', attribution);
      }
    } catch (error) {
      // 에러 발생 시 조용히 실패 (회원가입 등 다른 기능에 영향 없도록)
      console.error('Failed to track marketing attribution:', error);
    }
  }, []); // 마운트 시 한 번만 실행

  // UI 렌더링 없음
  return null;
}
