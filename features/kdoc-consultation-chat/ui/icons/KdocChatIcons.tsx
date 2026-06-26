export function BackArrowIcon() {
  return (
    <svg width='9' height='16' viewBox='0 0 8.5 15.5' fill='none'>
      <path
        d='M7.75 0.75L0.75 7.75L7.75 14.75'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function HamburgerIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M3.00037 5H21.0004M2.99805 12H20.998M3.00037 19H21.0004'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width='14' height='14' viewBox='0 0 13.5 13.5' fill='none'>
      <path
        d='M6.75 6.75L0.75 0.75M6.75 6.75L12.75 12.75M6.75 6.75L12.75 0.75M6.75 6.75L0.75 12.75'
        stroke='#737373'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function KdocMsgAvatar() {
  return (
    <div className='h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[#e5e5e5] bg-[#001872]'>
      <img src='/kdoc-avatar.png' alt='K-DOC' className='h-full w-full object-cover' />
    </div>
  );
}

export function PaperclipIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M13.061 18.7176C13.061 18.7176 18.7178 13.0608 20.132 11.6465C21.5462 10.2323 22.2533 6.69676 19.7785 4.22191C17.3036 1.74704 13.7681 2.45414 12.3538 3.86836C10.9396 5.28256 3.51499 12.7072 2.80788 13.4143C2.10078 14.1214 1.04012 16.5963 3.16144 18.7176C5.28275 20.8389 7.75765 19.7783 8.46475 19.0712C9.17185 18.3641 16.95 10.5859 17.6571 9.87876C18.3643 9.17166 18.7178 7.40391 17.6571 6.34321C16.5965 5.28256 14.8287 5.63611 14.1216 6.34321C13.4145 7.05036 7.4041 13.0608 7.4041 13.0608'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg width='30' height='30' viewBox='0 0 30 30' fill='none'>
      <path
        d='M20.175 3.699L8.888 7.449C1.3 9.986 1.3 14.124 8.888 16.649L12.238 17.761L13.35 21.111C15.875 28.699 20.025 28.699 22.55 21.111L26.313 9.836C27.988 4.774 25.238 2.011 20.175 3.699ZM20.575 10.424L15.825 15.199C15.638 15.386 15.4 15.474 15.163 15.474C14.925 15.474 14.688 15.386 14.5 15.199C14.326 15.022 14.228 14.784 14.228 14.536C14.228 14.288 14.326 14.05 14.5 13.874L19.25 9.099C19.613 8.736 20.213 8.736 20.575 9.099C20.938 9.461 20.938 10.061 20.575 10.424Z'
        fill='url(#send-grad)'
      />
      <defs>
        <linearGradient id='send-grad' x1='3.197' y1='15.003' x2='26.804' y2='15.003' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
      </defs>
    </svg>
  );
}
