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

export function KdocHeaderIcon() {
  return (
    <div className='relative h-10 w-10 shrink-0'>
      {/* K_purple */}
      <svg className='absolute left-0 top-[3px]' width='24' height='24' viewBox='0 0 24 24' fill='none'>
        <path
          d='M0 12C0 5.373 5.373 0 12 0C18.627 0 24 5.373 24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12Z'
          fill='#D9D9FF'
        />
        <path
          d='M7.333 17.335V6.668H10.066V10.881L13.254 6.668H16.161L12.827 10.801L16.667 17.247H13.759L11.227 13.007L10.066 14.378V17.335H7.333Z'
          fill='#7657FF'
        />
      </svg>
      {/* K_pink */}
      <svg className='absolute left-[15px] top-[13px]' width='24' height='24' viewBox='0 0 26 26' fill='none'>
        <path
          d='M13 0.5C19.904 0.5 25.5 6.096 25.5 13C25.5 19.904 19.904 25.5 13 25.5C6.096 25.5 0.5 19.904 0.5 13C0.5 6.096 6.096 0.5 13 0.5Z'
          fill='#FCDEFF'
          stroke='white'
        />
        <path
          d='M8.333 18.335V7.668H11.066V11.881L14.254 7.668H17.161L13.827 11.881L17.667 18.247H14.759L12.227 14.007L11.066 15.378V18.335H8.333Z'
          fill='#F15BFF'
        />
      </svg>
    </div>
  );
}

export function KdocMsgAvatar() {
  return (
    <div className='h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[#e5e5e5] bg-[#001872]'>
      <img src='/kdoc-avatar.png' alt='K-DOC' className='h-full w-full object-cover' />
    </div>
  );
}

export function CameraIcon() {
  return (
    <svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
      <path
        d='M14 11.668C12.103 11.668 10.5 13.271 10.5 15.168C10.5 17.065 12.103 18.668 14 18.668C15.897 18.668 17.5 17.065 17.5 15.168C17.5 13.271 15.897 11.668 14 11.668Z'
        fill='#A3A3A3'
      />
      <path
        d='M23.338 7H20.321L17.163 3.842C16.944 3.623 16.647 3.5 16.338 3.5H11.671C11.362 3.5 11.065 3.623 10.846 3.842L7.688 7H4.671C3.384 7 2.338 8.047 2.338 9.333V22.167C2.338 23.454 3.384 24.5 4.671 24.5H23.338C24.625 24.5 25.671 23.454 25.671 22.167V9.333C25.671 8.047 24.625 7 23.338 7ZM14.005 21C10.843 21 8.171 18.328 8.171 15.167C8.171 12.005 10.843 9.333 14.005 9.333C17.166 9.333 19.838 12.005 19.838 15.167C19.838 18.328 17.166 21 14.005 21Z'
        fill='#A3A3A3'
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
