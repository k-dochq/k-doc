interface NoticeBackgroundProps {
  className?: string;
  opacity?: number;
}

export function NoticeBackground({
  className = 'pointer-events-none absolute -top-10 -left-9 z-0 h-[123px] w-[154px] animate-float',
  opacity = 1,
}: NoticeBackgroundProps) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: 'url(/images/main/notice.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'transparent', // iOS Safari 검정색 박스 방지
        opacity,
        // iOS Safari 렌더링 이슈 해결을 위한 추가 속성
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
      }}
    />
  );
}
