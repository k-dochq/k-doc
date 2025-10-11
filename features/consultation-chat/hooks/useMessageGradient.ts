'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface UseMessageGradientOptions {
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
   * 그라데이션 변화 속도 조절 (0-1, 기본값: 0.5)
   */
  intensity?: number;
  /**
   * 그라데이션 범위 (0-1, 기본값: 1.0)
   * 1.0이면 전체 화면 높이, 0.5면 화면 높이의 절반
   */
  range?: number;
}

interface MessageGradientState {
  /**
   * 현재 메시지의 Y축 위치 기반 그라데이션
   */
  gradient: string;
  /**
   * 메시지의 상대적 위치 (0-1)
   */
  position: number;
  /**
   * 요소 참조
   */
  ref: React.RefObject<HTMLElement>;
}

/**
 * Y축 기반 개별 메시지 그라데이션 효과를 위한 훅
 * 각 메시지의 화면 내 위치에 따라 개별적으로 그라데이션 적용
 */
export function useMessageGradient({
  colors,
  scrollContainer,
  intensity = 0.5,
  range = 1.0,
}: UseMessageGradientOptions): MessageGradientState {
  const elementRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<MessageGradientState>({
    gradient: '',
    position: 0,
  });

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

  // 메시지의 Y축 위치 기반 진행률 계산
  const calculatePositionProgress = useCallback((): number => {
    if (!elementRef.current) return 0;

    const element = elementRef.current;
    const container = scrollContainer || window;
    
    let containerRect: DOMRect;
    let containerHeight: number;
    
    if (container === window) {
      containerRect = {
        top: 0,
        bottom: window.innerHeight,
        left: 0,
        right: window.innerWidth,
        width: window.innerWidth,
        height: window.innerHeight,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      };
      containerHeight = window.innerHeight;
    } else {
      containerRect = (container as HTMLElement).getBoundingClientRect();
      containerHeight = (container as HTMLElement).clientHeight;
    }

    const elementRect = element.getBoundingClientRect();
    
    // 요소의 중앙점 계산
    const elementCenter = elementRect.top + elementRect.height / 2;
    
    // 컨테이너 내에서의 상대적 위치 계산
    const relativePosition = (elementCenter - containerRect.top) / containerHeight;
    
    // 범위 적용 (range가 1.0이면 전체 화면, 0.5면 화면 절반)
    const adjustedPosition = Math.max(0, Math.min(1, relativePosition / range));
    
    // intensity 적용
    return adjustedPosition * intensity;
  }, [scrollContainer, intensity, range]);

  // 그라데이션 업데이트
  const updateGradient = useCallback(() => {
    const progress = calculatePositionProgress();
    const gradient = generateGradient(progress);

    setState({
      gradient,
      position: progress,
    });
  }, [calculatePositionProgress, generateGradient]);

  // Intersection Observer를 사용한 성능 최적화
  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const container = scrollContainer || window;

    // 초기 그라데이션 설정
    updateGradient();

    // Intersection Observer 설정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 요소가 화면에 보일 때만 그라데이션 업데이트
            updateGradient();
          }
        });
      },
      {
        root: scrollContainer,
        rootMargin: '50px', // 50px 여유를 두고 미리 계산
        threshold: [0, 0.25, 0.5, 0.75, 1.0], // 여러 임계점에서 업데이트
      }
    );

    observer.observe(element);

    // 스크롤 이벤트 리스너 (Intersection Observer와 함께 사용)
    const handleScroll = () => {
      if (element.getBoundingClientRect().top < window.innerHeight + 100 && 
          element.getBoundingClientRect().bottom > -100) {
        updateGradient();
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.unobserve(element);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [updateGradient, scrollContainer]);

  return {
    gradient: state.gradient,
    position: state.position,
    ref: elementRef,
  };
}

/**
 * 인스타그램 스타일 그라데이션 색상 프리셋
 */
export const MESSAGE_GRADIENT_COLORS = {
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