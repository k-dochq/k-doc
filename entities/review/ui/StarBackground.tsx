interface StarBackgroundProps {
  className?: string;
}

export function StarBackground({
  className = 'pointer-events-none absolute -top-8 -left-0 z-0 h-[154px] w-[132px] animate-float',
}: StarBackgroundProps) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: 'url(/images/review/star.svg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.7,
      }}
    />
  );
}
