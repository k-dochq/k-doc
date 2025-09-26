'use client';

import './floating-stars.css';

interface FloatingStarsProps {
  starCount?: number;
  gradientColors?: {
    start: string;
    end: string;
  };
}

export function FloatingStars({ starCount = 200, gradientColors }: FloatingStarsProps) {
  const starColor = getStarColor(gradientColors);

  return (
    <div
      className='star-container'
      aria-hidden='true'
      style={
        {
          '--star-color-primary': starColor.primary,
          '--star-color-secondary': starColor.secondary,
        } as React.CSSProperties
      }
    >
      {/* CSS로만 생성되는 별들 */}
      {Array.from({ length: starCount }, (_, i) => (
        <div
          key={i}
          className={`floating-star star-${(i % 10) + 1} ${Math.random() > 0.7 ? 'diamond' : ''}`}
          style={
            {
              '--star-index': i,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function getStarColor(gradientColors?: { start: string; end: string }) {
  let primary = 'rgba(255, 255, 255, 0.9)';
  let secondary = 'rgba(255, 219, 249, 0.7)';

  // 그라디언트 색상이 있으면 해당 색상과 조화롭게 설정
  if (gradientColors) {
    // 그라디언트 시작 색상에서 RGB 값 추출 (간단한 경우만 처리)
    if (gradientColors.start.startsWith('#')) {
      const hex = gradientColors.start.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      secondary = `rgba(${r}, ${g}, ${b}, 0.7)`;
    }
  }

  return { primary, secondary };
}
