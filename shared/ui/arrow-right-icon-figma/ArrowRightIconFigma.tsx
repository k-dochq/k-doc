/**
 * Figma MCP에서 가져온 오른쪽 화살표 아이콘 SVG 컴포넌트
 * 원본 SVG URL: https://www.figma.com/api/mcp/asset/1a4fcbf2-b49f-4d08-9bd8-f408bf67103c
 */
interface ArrowRightIconFigmaProps {
  className?: string;
  size?: number;
  color?: string;
}

export function ArrowRightIconFigma({
  className = '',
  size = 7,
  color = '#737373',
}: ArrowRightIconFigmaProps) {
  // 비율에 맞게 height 계산 (7:12)
  const height = (size * 12) / 7;

  return (
    <svg
      className={className}
      width={size}
      height={height}
      viewBox='0 0 7 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='none'
      style={{ display: 'block', overflow: 'visible' }}
    >
      <path
        id='Vector'
        d='M1 1L5.66667 5.66667L1 10.3333'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
