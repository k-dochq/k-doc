'use client';

import { useCallback } from 'react';

/**
 * 주소 복사 기능을 위한 커스텀 훅
 */
export function useAddressCopy() {
  const copyAddress = useCallback(async (address: string) => {
    if (!address || address.includes('실패') || address.includes('찾을 수 없습니다')) {
      return;
    }

    try {
      await navigator.clipboard.writeText(address);
      // TODO: 토스트 메시지 표시 (현재는 콘솔 로그로 대체)
      console.log('주소가 복사되었습니다.');
    } catch (error) {
      console.error('주소 복사에 실패했습니다:', error);
    }
  }, []);

  return { copyAddress };
}
