interface StarBackgroundProps {
  className?: string;
}

export function StarBackground({
  className = 'pointer-events-none absolute -top-66 -left-0 z-[-10] h-[154px] w-[132px] animate-float',
}: StarBackgroundProps) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: 'url(/images/review/star.svg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'transparent', // iOS Safari 검정색 박스 방지
        opacity: 0.7,
        // iOS Safari 렌더링 이슈 해결을 위한 추가 속성
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
      }}
    />
  );
}
