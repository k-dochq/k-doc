interface BodyIconProps {
  variant?: 'default' | 'small';
}

export function BodyIcon({ variant = 'default' }: BodyIconProps) {
  const scale = variant === 'small' ? 0.87 : 1;
  const width = 40 * scale;
  const height = 36 * scale;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 40 36'
      fill='none'
    >
      <g clipPath='url(#clip0_192_7316)'>
        <path
          d='M33.9649 15.1193C34.8895 19.2058 32.3093 23.2243 29.4021 23.8402C26.495 24.4561 24.3612 21.4345 23.4402 17.3446C22.5157 13.258 23.1555 9.64786 26.0591 9.03539C28.9662 8.41951 33.0404 11.0293 33.9614 15.1193H33.9649Z'
          fill='#DA47EF'
        />
        <path
          d='M13.1826 1.62787C13.1826 1.62787 4.09561 14.8198 11.3652 23.6156L12.7291 34.3721'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M31.8101 1.62787L29.7642 9.98471C29.7642 9.98471 35.8983 19.4406 29.7642 26.0349V34.3721'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M14.5221 14.9627C14.5221 18.4436 13.5343 21.2644 12.3145 21.2644C11.0947 21.2644 10.1069 18.4436 10.1069 14.9627C10.1069 11.4818 11.0947 8.66107 12.3145 8.66107C13.5343 8.66107 14.5221 11.4818 14.5221 14.9627Z'
          fill='#DA47EF'
        />
        <path
          d='M11.3652 22.9362V5.88361'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeDasharray='1 3'
        />
        <path
          d='M29.9819 27.3381C29.9819 27.3381 35.9087 23.7381 35.6767 17.3242C35.4376 10.6891 30.3856 8.57611 30.3856 8.57611'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeDasharray='1 3'
        />
        <path
          d='M33.8096 7.91062L38.4478 5.57397'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M37.583 8.1906L38.4478 5.57398L35.748 4.73694'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M0.907227 9.29767H7.51956'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M5.30615 11.4302L7.51999 9.29779L5.30615 7.16168'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M0.907227 21.931H7.51956'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M5.30615 24.0635L7.51999 21.9312L5.30615 19.795'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_192_7316'>
          <rect width='40' height='36' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
