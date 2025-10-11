'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface UseGlobalScrollGradientOptions {
  /**
   * 그라데이션 색상 배열 (최소 2개 이상)
   * 각 색상은 [r, g, b] 형태의 배열
   */
  colors: number[][];
  /**
   * 스크롤 컨테이너 (기본값: window)
   */
  scrollContainer?: HTMLElement | null;
  /**
   * 그라데이션 변화 속도 조절 (0-1, 기본값: 1.0)
   */
  intensity?: number;
}

interface GlobalScrollGradientState {
  /**
   * 현재 스크롤 위치 기반 그라데이션
   */
  gradient: string;
  /**
   * 전체 스크롤 진행률 (0-1)
   */
  scrollProgress: number;
}

/**
 * 전체 브라우저 높이를 기준으로 한 연속적인 그라데이션 효과를 위한 훅
 * 전체 스크롤 컨테이너의 높이를 100%로 하여 자연스럽게 이어지는 그라데이션 적용
 */
export function useGlobalScrollGradient({
  colors,
  scrollContainer,
  intensity = 1.0,
}: UseGlobalScrollGradientOptions): GlobalScrollGradientState {
  const [state, setState] = useState<GlobalScrollGradientState>({
    gradient: '',
    scrollProgress: 0,
  });

  const rafRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);

  // 색상 보간 함수
  const interpolateColor = useCallback(
    (color1: number[], color2: number[], factor: number): number[] => {
      return color1.map((c1, index) => {
        const c2 = color2[index];
        return Math.round(c1 + (c2 - c1) * factor);
      });
    },
    []
  );

  // 그라데이션 문자열 생성
  const generateGradient = useCallback(
    (progress: number): string => {
      if (colors.length < 2) return '';

      // 진행률에 따른 색상 인덱스 계산
      const scaledProgress = progress * (colors.length - 1);
      const colorIndex = Math.floor(scaledProgress);
      const colorFactor = scaledProgress - colorIndex;

      // 마지막 색상인 경우
      if (colorIndex >= colors.length - 1) {
        const [r, g, b] = colors[colors.length - 1];
        return `linear-gradient(180deg, rgb(${r}, ${g}, ${b}), rgb(${r}, ${g}, ${b}))`;
      }

      // 두 색상 사이 보간
      const color1 = colors[colorIndex];
      const color2 = colors[colorIndex + 1];
      const interpolatedColor = interpolateColor(color1, color2, colorFactor);

      const [r1, g1, b1] = color1;
      const [r2, g2, b2] = interpolatedColor;

      return `linear-gradient(180deg, rgb(${r1}, ${g1}, ${b1}), rgb(${r2}, ${g2}, ${b2}))`;
    },
    [colors, interpolateColor]
  );

  // 뷰포트(보이는 구간) 기준 스크롤 진행률 계산
  const calculateScrollProgress = useCallback((): number => {
    const container = scrollContainer || window;
    
    if (container === window) {
      // 윈도우인 경우: 전체 스크롤이 아닌 뷰포트 높이 기준
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      
      // 뷰포트 높이를 100%로 하여 진행률 계산
      return Math.min(Math.max((scrollTop % viewportHeight) / viewportHeight, 0), 1);
    } else {
      const element = container as HTMLElement;
      const scrollTop = element.scrollTop;
      const viewportHeight = element.clientHeight;
      
      // 뷰포트 높이를 100%로 하여 진행률 계산
      return Math.min(Math.max((scrollTop % viewportHeight) / viewportHeight, 0), 1);
    }
  }, [scrollContainer]);

  // 그라데이션 업데이트 (requestAnimationFrame으로 최적화)
  const updateGradient = useCallback(() => {
    const now = performance.now();
    
    // 16ms (60fps) 간격으로만 업데이트
    if (now - lastUpdateTimeRef.current < 16) {
      rafRef.current = requestAnimationFrame(updateGradient);
      return;
    }

    const progress = calculateScrollProgress() * intensity;
    const gradient = generateGradient(progress);

    setState({
      gradient,
      scrollProgress: progress,
    });

    // CSS Custom Property 업데이트 (GPU 가속)
    document.documentElement.style.setProperty('--global-scroll-gradient', gradient);
    document.documentElement.style.setProperty('--global-scroll-progress', progress.toString());

    lastUpdateTimeRef.current = now;
  }, [calculateScrollProgress, generateGradient, intensity]);

  // 스크롤 이벤트 핸들러 (디바운싱 적용)
  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(updateGradient);
  }, [updateGradient]);

  useEffect(() => {
    const container = scrollContainer || window;
    
    // 초기 그라데이션 설정
    updateGradient();

    // 스크롤 이벤트 리스너 등록
    container.addEventListener('scroll', handleScroll, { passive: true });

    // 리사이즈 이벤트도 감지 (높이 변경 시)
    const handleResize = () => {
      updateGradient();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      // CSS Custom Property 정리
      document.documentElement.style.removeProperty('--global-scroll-gradient');
      document.documentElement.style.removeProperty('--global-scroll-progress');
    };
  }, [handleScroll, updateGradient, scrollContainer]);

  return state;
}

/**
 * 전체 스크롤 그라데이션 색상 프리셋
 */
export const GLOBAL_GRADIENT_COLORS = {
  purple: [
    [174, 51, 251], // #ae33fb
    [218, 71, 239], // #da47ef
    [101, 68, 250], // #6544fa
  ],
  blue: [
    [64, 93, 230], // #405de6
    [88, 81, 219], // #5851db
    [131, 58, 180], // #833ab4
  ],
  sunset: [
    [255, 126, 95], // #ff7e5f
    [254, 180, 123], // #feb47b
    [255, 200, 124], // #ffc87c
  ],
  ocean: [
    [0, 119, 190], // #0077be
    [0, 180, 216], // #00b4d8
    [144, 224, 239], // #90e0ef
  ],
} as const;
