interface KakaoIconProps {
  className?: string;
}

export function KakaoIcon({ className }: KakaoIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      className={className}
    >
      <path
        opacity='0.902'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 2C5.30517 2 1.5 4.96532 1.5 8.62128C1.5 10.895 2.97144 12.9006 5.21356 14.0924L4.27006 17.5665C4.18694 17.8734 4.5345 18.1179 4.80178 17.9398L8.93561 15.1886C9.28506 15.2227 9.63922 15.2426 10 15.2426C14.6939 15.2426 18.5 12.2782 18.5 8.62128C18.5 4.96532 14.6939 2 10 2Z'
        fill='#2F1C1C'
      />
    </svg>
  );
}
