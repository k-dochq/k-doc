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
  ref: React.RefObject<HTMLElement | null>;
}

/**
 * 뷰포트(보이는 구간)를 100%로 하여 각 메시지에 그라데이션 적용
 * 메시지가 화면 상단에 있으면 첫 번째 색상, 하단에 있으면 마지막 색상
 */
export function useViewportGradient({
  colors,
  scrollContainer,
}: UseViewportGradientOptions): ViewportGradientResult {
  const elementRef = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<{ gradient: string; position: number }>({
    gradient: '',
    position: 0,
  });

  const rafRef = useRef<number | undefined>(undefined);

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

  // 뷰포트 위치에 따른 단색 생성 함수
  const generateGradient = useCallback(
    (progress: number): string => {
      if (colors.length < 2) return '';

      // 뷰포트 위치(progress)에 따라 해당하는 색상 계산
      const scaledProgress = progress * (colors.length - 1);
      const colorIndex = Math.floor(scaledProgress);
      const colorFactor = scaledProgress - colorIndex;

      // 마지막 색상인 경우
      if (colorIndex >= colors.length - 1) {
        const [r, g, b] = colors[colors.length - 1];
        return `rgb(${r}, ${g}, ${b})`;
      }

      // 두 색상 사이 부드러운 보간
      const color1 = colors[colorIndex];
      const color2 = colors[colorIndex + 1];
      
      // 더 부드러운 7차 함수로 완전히 자연스러운 전환
      const t = colorFactor;
      const smoothFactor = t * t * t * t * (t * (t * (t * -20 + 70) - 84) + 35);
      
      const interpolatedColor = interpolateColor(color1, color2, smoothFactor);

      const [r, g, b] = interpolatedColor;
      return `rgb(${r}, ${g}, ${b})`;
    },
    [colors, interpolateColor]
  );

  // 메시지의 전체 채팅 영역 내 위치 계산
  const calculateViewportPosition = useCallback((): number => {
    if (!elementRef.current) return 0;

    const element = elementRef.current;
    const container = scrollContainer || window;
    
    let viewportTop: number;
    let viewportHeight: number;
    
    // GNB 높이와 입력창 높이를 제외한 실제 채팅 영역 계산
    const GNB_HEIGHT = 64; // GNB 높이 (px)
    const INPUT_AREA_HEIGHT = 160; // 입력창 영역 높이 (px)
    
    if (container === window) {
      viewportTop = GNB_HEIGHT;
      viewportHeight = window.innerHeight - GNB_HEIGHT - INPUT_AREA_HEIGHT;
    } else {
      const containerRect = (container as HTMLElement).getBoundingClientRect();
      // 컨테이너가 있는 경우, 컨테이너의 위치를 기준으로 조정
      viewportTop = containerRect.top;
      viewportHeight = (container as HTMLElement).clientHeight;
    }

    const elementRect = element.getBoundingClientRect();
    
    // 요소의 중앙점 기준으로 계산
    const elementCenter = elementRect.top + elementRect.height / 2;
    
    // GNB와 입력창을 제외한 실제 채팅 영역 기준으로 위치 계산
    // 0 = 채팅 영역 상단, 1 = 채팅 영역 하단
    let relativePosition = (elementCenter - viewportTop) / viewportHeight;
    
    // 0-1 범위로 완전한 뷰포트 사용
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

    // Intersection Observer 설정 (매우 세밀한 업데이트)
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
        rootMargin: '150px', // 더 넓은 범위에서 관찰
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), // 0.05 간격으로 세밀하게 관찰
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
    [174, 51, 251], // #ae33fb - 보라 (0%)
    [182, 55, 249], // 보라 12.5%
    [191, 59, 247], // 보라-핑크 25%
    [199, 63, 244], // 보라-핑크 37.5%
    [207, 67, 242], // 핑크 50% (중간)
    [191, 68, 243], // 핑크-파랑 62.5%
    [175, 69, 243], // 핑크-파랑 75%
    [138, 69, 246], // 파랑 87.5%
    [101, 68, 250], // #6544fa - 파랑 (100%)
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