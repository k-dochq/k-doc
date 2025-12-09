'use client';

import { FloatingStars } from '../floating-stars';

interface GradientBackgroundProps {
  children: React.ReactNode;
  gradientColors?: {
    start: string;
    end: string;
  };
  className?: string;
  showStars?: boolean;
  starCount?: number;
}

const DEFAULT_GRADIENT = {
  start: '#FFDBF9',
  end: '#BD9AFF',
};

export function GradientBackground({
  children,
  gradientColors = DEFAULT_GRADIENT,
  className = '',
  showStars = false,
  starCount = 50,
}: GradientBackgroundProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(106deg, rgba(255, 255, 255, 0.00) 33.97%, rgba(255, 255, 255, 0.60) 49.19%, rgba(255, 255, 255, 0.70) 53.19%, rgba(255, 255, 255, 0.60) 58.97%, rgba(255, 255, 255, 0.00) 72.33%), linear-gradient(180deg, ${gradientColors.start} 0.19%, ${gradientColors.end} 99.82%)`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className={`relative isolate shadow-[0_0_8px_0_rgba(0,0,0,0.20)] ${className}`}>
      {/* sticky 오버레이: 레이아웃 영향 0을 위해 음수 마진 트릭 */}
      <div
        aria-hidden
        className='rounded-inherit pointer-events-none sticky top-0 z-0 -mb-[100vh] h-screen supports-[height:100dvh]:-mb-[100dvh] supports-[height:100dvh]:h-[100dvh]'
        style={gradientStyle}
      />

      {/* 별 애니메이션 */}
      {showStars && <FloatingStars starCount={starCount} gradientColors={gradientColors} />}

      {/* 실제 콘텐츠 */}
      <div className='relative z-10 min-h-screen'>{children}</div>
    </div>
  );
}
