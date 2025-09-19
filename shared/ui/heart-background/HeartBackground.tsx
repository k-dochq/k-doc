interface HeartBackgroundProps {
  className?: string;
  opacity?: number;
}

export function HeartBackground({
  className = 'pointer-events-none absolute -top-10 -right-4 z-0 h-[123px] w-[154px] animate-float',
  opacity = 1,
}: HeartBackgroundProps) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: 'url(/images/main/heart.svg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity,
      }}
    />
  );
}
