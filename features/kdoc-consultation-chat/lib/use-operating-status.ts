'use client';

import { useEffect, useState } from 'react';
import { checkBusinessHoursInKorea, getNextOpenInKorea } from 'shared/lib/business-hours';

export interface OperatingStatus {
  /** 현재 운영시간(한국 평일 09:00~18:00, 공휴일 제외) 내인지 */
  isOpen: boolean;
  /** 운영시간 외일 때 다음 운영 개시 시각(09:00 KST). 운영 중이면 null */
  nextOpen: Date | null;
}

/**
 * GNB 운영상태 표시용 훅.
 * 서버/클라이언트 시각 차이로 인한 hydration 불일치를 피하기 위해
 * 마운트 이후 클라이언트에서만 계산하며, 1분마다 갱신해 운영시간 경계를 반영한다.
 * 계산 전(SSR/첫 페인트)에는 null을 반환한다.
 */
export function useOperatingStatus(): OperatingStatus | null {
  const [status, setStatus] = useState<OperatingStatus | null>(null);

  useEffect(() => {
    const compute = () => {
      const { isBusinessHours } = checkBusinessHoursInKorea();
      setStatus({
        isOpen: isBusinessHours,
        nextOpen: isBusinessHours ? null : getNextOpenInKorea(),
      });
    };

    compute();
    const intervalId = setInterval(compute, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return status;
}
