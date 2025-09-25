'use client';

import { useCallback } from 'react';
import { type Dictionary } from 'shared/model/types';

/**
 * 주소 복사 기능을 위한 커스텀 훅
 */
export function useAddressCopy(dict?: Dictionary) {
  const copyAddress = useCallback(
    async (address: string) => {
      if (!address || address.includes('실패') || address.includes('찾을 수 없습니다')) {
        return;
      }

      try {
        await navigator.clipboard.writeText(address);

        // 다국어 알림 표시
        const successMessage = dict?.hospital?.address?.copySuccess || '주소가 복사되었습니다.';
        window.alert(successMessage);
      } catch (error) {
        console.error('주소 복사에 실패했습니다:', error);
      }
    },
    [dict],
  );

  return { copyAddress };
}
