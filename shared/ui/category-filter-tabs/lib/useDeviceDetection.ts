'use client';

import { useState, useEffect } from 'react';

export function useDeviceDetection() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // PC 환경 감지: 화면 너비가 1024px 이상이고 터치 디바이스가 아닌 경우
      const hasLargeScreen = window.innerWidth >= 1024;
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

      setIsDesktop(hasLargeScreen && !hasCoarsePointer);
    };

    checkDevice();

    // 화면 크기 변경 감지
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  return { isDesktop };
}
