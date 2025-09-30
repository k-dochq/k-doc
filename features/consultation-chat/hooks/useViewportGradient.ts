'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface UseViewportGradientOptions {
  /**
   * 그라데이션 색상 배열 (최소 2개 이상)
   * 각 색상은 [r, g, b] 형태의 배열
   */
  colors: number[][];
  /**
   * 스크롤 컨테이너 (기본값: window)
   */
  scrollContainer?: HTMLElement | null;
}

interface ViewportGradientResult {
  /**
   * 현재 메시지의 뷰포트 위치 기반 그라데이션
   */
  gradient: string;
  /**
   * 메시지의 뷰포트 내 위치 (0-1)
   */
  position: number;
  /**
   * 요소 참조
   */
  ref: React.RefObject<HTMLElement>;
}

/**
 * 뷰포트(보이는 구간)를 100%로 하여 각 메시지에 그라데이션 적용
 * 메시지가 화면 상단에 있으면 첫 번째 색상, 하단에 있으면 마지막 색상
 */
export function useViewportGradient({
  colors,
  scrollContainer,
}: UseViewportGradientOptions): ViewportGradientResult {
  const elementRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<{ gradient: string; position: number }>({
    gradient: '',
    position: 0,
  });

  const rafRef = useRef<number>();

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

  // 메시지의 뷰포트 내 위치 계산
  const calculateViewportPosition = useCallback((): number => {
    if (!elementRef.current) return 0;

    const element = elementRef.current;
    const container = scrollContainer || window;
    
    let viewportTop: number;
    let viewportHeight: number;
    
    if (container === window) {
      viewportTop = 0;
      viewportHeight = window.innerHeight;
    } else {
      const containerRect = (container as HTMLElement).getBoundingClientRect();
      viewportTop = containerRect.top;
      viewportHeight = (container as HTMLElement).clientHeight;
    }

    const elementRect = element.getBoundingClientRect();
    
    // 요소의 중앙점 계산
    const elementCenter = elementRect.top + elementRect.height / 2;
    
    // 뷰포트 내에서의 상대적 위치 (0-1)
    // 0 = 뷰포트 상단, 1 = 뷰포트 하단
    const relativePosition = (elementCenter - viewportTop) / viewportHeight;
    
    // 0-1 범위로 제한
    return Math.max(0, Math.min(1, relativePosition));
  }, [scrollContainer]);

  // 그라데이션 업데이트
  const updateGradient = useCallback(() => {
    const position = calculateViewportPosition();
    const gradient = generateGradient(position);

    setState({
      gradient,
      position,
    });
  }, [calculateViewportPosition, generateGradient]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(updateGradient);
  }, [updateGradient]);

  useEffect(() => {
    if (!elementRef.current) return;

    const container = scrollContainer || window;

    // 초기 그라데이션 설정
    updateGradient();

    // Intersection Observer 설정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateGradient();
          }
        });
      },
      {
        root: scrollContainer,
        rootMargin: '50px',
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );

    observer.observe(elementRef.current);

    // 스크롤 이벤트 리스너
    container.addEventListener('scroll', handleScroll, { passive: true });

    // 리사이즈 이벤트
    const handleResize = () => {
      updateGradient();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, updateGradient, scrollContainer]);

  return {
    gradient: state.gradient,
    position: state.position,
    ref: elementRef,
  };
}

/**
 * 뷰포트 그라데이션 색상 프리셋
 */
export const VIEWPORT_GRADIENT_COLORS = {
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
