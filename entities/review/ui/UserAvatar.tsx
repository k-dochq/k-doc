'use client';

interface UserAvatarProps {
  className?: string;
}

export function UserAvatar({ className = '' }: UserAvatarProps) {
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
        d='M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z'
        fill='#F9D1FF'
      />
      <path
        d='M7.5 6.60526C7.5 8.04163 8.62167 9.21053 10 9.21053C11.3783 9.21053 12.5 8.04163 12.5 6.60526C12.5 5.16889 11.3783 4 10 4C8.62167 4 7.5 5.16889 7.5 6.60526ZM14.4444 15H15V14.4211C15 12.1869 13.255 10.3684 11.1111 10.3684H8.88889C6.74444 10.3684 5 12.1869 5 14.4211V15H14.4444Z'
        fill='#F4A8FF'
      />
    </svg>
  );
}
