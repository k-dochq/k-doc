export function HotRibbonV2() {
  return (
    <div className='absolute top-[-5px] left-[-5px] z-10 overflow-clip'>
      <svg
        width='46'
        height='34'
        viewBox='0 0 46 34'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_382_25723)'>
          <path
            d='M0 26C0 27.8286 2.24286 29.3071 5 29.3071V10.9643L0 12.3429V26Z'
            fill='url(#paint0_linear_382_25723)'
          />
          <path
            style={{ mixBlendMode: 'multiply' }}
            d='M4.9851 8C2.24224 8 0.0136719 13.8 0.0136719 20.9643C0.0136719 28.1286 2.24224 33.9286 4.9851 33.9286V8Z'
            fill='url(#paint1_radial_382_25723)'
          />
          <path
            d='M39.5503 0H5.04446C2.2628 0 0 2.68752 0 4.9507V26C0 23.7368 2.2628 21.9068 5.04446 21.9068H39.5503L46 10.9534L39.5503 0Z'
            fill='url(#paint2_linear_382_25723)'
          />
          <g filter='url(#filter0_d_382_25723)'>
            <path
              d='M9.41602 16V6.10156H11.1934V10.2988H15.8008V6.10156H17.5918V16H15.8008V11.7891H11.1934V16H9.41602ZM28.2559 11.0508C28.2559 14.25 26.3145 16.1367 23.7168 16.1367C21.1191 16.1367 19.1777 14.2363 19.1777 11.0508C19.1777 7.85156 21.1191 5.96484 23.7168 5.96484C26.3145 5.96484 28.2559 7.85156 28.2559 11.0508ZM26.4648 11.0508C26.4648 8.79492 25.3301 7.56445 23.7168 7.56445C22.1035 7.56445 20.9688 8.79492 20.9688 11.0508C20.9688 13.3066 22.1035 14.5371 23.7168 14.5371C25.3301 14.5371 26.4648 13.3066 26.4648 11.0508ZM28.9668 7.5918V6.10156H36.8555V7.5918H33.8066V16H32.0293V7.5918H28.9668Z'
              fill='white'
            />
          </g>
        </g>
        <defs>
          <filter
            id='filter0_d_382_25723'
            x='6.41602'
            y='2.96484'
            width='33.4395'
            height='16.1719'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='1.5' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.279729 0 0 0 0 0.0750227 0 0 0 0 0.0796751 0 0 0 0.8 0'
            />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_382_25723' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_382_25723'
              result='shape'
            />
          </filter>
          <linearGradient
            id='paint0_linear_382_25723'
            x1='0'
            y1='20.1326'
            x2='5'
            y2='20.1326'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset='0.245192' stopColor='#09807E' />
            <stop offset='1' stopColor='#35FFFC' />
          </linearGradient>
          <radialGradient
            id='paint1_radial_382_25723'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(4.42596 20.2286) scale(4.55314 12.6137)'
          >
            <stop stopColor='#131313' />
            <stop offset='0.15' stopColor='#505050' />
            <stop offset='0.3' stopColor='#858585' />
            <stop offset='0.45' stopColor='#B1B1B1' />
            <stop offset='0.58' stopColor='#D3D3D3' />
            <stop offset='0.71' stopColor='#EBEBEB' />
            <stop offset='0.83' stopColor='#F9F9F9' />
            <stop offset='0.94' stopColor='white' />
          </radialGradient>
          <linearGradient
            id='paint2_linear_382_25723'
            x1='0'
            y1='12.9956'
            x2='47'
            y2='12.9956'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#10C2C0' />
            <stop offset='0.245433' stopColor='#0FE5E1' />
            <stop offset='1' stopColor='#0FE5E1' />
          </linearGradient>
          <clipPath id='clip0_382_25723'>
            <rect width='46' height='34' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
