interface CrownBackgroundProps {
  className?: string;
  opacity?: number;
}

export function CrownBackground({
  className = 'pointer-events-none absolute -top-15 -left-4 z-0 h-[123px] w-[154px]',
  opacity = 1,
}: CrownBackgroundProps) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: 'url(/images/main/crown.svg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity,
      }}
    />
  );
}
