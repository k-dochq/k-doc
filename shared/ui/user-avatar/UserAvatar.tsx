interface UserAvatarProps {
  size?: number;
  className?: string;
}

export function UserAvatar({ size = 24, className = '' }: UserAvatarProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z'
        fill='#F4A8FF'
      />
      <path
        d='M9 7.92612C9 9.64976 10.346 11.0524 12 11.0524C13.654 11.0524 15 9.64976 15 7.92612C15 6.20248 13.654 4.7998 12 4.7998C10.346 4.7998 9 6.20248 9 7.92612ZM17.3333 17.9998H18V17.3051C18 14.6241 15.906 12.4419 13.3333 12.4419H10.6667C8.09333 12.4419 6 14.6241 6 17.3051V17.9998H17.3333Z'
        fill='#F9D1FF'
      />
    </svg>
  );
}
