interface GradientBackgroundProps {
  children: React.ReactNode;
  gradientColors?: {
    start: string;
    end: string;
  };
  className?: string;
}

const DEFAULT_GRADIENT = {
  start: '#FFDBF9',
  end: '#BD9AFF',
};

export function GradientBackground({
  children,
  gradientColors = DEFAULT_GRADIENT,
  className = '',
}: GradientBackgroundProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(136deg, rgba(255, 255, 255, 0.00) 38.7%, rgba(255, 255, 255, 0.60) 49.07%, rgba(255, 255, 255, 0.70) 51.8%, rgba(255, 255, 255, 0.60) 55.74%, rgba(255, 255, 255, 0.00) 64.84%), linear-gradient(180deg, ${gradientColors.start} 0.19%, ${gradientColors.end} 99.82%)`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className={`relative isolate ${className}`}>
      {/* sticky 오버레이: 레이아웃 영향 0을 위해 음수 마진 트릭 */}
      <div
        aria-hidden
        className='rounded-inherit pointer-events-none sticky top-0 z-0 -mb-[100vh] h-screen supports-[height:100dvh]:-mb-[100dvh] supports-[height:100dvh]:h-[100dvh]'
        style={gradientStyle}
      />
      {/* 실제 콘텐츠 */}
      <div className='relative z-10 min-h-screen'>{children}</div>
    </div>
  );
}
