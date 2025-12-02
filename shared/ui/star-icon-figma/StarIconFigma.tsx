/**
 * Figma MCP에서 가져온 별 아이콘 SVG 컴포넌트
 * 원본 SVG URL: https://www.figma.com/api/mcp/asset/e268e0fc-6645-4ea7-ab9a-9a9494289dab
 */
interface StarIconFigmaProps {
  className?: string;
  size?: number;
  color?: string;
}

export function StarIconFigma({
  className = '',
  size = 16,
  color = '#FFC31D',
}: StarIconFigmaProps) {
  // 비율에 맞게 height 계산 (16:15)
  const height = (size * 15) / 16;

  return (
    <svg
      className={className}
      width={size}
      height={height}
      viewBox='0 0 16 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='none'
      style={{ display: 'block', overflow: 'visible' }}
    >
      <g id='Group 104'>
        <path
          id='Vector'
          d='M7.83538 1L9.71192 5.59951L14.6708 5.96683L10.8698 9.1769L12.0596 14L7.83538 11.3808L3.61118 14L4.80098 9.1769L1 5.96683L5.95884 5.59951L7.83538 1Z'
          fill={color}
        />
        <path
          id='Vector_2'
          d='M7.83538 1L5.95884 5.59951L1 5.96683L4.80098 9.1769L3.61118 14L7.83538 11.3808M7.83538 1L9.71192 5.59951L14.6708 5.96683L10.8698 9.1769L12.0596 14L7.83538 11.3808'
          stroke={color}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
}
