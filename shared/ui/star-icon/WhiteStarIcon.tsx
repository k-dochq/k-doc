interface WhiteStarIconProps {
  size?: number;
}

export function WhiteStarIcon({ size = 24 }: WhiteStarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.9998 3L14.4357 8.97052L20.8727 9.44733L15.9387 13.6143L17.4831 19.875L11.9998 16.4751L6.51646 19.875L8.06092 13.6143L3.12695 9.44733L9.56391 8.97052L11.9998 3Z'
        fill='white'
      />
      <path
        d='M11.9998 3L9.56391 8.97052L3.12695 9.44733L8.06092 13.6143L6.51646 19.875L11.9998 16.4751M11.9998 3L14.4357 8.97052L20.8727 9.44733L15.9387 13.6143L17.4831 19.875L11.9998 16.4751'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
