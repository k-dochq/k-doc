'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseScrollGradientOptions {
  /**
   * 그라데이션 색상 배열 (최소 2개 이상)
   * 각 색상은 [r, g, b] 형태의 배열
   */
  colors: number[][];
  /**
   * 스크롤 감지 영역 (기본값: window)
   */
  scrollContainer?: HTMLElement | null;
  /**
   * 그라데이션 변화 속도 조절 (0-1, 기본값: 0.5)
   */
  intensity?: number;
}

interface ScrollGradientState {
  /**
   * 현재 스크롤 위치 (0-1)
   */
  scrollProgress: number;
  /**
   * 현재 적용된 그라데이션 색상
   */
  currentGradient: string;
}

/**
 * 스크롤 기반 그라데이션 효과를 위한 훅
 * Intersection Observer와 CSS Custom Properties를 활용하여 성능 최적화
 */
export function useScrollGradient({
  colors,
  scrollContainer,
  intensity = 0.5,
}: UseScrollGradientOptions): ScrollGradientState {
  const stateRef = useRef<ScrollGradientState>({
    scrollProgress: 0,
    currentGradient: '',
  });

  const rafRef = useRef<number>();
  const lastScrollTimeRef = useRef<number>(0);

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

  // 스크롤 진행률 계산
  const calculateScrollProgress = useCallback((): number => {
    const container = scrollContainer || window;
    
    if (container === window) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      return scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
    } else {
      const element = container as HTMLElement;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      return scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
    }
  }, [scrollContainer]);

  // 그라데이션 업데이트 (requestAnimationFrame으로 최적화)
  const updateGradient = useCallback(() => {
    const now = performance.now();
    
    // 16ms (60fps) 간격으로만 업데이트
    if (now - lastScrollTimeRef.current < 16) {
      rafRef.current = requestAnimationFrame(updateGradient);
      return;
    }

    const progress = calculateScrollProgress();
    const gradient = generateGradient(progress * intensity);

    // 상태 업데이트
    stateRef.current = {
      scrollProgress: progress,
      currentGradient: gradient,
    };

    // CSS Custom Property 업데이트 (GPU 가속)
    document.documentElement.style.setProperty('--scroll-gradient', gradient);
    document.documentElement.style.setProperty('--scroll-progress', progress.toString());

    lastScrollTimeRef.current = now;
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

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      // CSS Custom Property 정리
      document.documentElement.style.removeProperty('--scroll-gradient');
      document.documentElement.style.removeProperty('--scroll-progress');
    };
  }, [handleScroll, updateGradient, scrollContainer]);

  return stateRef.current;
}

/**
 * 인스타그램 스타일 그라데이션 색상 프리셋
 */
export const INSTAGRAM_GRADIENT_COLORS = {
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
} as const;
