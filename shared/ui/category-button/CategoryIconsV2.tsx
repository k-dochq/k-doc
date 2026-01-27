// 추천 버튼 SVG 아이콘 (활성 상태)
export function RecommendedIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_4945)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_4945)'
          strokeWidth='2'
        />
        <mask
          id='mask0_466_4945'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='12'
          y='10'
          width='28'
          height='33'
        >
          <path d='M40 10H12V43H40V10Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_4945)'>
          <path
            d='M24.653 20.6941L21.6553 21.145L23.8282 23.2563L23.3069 26.2694L26.0001 24.846L28.6933 26.2694L28.172 23.2563L30.3449 21.145L27.3472 20.6941L26.0001 17.9656L24.653 20.6941Z'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M25.9999 30.2984C30.5327 30.2984 34.2068 26.7874 34.2068 22.4559C34.2068 18.1243 30.5327 14.6134 25.9999 14.6134C21.467 14.6134 17.793 18.1243 17.793 22.4559C17.793 26.7874 21.467 30.2984 25.9999 30.2984Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M34.9007 30.2983L39.0343 39.0371L34.9007 38.6378L31.9339 42.0775L28.4136 33.9889M23.586 33.9889L20.0667 42.0766L17.0999 38.7144L12.9653 39.1128L17.0999 30.2983'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M16.2243 29.5274C15.508 28.5407 16.2902 26.8098 15.9339 25.7083C15.5651 24.568 13.9282 23.6153 13.9312 22.4409C13.9341 21.2554 15.5798 20.3078 15.9468 19.1803C16.3102 18.0635 15.5345 16.3291 16.2406 15.3601C16.9227 14.424 18.8034 14.6202 19.792 13.9051C20.7805 13.19 21.1793 11.345 22.2827 10.9894C23.4251 10.6212 24.8348 11.897 26.0113 11.8998C27.199 11.9027 28.6135 10.6367 29.7431 11.0029C30.862 11.3658 31.2595 13.215 32.2304 13.9198C33.168 14.6007 35.0595 14.3974 35.7759 15.3842C36.4923 16.3709 35.71 18.1018 36.0663 19.2032C36.4351 20.3435 38.0719 21.2963 38.0691 22.4706C38.0662 23.6561 36.4205 24.6037 36.0535 25.7312C35.69 26.8481 36.4657 28.5824 35.7596 29.5514C35.0775 30.4875 33.1968 30.2913 32.2082 31.0064C31.2198 31.7215 30.821 33.5665 29.7175 33.9221C28.5751 34.2903 27.1654 33.0145 25.9889 33.0117C24.8012 33.0088 23.3867 34.2749 22.2571 33.9085C21.1382 33.5458 20.7408 31.6965 19.7699 30.9917C18.8322 30.3108 16.9407 30.5141 16.2243 29.5274Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeMiterlimit='10'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_4945'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_4945'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 추천 버튼 SVG 아이콘 (비활성 상태)
export function RecommendedIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7225)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <mask
          id='mask0_466_7225'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='11'
          y='9'
          width='28'
          height='33'
        >
          <path d='M39 9H11V42H39V9Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_7225)'>
          <path
            d='M23.653 19.694L20.6553 20.145L22.8282 22.2562L22.3069 25.2694L25.0001 23.846L27.6933 25.2694L27.172 22.2562L29.3449 20.145L26.3472 19.694L25.0001 16.9656L23.653 19.694Z'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M24.9999 29.2983C29.5327 29.2983 33.2068 25.7873 33.2068 21.4558C33.2068 17.1242 29.5327 13.6133 24.9999 13.6133C20.467 13.6133 16.793 17.1242 16.793 21.4558C16.793 25.7873 20.467 29.2983 24.9999 29.2983Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M33.9007 29.2983L38.0343 38.0371L33.9007 37.6378L30.9339 41.0775L27.4136 32.9889M22.586 32.9889L19.0667 41.0766L16.0999 37.7144L11.9653 38.1128L16.0999 29.2983'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M15.2243 28.5273C14.508 27.5406 15.2902 25.8097 14.9339 24.7083C14.5651 23.5679 12.9282 22.6152 12.9312 21.4409C12.9341 20.2554 14.5798 19.3077 14.9468 18.1803C15.3102 17.0634 14.5345 15.329 15.2406 14.36C15.9227 13.424 17.8034 13.6201 18.792 12.905C19.7805 12.1899 20.1793 10.3449 21.2827 9.98932C22.4251 9.62114 23.8348 10.8969 25.0113 10.8997C26.199 10.9027 27.6135 9.63664 28.7431 10.0029C29.862 10.3657 30.2595 12.2149 31.2304 12.9198C32.168 13.6006 34.0595 13.3974 34.7759 14.3841C35.4923 15.3708 34.71 17.1017 35.0663 18.2032C35.4351 19.3435 37.0719 20.2962 37.0691 21.4705C37.0662 22.6561 35.4205 23.6036 35.0535 24.7312C34.69 25.848 35.4657 27.5823 34.7596 28.5514C34.0775 29.4874 32.1968 29.2912 31.2082 30.0063C30.2198 30.7214 29.821 32.5665 28.7175 32.9221C27.5751 33.2902 26.1654 32.0145 24.9889 32.0116C23.8012 32.0087 22.3867 33.2748 21.2571 32.9085C20.1382 32.5457 19.7408 30.6964 18.7699 29.9916C17.8322 29.3108 15.9407 29.514 15.2243 28.5273Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeMiterlimit='10'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_466_7225'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 눈 버튼 SVG 아이콘 (비활성 상태)
export function EyesIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_5350)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <mask
          id='mask0_466_5350'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='9'
          y='14'
          width='34'
          height='22'
        >
          <path d='M42.4998 14.1666H9.1665V35.8333H42.4998V14.1666Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_5350)'>
          <path
            d='M23.3516 19.1696C17.6 19.1696 12.5669 22.3178 9.80811 27.0221C12.5669 31.7264 17.6 34.8746 23.3516 34.8746C29.1033 34.8746 34.1364 31.7264 36.8952 27.0221C34.1364 22.3178 29.1033 19.1696 23.3516 19.1696Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M23.3518 34.2969C27.2777 34.2969 30.4604 31.0399 30.4604 27.0222C30.4604 23.0045 27.2777 19.7474 23.3518 19.7474C19.4258 19.7474 16.2432 23.0045 16.2432 27.0222C16.2432 31.0399 19.4258 34.2969 23.3518 34.2969Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M23.3516 22.6362C22.8063 22.6362 22.2866 22.7446 21.8054 22.935C22.2898 23.2567 22.6106 23.818 22.6106 24.4516C22.6106 25.4529 21.8183 26.2638 20.8399 26.2638C20.2175 26.2638 19.6722 25.9355 19.3578 25.4398C19.1718 25.9322 19.0659 26.464 19.0659 27.0221C19.0659 29.4448 20.9842 31.4079 23.3516 31.4079C25.719 31.4079 27.6373 29.4448 27.6373 27.0221C27.6373 24.5994 25.719 22.6362 23.3516 22.6362Z'
            fill='#404040'
          />
          <path
            d='M10.1289 20.108C10.1289 20.108 24.1343 6.69111 40.1736 22.6128'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M36.4058 23.0297L40.6687 22.7623L40.4075 18.3997'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_466_5350'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 눈 버튼 SVG 아이콘 (활성 상태)
export function EyesIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7530)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_7530)'
          strokeWidth='2'
        />
        <mask
          id='mask0_466_7530'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='10'
          y='15'
          width='34'
          height='22'
        >
          <path d='M43.4998 15.1666H10.1665V36.8333H43.4998V15.1666Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_7530)'>
          <path
            d='M24.3516 20.1696C18.6 20.1696 13.5669 23.3178 10.8081 28.0221C13.5669 32.7264 18.6 35.8746 24.3516 35.8746C30.1033 35.8746 35.1364 32.7264 37.8952 28.0221C35.1364 23.3178 30.1033 20.1696 24.3516 20.1696Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M24.3518 35.2969C28.2777 35.2969 31.4604 32.0399 31.4604 28.0222C31.4604 24.0045 28.2777 20.7474 24.3518 20.7474C20.4258 20.7474 17.2432 24.0045 17.2432 28.0222C17.2432 32.0399 20.4258 35.2969 24.3518 35.2969Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M24.3516 23.6362C23.8063 23.6362 23.2866 23.7446 22.8054 23.935C23.2898 24.2567 23.6106 24.818 23.6106 25.4516C23.6106 26.4529 22.8183 27.2638 21.8399 27.2638C21.2175 27.2638 20.6722 26.9355 20.3578 26.4398C20.1718 26.9322 20.0659 27.464 20.0659 28.0221C20.0659 30.4448 21.9842 32.4079 24.3516 32.4079C26.719 32.4079 28.6373 30.4448 28.6373 28.0221C28.6373 25.5994 26.719 23.6362 24.3516 23.6362Z'
            fill='#404040'
          />
          <path
            d='M11.1289 21.108C11.1289 21.108 25.1343 7.69105 41.1736 23.6128'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M37.4058 24.0297L41.6687 23.7623L41.4075 19.3997'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_7530'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_7530'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 코 버튼 SVG 아이콘 (비활성 상태)
export function NoseIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_5425)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <path
          d='M29.5897 9.0625C29.5897 9.0625 30.8029 10.6761 29.8609 13.4119C28.916 16.1478 22.5552 23.0147 22.5552 23.0147C19.2857 26.6177 17.542 28.1864 18.3333 29.9633C19.6165 32.8448 23.8676 34.2371 26.1512 34.592'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M24.6666 35.0167C24.6666 35.0167 24.9378 36.7001 23.9258 39.1539'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M25.4761 31.4761C25.4761 31.4761 28.0542 30.918 29.355 32.7682'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M33.6379 31.5073C33.6379 31.5073 33.705 34.3129 31.4126 35.7172'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.1682 35.1996C13.683 34.0882 11.6782 30.2906 12.6883 26.7183'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.86865 27.7461L13.0851 25.5626L15.2701 28.9211'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_466_5425'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 코 버튼 SVG 아이콘 (활성 상태)
export function NoseIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7467)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_7467)'
          strokeWidth='2'
        />
        <path
          d='M30.5897 10.0625C30.5897 10.0625 31.8029 11.6761 30.8609 14.4119C29.916 17.1478 23.5552 24.0147 23.5552 24.0147C20.2857 27.6177 18.542 29.1864 19.3333 30.9633C20.6165 33.8448 24.8676 35.2371 27.1512 35.592'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M25.6666 36.0167C25.6666 36.0167 25.9378 37.7001 24.9258 40.1539'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M26.4761 32.4761C26.4761 32.4761 29.0542 31.918 30.355 33.7682'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M34.6379 32.5073C34.6379 32.5073 34.705 35.3129 32.4126 36.7172'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M18.1682 36.1996C14.683 35.0882 12.6782 31.2906 13.6883 27.7183'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M10.8687 28.7461L14.0852 26.5626L16.2702 29.9211'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_7467'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_7467'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 리프팅 버튼 SVG 아이콘 (비활성 상태)
export function LiftingIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_5396)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <path
          d='M23.1757 41.5545V36.9891C23.1757 36.9891 18.5885 36.6454 14.9168 35.1636C11.245 33.6785 12.7372 28.1986 12.7372 28.1986L13.656 24.2038L12.0498 22.2615C11.2484 21.0067 12.5092 20.0923 12.5092 20.0923L16.6403 18.9509C20.6541 18.0365 17.7871 14.1552 22.1462 10.1604C22.1462 10.1604 24.2118 8.56183 26.9648 8.44836'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.8481 27.9751C12.8481 27.9751 15.4972 28.5424 17.3884 27.8783'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M19.9062 21.4307C19.9062 21.4307 21.3347 22.2049 23.2494 22.3284'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M21.7775 18.5773C21.7775 18.5773 21.7272 19.2414 21.4187 19.6485C21.1102 20.0557 20.6743 20.593 20.5469 21.2338'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M31.0996 25.7993C29.3929 29.8174 25.3959 32.6375 20.7383 32.6375'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M29.2656 25.212L31.9046 24.4611L32.659 27.0875'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M36.6626 28.4554C34.9558 32.4736 30.9588 35.2936 26.3013 35.2936'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M34.8281 27.8682L37.4671 27.1206L38.2182 29.7471'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_466_5396'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 리프팅 버튼 SVG 아이콘 (활성 상태)
export function LiftingIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7498)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_7498)'
          strokeWidth='2'
        />
        <path
          d='M24.1757 42.5545V37.9891C24.1757 37.9891 19.5885 37.6454 15.9168 36.1636C12.245 34.6785 13.7372 29.1986 13.7372 29.1986L14.656 25.2038L13.0498 23.2615C12.2484 22.0067 13.5092 21.0923 13.5092 21.0923L17.6403 19.9509C21.6541 19.0365 18.7871 15.1552 23.1462 11.1604C23.1462 11.1604 25.2118 9.56183 27.9648 9.44836'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M13.8481 28.9751C13.8481 28.9751 16.4972 29.5424 18.3884 28.8783'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M20.9062 22.4307C20.9062 22.4307 22.3347 23.2049 24.2494 23.3284'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M22.7775 19.5773C22.7775 19.5773 22.7272 20.2414 22.4187 20.6485C22.1102 21.0557 21.6743 21.593 21.5469 22.2338'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M32.0996 26.7993C30.3929 30.8174 26.3959 33.6375 21.7383 33.6375'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M30.2656 26.212L32.9046 25.4611L33.659 28.0875'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M37.6626 29.4554C35.9558 33.4736 31.9588 36.2936 27.3013 36.2936'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M35.8281 28.8682L38.4671 28.1206L39.2182 30.7471'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_7498'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_7498'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 안면윤곽 버튼 SVG 아이콘 (비활성 상태)
export function FacialContouringIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_5362)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <mask
          id='mask0_466_5362'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='4'
          y='8'
          width='42'
          height='34'
        >
          <path d='M45.4168 8.33337H4.5835V41.6667H45.4168V8.33337Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_5362)'>
          <path
            d='M36.5454 21.7959V32.8842C36.5454 37.0057 33.5104 40.6567 29.4822 40.6567H20.5188C16.4874 40.6567 13.4619 37.0025 13.4619 32.8842V21.7959C13.4587 15.2783 18.6238 9.99463 24.9989 9.99463H25.0021C31.3772 9.99463 36.5454 15.2783 36.5454 21.7959Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12.962 29.72C11.2806 29.72 9.9209 28.3266 9.9209 26.6109V24.9636C9.9209 23.2447 11.2838 21.8546 12.962 21.8546'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M37.0391 21.8546C38.7204 21.8546 40.0801 23.248 40.0801 24.9636V26.6109C40.0801 28.3299 38.7172 29.72 37.0391 29.72'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21.6455 26.8811C21.6455 26.1747 21.085 25.6017 20.394 25.6017C19.703 25.6017 19.1426 26.1747 19.1426 26.8811C19.1426 27.5876 19.703 28.1605 20.394 28.1605C21.085 28.1605 21.6455 27.5876 21.6455 26.8811Z'
            fill='#404040'
          />
          <path
            d='M30.8613 26.8811C30.8613 26.1747 30.3009 25.6017 29.6099 25.6017C28.9188 25.6017 28.3584 26.1747 28.3584 26.8811C28.3584 27.5876 28.9188 28.1605 29.6099 28.1605C30.3009 28.1605 30.8613 27.5876 30.8613 26.8811Z'
            fill='#404040'
          />
          <path
            d='M21.999 32.5522C23.6581 34.2484 26.3457 34.2484 28.0016 32.5522'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M13.7896 23.1959C13.7896 23.1959 18.3049 21.9653 20.4097 15.9653V21.809H25.2246'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M36.2109 23.1959C36.2109 23.1959 31.6955 21.9653 29.5906 15.9653V21.809H24.7759'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M35.4575 27.5254C35.4575 27.5254 35.2948 40.6567 25.3354 40.6567'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeDasharray='0.83 2.5'
          />
          <path
            d='M14.543 27.5254C14.543 27.5254 14.7056 40.6567 24.6649 40.6567'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeDasharray='0.83 2.5'
          />
          <path
            d='M5.57959 34.5961H11.5552'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M44.4209 34.5961H38.4453'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9.56348 36.6162L11.5553 34.596L9.56348 32.5758'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M40.4377 36.6162L38.4458 34.596L40.4377 32.5758'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_466_5362'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 안면윤곽 버튼 SVG 아이콘 (활성 상태)
export function FacialContouringIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7509)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_7509)'
          strokeWidth='2'
        />
        <mask
          id='mask0_466_7509'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='5'
          y='9'
          width='42'
          height='34'
        >
          <path d='M46.4168 9.33337H5.5835V42.6667H46.4168V9.33337Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_7509)'>
          <path
            d='M37.5454 22.7959V33.8842C37.5454 38.0057 34.5104 41.6567 30.4822 41.6567H21.5188C17.4874 41.6567 14.4619 38.0025 14.4619 33.8842V22.7959C14.4587 16.2783 19.6238 10.9946 25.9989 10.9946H26.0021C32.3772 10.9946 37.5454 16.2783 37.5454 22.7959Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M13.962 30.72C12.2806 30.72 10.9209 29.3266 10.9209 27.6109V25.9636C10.9209 24.2447 12.2838 22.8546 13.962 22.8546'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M38.0391 22.8546C39.7204 22.8546 41.0801 24.248 41.0801 25.9636V27.6109C41.0801 29.3299 39.7172 30.72 38.0391 30.72'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M22.6455 27.8811C22.6455 27.1747 22.085 26.6017 21.394 26.6017C20.703 26.6017 20.1426 27.1747 20.1426 27.8811C20.1426 28.5876 20.703 29.1605 21.394 29.1605C22.085 29.1605 22.6455 28.5876 22.6455 27.8811Z'
            fill='#404040'
          />
          <path
            d='M31.8613 27.8811C31.8613 27.1747 31.3009 26.6017 30.6099 26.6017C29.9188 26.6017 29.3584 27.1747 29.3584 27.8811C29.3584 28.5876 29.9188 29.1605 30.6099 29.1605C31.3009 29.1605 31.8613 28.5876 31.8613 27.8811Z'
            fill='#404040'
          />
          <path
            d='M22.999 33.5522C24.6581 35.2484 27.3457 35.2484 29.0016 33.5522'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M14.7896 24.1959C14.7896 24.1959 19.3049 22.9653 21.4097 16.9653V22.809H26.2246'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M37.2109 24.1959C37.2109 24.1959 32.6955 22.9653 30.5906 16.9653V22.809H25.7759'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M36.4575 28.5254C36.4575 28.5254 36.2948 41.6567 26.3354 41.6567'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeDasharray='0.83 2.5'
          />
          <path
            d='M15.543 28.5254C15.543 28.5254 15.7056 41.6567 25.6649 41.6567'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeDasharray='0.83 2.5'
          />
          <path
            d='M6.57959 35.5961H12.5552'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M45.4209 35.5961H39.4453'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.5635 37.6162L12.5553 35.596L10.5635 33.5758'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M41.4377 37.6162L39.4458 35.596L41.4377 33.5758'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_7509'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_7509'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 가슴 버튼 SVG 아이콘 (비활성 상태)
export function BreastIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_5310)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <mask
          id='mask0_466_5310'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='6'
          y='9'
          width='38'
          height='32'
        >
          <path d='M43.3332 9.16663H6.6665V40.8333H43.3332V9.16663Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_5310)'>
          <path
            d='M25.241 26.4393C25.241 29.2247 21.8842 31.2998 19.0886 31.1406C16.7411 31.007 14.7965 29.134 14.5654 26.7749C14.464 25.7403 14.6838 24.7654 15.1347 23.9355C15.5969 23.0856 15.7152 22.088 15.4193 21.1671L15.0248 19.9449'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M25.2407 26.4393C25.2407 29.2247 28.1123 31.2998 30.9079 31.1406C33.2555 31.007 35.2 29.134 35.4311 26.7749C35.5326 25.7403 35.3128 24.7654 34.8618 23.9355C34.3997 23.0856 34.2813 22.088 34.5772 21.1671L34.9718 19.9449'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M16.3295 30.1742C16.3295 30.1742 17.4173 33.7071 17.1749 35.5318C16.9326 37.3594 15.9688 39.4286 15.9688 39.4286'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M33.6697 30.1742C33.6697 30.1742 32.5819 33.7071 32.8243 35.5318C33.0666 37.3594 34.0305 39.4286 34.0305 39.4286'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M20.5879 10.5684C20.5879 10.5684 20.1342 12.7796 18.9168 13.8853C17.6993 14.9909 14.2893 15.4826 12.9507 17.8161C11.612 20.1496 11.8512 20.0648 12.2147 25.9596'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M29.4116 10.5684C29.4116 10.5684 29.8653 12.7796 31.0828 13.8853C32.3003 14.9909 35.7103 15.4826 37.0489 17.8161C38.3875 20.1496 38.1484 20.0648 37.7849 25.9596'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M19.7031 16.4434L23.5697 17.5376'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M30.2939 16.4434L26.4302 17.5376'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M35.3452 33.9818C38.4255 33.5896 40.6068 30.7501 40.2179 27.6436'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M41.9422 28.3994L40.0653 26.6287L38.3096 28.5188'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M14.6544 33.9818C11.5741 33.5896 9.39279 30.7501 9.7817 27.6436'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M8.05713 28.3994L9.93122 26.6287L11.687 28.5188'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_466_5310'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 가슴 버튼 SVG 아이콘 (활성 상태)
export function BreastIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7372)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_7372)'
          strokeWidth='2'
        />
        <mask
          id='mask0_466_7372'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='7'
          y='10'
          width='38'
          height='32'
        >
          <path d='M44.3332 10.1666H7.6665V41.8333H44.3332V10.1666Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_7372)'>
          <path
            d='M26.241 27.4393C26.241 30.2247 22.8842 32.2998 20.0886 32.1406C17.7411 32.007 15.7965 30.134 15.5654 27.7749C15.464 26.7403 15.6838 25.7654 16.1347 24.9355C16.5969 24.0856 16.7152 23.088 16.4193 22.1671L16.0248 20.9449'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M26.2407 27.4393C26.2407 30.2247 29.1123 32.2998 31.9079 32.1406C34.2555 32.007 36.2 30.134 36.4311 27.7749C36.5326 26.7403 36.3128 25.7654 35.8618 24.9355C35.3997 24.0856 35.2813 23.088 35.5772 22.1671L35.9718 20.9449'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M17.3295 31.1743C17.3295 31.1743 18.4173 34.7072 18.1749 36.5319C17.9326 38.3595 16.9688 40.4287 16.9688 40.4287'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M34.6697 31.1743C34.6697 31.1743 33.5819 34.7072 33.8243 36.5319C34.0666 38.3595 35.0305 40.4287 35.0305 40.4287'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21.5879 11.5685C21.5879 11.5685 21.1342 13.7797 19.9168 14.8854C18.6993 15.991 15.2893 16.4827 13.9507 18.8162C12.612 21.1497 12.8512 21.0649 13.2147 26.9597'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M30.4116 11.5685C30.4116 11.5685 30.8653 13.7797 32.0828 14.8854C33.3003 15.991 36.7103 16.4827 38.0489 18.8162C39.3875 21.1497 39.1484 21.0649 38.7849 26.9597'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M20.7031 17.4435L24.5697 18.5377'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M31.2939 17.4435L27.4302 18.5377'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M36.3452 34.9819C39.4255 34.5897 41.6068 31.7502 41.2179 28.6437'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M42.9422 29.3995L41.0653 27.6288L39.3096 29.5189'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M15.6544 34.9819C12.5741 34.5897 10.3928 31.7502 10.7817 28.6437'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9.05713 29.3995L10.9312 27.6288L12.687 29.5189'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_7372'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_7372'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 줄기세포 버튼 SVG 아이콘 (비활성 상태)
export function StemCellIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_5444)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <path
          d='M22.1392 24.1917L16.6919 29.7752'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M26.0249 14.316L31.7739 20.2087'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M32.8159 9.32385C32.8159 11.4911 34.53 13.248 36.6443 13.248'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M29.9821 12.7001L20.4551 22.4653L23.8232 25.9177L33.3502 16.1525L29.9821 12.7001Z'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M31.6665 14.4261L33.9371 12.0986'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M10.1133 29.798H39.8876'
          stroke='#404040'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M10.1133 39.842C10.1336 39.8426 10.1547 39.8426 10.1751 39.8426C10.8459 39.8426 11.5167 39.6881 12.0283 39.3792C12.5398 39.0702 13.2106 38.9156 13.8814 38.9156C14.5523 38.9156 15.2232 39.0701 15.7346 39.3792C16.2461 39.6881 16.917 39.8426 17.5878 39.8426C18.2586 39.8426 18.9295 39.6881 19.441 39.3792C19.9524 39.0702 20.6233 38.9156 21.2941 38.9156C21.965 38.9156 22.6358 39.0701 23.1473 39.3792C23.6587 39.6881 24.3296 39.8426 25.0004 39.8426C25.6713 39.8426 26.3422 39.6881 26.8536 39.3792C27.3651 39.0702 28.036 38.9156 28.7068 38.9156C29.3776 38.9156 30.0485 39.0701 30.56 39.3792C31.0714 39.6881 31.7423 39.8426 32.4131 39.8426C33.084 39.8426 33.7549 39.6881 34.2663 39.3792C34.7778 39.0702 35.4487 38.9156 36.1195 38.9156C36.7903 38.9156 37.4612 39.0701 37.9727 39.3792C38.4841 39.6881 39.155 39.8426 39.8258 39.8426C39.8463 39.8426 39.8672 39.8426 39.8876 39.842'
          stroke='#404040'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.6489 36.6881C18.018 36.6881 18.3173 36.3814 18.3173 36.003C18.3173 35.6246 18.018 35.3179 17.6489 35.3179C17.2797 35.3179 16.9805 35.6246 16.9805 36.003C16.9805 36.3814 17.2797 36.6881 17.6489 36.6881Z'
          fill='#404040'
        />
        <path
          d='M32.351 36.6881C32.7202 36.6881 33.0194 36.3814 33.0194 36.003C33.0194 35.6246 32.7202 35.3179 32.351 35.3179C31.9819 35.3179 31.6826 35.6246 31.6826 36.003C31.6826 36.3814 31.9819 36.6881 32.351 36.6881Z'
          fill='#404040'
        />
        <path
          d='M25.0004 36.6881C25.3696 36.6881 25.6688 36.3814 25.6688 36.003C25.6688 35.6246 25.3696 35.3179 25.0004 35.3179C24.6313 35.3179 24.332 35.6246 24.332 36.003C24.332 36.3814 24.6313 36.6881 25.0004 36.6881Z'
          fill='#404040'
        />
        <path
          d='M28.5834 33.9657C28.9526 33.9657 29.2518 33.659 29.2518 33.2806C29.2518 32.9022 28.9526 32.5955 28.5834 32.5955C28.2143 32.5955 27.915 32.9022 27.915 33.2806C27.915 33.659 28.2143 33.9657 28.5834 33.9657Z'
          fill='#404040'
        />
        <path
          d='M21.4174 33.9657C21.7866 33.9657 22.0858 33.659 22.0858 33.2806C22.0858 32.9022 21.7866 32.5955 21.4174 32.5955C21.0483 32.5955 20.749 32.9022 20.749 33.2806C20.749 33.659 21.0483 33.9657 21.4174 33.9657Z'
          fill='#404040'
        />
        <path
          d='M36.0883 33.9657C36.4575 33.9657 36.7567 33.659 36.7567 33.2806C36.7567 32.9022 36.4575 32.5955 36.0883 32.5955C35.7192 32.5955 35.4199 32.9022 35.4199 33.2806C35.4199 33.659 35.7192 33.9657 36.0883 33.9657Z'
          fill='#404040'
        />
        <path
          d='M13.9121 33.9657C14.2812 33.9657 14.5805 33.659 14.5805 33.2806C14.5805 32.9022 14.2812 32.5955 13.9121 32.5955C13.5429 32.5955 13.2437 32.9022 13.2437 33.2806C13.2437 33.659 13.5429 33.9657 13.9121 33.9657Z'
          fill='#404040'
        />
      </g>
      <defs>
        <clipPath id='clip0_466_5444'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 줄기세포 버튼 SVG 아이콘 (활성 상태)
export function StemCellIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7450)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_7450)'
          strokeWidth='2'
        />
        <path
          d='M23.1392 25.1917L17.6919 30.7752'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M27.0249 15.316L32.7739 21.2087'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M33.8159 10.3239C33.8159 12.4911 35.53 14.248 37.6443 14.248'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M30.9821 13.7001L21.4551 23.4653L24.8232 26.9177L34.3502 17.1525L30.9821 13.7001Z'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M32.6665 15.4261L34.9371 13.0986'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.1133 30.798H40.8876'
          stroke='#404040'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.1133 40.842C11.1336 40.8426 11.1547 40.8427 11.1751 40.8427C11.8459 40.8427 12.5167 40.6881 13.0283 40.3792C13.5398 40.0702 14.2106 39.9156 14.8814 39.9156C15.5523 39.9156 16.2232 40.0701 16.7346 40.3792C17.2461 40.6881 17.917 40.8427 18.5878 40.8427C19.2586 40.8427 19.9295 40.6881 20.441 40.3792C20.9524 40.0702 21.6233 39.9156 22.2941 39.9156C22.965 39.9156 23.6358 40.0701 24.1473 40.3792C24.6587 40.6881 25.3296 40.8427 26.0004 40.8427C26.6713 40.8427 27.3422 40.6881 27.8536 40.3792C28.3651 40.0702 29.036 39.9156 29.7068 39.9156C30.3776 39.9156 31.0485 40.0701 31.56 40.3792C32.0714 40.6881 32.7423 40.8427 33.4131 40.8427C34.084 40.8427 34.7549 40.6881 35.2663 40.3792C35.7778 40.0702 36.4487 39.9156 37.1195 39.9156C37.7903 39.9156 38.4612 40.0701 38.9727 40.3792C39.4841 40.6881 40.155 40.8427 40.8258 40.8427C40.8463 40.8427 40.8672 40.8426 40.8876 40.842'
          stroke='#404040'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M18.6489 37.6881C19.018 37.6881 19.3173 37.3814 19.3173 37.003C19.3173 36.6246 19.018 36.3179 18.6489 36.3179C18.2797 36.3179 17.9805 36.6246 17.9805 37.003C17.9805 37.3814 18.2797 37.6881 18.6489 37.6881Z'
          fill='#404040'
        />
        <path
          d='M33.351 37.6881C33.7202 37.6881 34.0194 37.3814 34.0194 37.003C34.0194 36.6246 33.7202 36.3179 33.351 36.3179C32.9819 36.3179 32.6826 36.6246 32.6826 37.003C32.6826 37.3814 32.9819 37.6881 33.351 37.6881Z'
          fill='#404040'
        />
        <path
          d='M26.0004 37.6881C26.3696 37.6881 26.6688 37.3814 26.6688 37.003C26.6688 36.6246 26.3696 36.3179 26.0004 36.3179C25.6313 36.3179 25.332 36.6246 25.332 37.003C25.332 37.3814 25.6313 37.6881 26.0004 37.6881Z'
          fill='#404040'
        />
        <path
          d='M29.5834 34.9657C29.9526 34.9657 30.2518 34.659 30.2518 34.2806C30.2518 33.9022 29.9526 33.5955 29.5834 33.5955C29.2143 33.5955 28.915 33.9022 28.915 34.2806C28.915 34.659 29.2143 34.9657 29.5834 34.9657Z'
          fill='#404040'
        />
        <path
          d='M22.4174 34.9657C22.7866 34.9657 23.0858 34.659 23.0858 34.2806C23.0858 33.9022 22.7866 33.5955 22.4174 33.5955C22.0483 33.5955 21.749 33.9022 21.749 34.2806C21.749 34.659 22.0483 34.9657 22.4174 34.9657Z'
          fill='#404040'
        />
        <path
          d='M37.0883 34.9657C37.4575 34.9657 37.7567 34.659 37.7567 34.2806C37.7567 33.9022 37.4575 33.5955 37.0883 33.5955C36.7192 33.5955 36.4199 33.9022 36.4199 34.2806C36.4199 34.659 36.7192 34.9657 37.0883 34.9657Z'
          fill='#404040'
        />
        <path
          d='M14.9121 34.9657C15.2812 34.9657 15.5805 34.659 15.5805 34.2806C15.5805 33.9022 15.2812 33.5955 14.9121 33.5955C14.5429 33.5955 14.2437 33.9022 14.2437 34.2806C14.2437 34.659 14.5429 34.9657 14.9121 34.9657Z'
          fill='#404040'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_7450'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_7450'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 지방흡입 버튼 SVG 아이콘 (비활성 상태)
export function LiposuctionIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_5407)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <mask
          id='mask0_466_5407'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='5'
          y='11'
          width='40'
          height='28'
        >
          <path d='M44.1668 11.6666H5.8335V38.3333H44.1668V11.6666Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_5407)'>
          <path
            d='M16.4599 13.0366C16.4599 13.0366 16.6431 18.4656 14.8173 21.8448C12.9915 25.224 11.8985 30.0263 12.9945 36.9634'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M33.5408 13.0366C33.5408 13.0366 33.3576 18.4656 35.1834 21.8448C37.0062 25.224 38.1022 30.0263 37.0062 36.9634'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M15.0664 22.0206C20.5528 24.047 29.4475 24.047 34.9339 22.0206'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M13.9941 24.7498C13.9941 24.7498 22.0961 27.0016 24.9129 32.577'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M36.0061 24.7498C36.0061 24.7498 27.9042 27.0016 25.0874 32.577'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M25 32.9313V36.9635'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M25 16.6853V18.2285'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6.9292 16.0865H13.0043'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.9707 18.0665L13.0047 16.0865L10.9707 14.1031'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M43.0712 16.0864H36.9961'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M39.0301 18.0665L36.9961 16.0865L39.0301 14.1031'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_466_5407'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 지방흡입 버튼 SVG 아이콘 (활성 상태)
export function LiposuctionIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7423)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_7423)'
          strokeWidth='2'
        />
        <path
          d='M17.4599 14.0366C17.4599 14.0366 17.6431 19.4656 15.8173 22.8448C13.9915 26.224 12.8985 31.0263 13.9945 37.9634'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M34.5408 14.0366C34.5408 14.0366 34.3576 19.4656 36.1834 22.8448C38.0062 26.224 39.1022 31.0263 38.0062 37.9634'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.0664 23.0206C21.5528 25.047 30.4475 25.047 35.9339 23.0206'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M14.9941 25.7498C14.9941 25.7498 23.0961 28.0016 25.9129 33.577'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M37.0061 25.7498C37.0061 25.7498 28.9042 28.0016 26.0874 33.577'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M26 33.9313V37.9635'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M26 17.6853V19.2285'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7.9292 17.0865H14.0043'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.9707 19.0665L14.0047 17.0865L11.9707 15.1031'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M44.0712 17.0864H37.9961'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M40.0301 19.0665L37.9961 17.0865L40.0301 15.1031'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_7423'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_7423'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 바디 버튼 SVG 아이콘 (비활성 상태)
export function BodyIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_5291)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <mask
          id='mask0_466_5291'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='8'
          y='10'
          width='34'
          height='30'
        >
          <path d='M41.6668 10H8.3335V40H41.6668V10Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_5291)'>
          <path
            d='M36.6375 22.5994C37.4079 26.0049 35.2577 29.3536 32.8351 29.8668C30.4125 30.3801 28.6343 27.8621 27.8668 24.4538C27.0964 21.0484 27.6296 18.0399 30.0492 17.5295C32.4719 17.0163 35.867 19.1911 36.6345 22.5994H36.6375Z'
            fill='var(--color-primary-900)'
          />
          <path
            d='M19.3191 11.3566C19.3191 11.3566 11.7466 22.3499 17.8046 29.6797L18.9412 38.6434'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M34.8416 11.3566L33.1367 18.3206C33.1367 18.3206 38.2485 26.2005 33.1367 31.6957V38.6434'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M20.4352 22.4689C20.4352 25.3696 19.612 27.7203 18.5955 27.7203C17.579 27.7203 16.7559 25.3696 16.7559 22.4689C16.7559 19.5682 17.579 17.2175 18.5955 17.2175C19.612 17.2175 20.4352 19.5682 20.4352 22.4689Z'
            fill='var(--color-primary-900)'
          />
          <path
            d='M17.8047 29.1134V14.9028'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeDasharray='0.83 2.5'
          />
          <path
            d='M33.3184 32.7817C33.3184 32.7817 38.2573 29.7817 38.064 24.4368C37.8648 18.9075 33.6548 17.1467 33.6548 17.1467'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeDasharray='0.83 2.5'
          />
          <path
            d='M36.5083 16.5925L40.3735 14.6453'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M39.6527 16.8257L40.3733 14.6452L38.1235 13.9476'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9.08936 17.748H14.5996'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12.7549 19.5251L14.5997 17.7481L12.7549 15.968'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9.08936 28.2759H14.5996'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12.7549 30.0529L14.5997 28.2759L12.7549 26.4958'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_466_5291'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 바디 버튼 SVG 아이콘 (활성 상태)
export function BodyIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7391)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_7391)'
          strokeWidth='2'
        />
        <mask
          id='mask0_466_7391'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='9'
          y='11'
          width='34'
          height='30'
        >
          <path d='M42.6668 11H9.3335V41H42.6668V11Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_7391)'>
          <path
            d='M37.6375 23.5993C38.4079 27.0048 36.2577 30.3535 33.8351 30.8667C31.4125 31.38 29.6343 28.862 28.8668 25.4537C28.0964 22.0483 28.6296 19.0398 31.0492 18.5294C33.4719 18.0162 36.867 20.191 37.6345 23.5993H37.6375Z'
            fill='var(--color-primary-900)'
          />
          <path
            d='M20.3191 12.3566C20.3191 12.3566 12.7466 23.3499 18.8046 30.6797L19.9412 39.6434'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M35.8416 12.3566L34.1367 19.3206C34.1367 19.3206 39.2485 27.2005 34.1367 32.6957V39.6434'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21.4352 23.4689C21.4352 26.3696 20.612 28.7203 19.5955 28.7203C18.579 28.7203 17.7559 26.3696 17.7559 23.4689C17.7559 20.5682 18.579 18.2175 19.5955 18.2175C20.612 18.2175 21.4352 20.5682 21.4352 23.4689Z'
            fill='var(--color-primary-900)'
          />
          <path
            d='M18.8047 30.1133V15.9027'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeDasharray='0.83 2.5'
          />
          <path
            d='M34.3184 33.7817C34.3184 33.7817 39.2573 30.7817 39.064 25.4368C38.8648 19.9075 34.6548 18.1467 34.6548 18.1467'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeDasharray='0.83 2.5'
          />
          <path
            d='M37.5083 17.5925L41.3735 15.6453'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M40.6527 17.8256L41.3733 15.6451L39.1235 14.9475'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.0894 18.7479H15.5996'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M13.7549 20.5251L15.5997 18.7481L13.7549 16.968'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.0894 29.2759H15.5996'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M13.7549 31.0528L15.5997 29.2758L13.7549 27.4957'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_7391'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_7391'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 모발이식 버튼 SVG 아이콘 (비활성 상태)
export function HairTransplantIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_5383)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <mask
          id='mask0_466_5383'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='8'
          y='9'
          width='34'
          height='32'
        >
          <path d='M41.6668 9.16663H8.3335V40.8333H41.6668V9.16663Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_5383)'>
          <path
            d='M26.2917 32.04C24.7675 29.8421 25.0369 27.5525 25.0369 27.5525C24.4981 22.6066 29.3424 19.8586 29.3424 19.8586C21.394 21.4321 22.8842 28.561 20.9086 32.2134C20.2606 33.4226 20.4232 34.9639 21.4256 35.9872C22.6439 37.2311 24.6195 37.2311 25.8378 35.9872C26.8863 34.9168 27.0271 33.2715 26.2674 32.0424H26.2917V32.04Z'
            fill='var(--color-primary-900)'
          />
          <path
            d='M11.3168 19.2019C8.40451 22.671 9.98202 28.494 15.2 28.494C20.418 28.494 21.9956 22.2993 18.9619 19.2019'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <path
            d='M19.6811 29.7329C16.7688 33.202 18.3463 39.025 23.5643 39.025C28.7823 39.025 30.3598 32.8303 27.3261 29.7329'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <path
            d='M30.9858 22.0516C28.0734 25.5207 29.651 31.3437 34.869 31.3437C40.087 31.3437 41.6645 25.149 38.6308 22.0516'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <path
            d='M17.8068 21.3503C16.2827 19.1524 16.5496 16.8628 16.5496 16.8628C16.0108 11.9145 20.8575 9.1665 20.8575 9.1665C12.9092 10.74 14.3969 17.8689 12.4213 21.5213C11.7733 22.7305 11.9359 24.2717 12.9383 25.2951C14.1566 26.539 16.1322 26.539 17.3505 25.2951C18.399 24.2247 18.5398 22.5793 17.7801 21.3503H17.8044H17.8068Z'
            fill='var(--color-primary-900)'
          />
          <path
            d='M37.5158 24.1132C35.9917 21.9153 36.2586 19.6257 36.2586 19.6257C35.7198 14.6799 40.5641 11.9319 40.5641 11.9319C32.6157 13.5053 34.1059 20.6342 32.1303 24.2867C31.4823 25.4959 31.6449 27.0371 32.6473 28.0605C33.8656 29.3044 35.8412 29.3044 37.0595 28.0605C38.108 26.99 38.2487 25.3447 37.4891 24.1157H37.5134L37.5158 24.1132Z'
            fill='var(--color-primary-900)'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_466_5383'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 모발이식 버튼 SVG 아이콘 (활성 상태)
export function HairTransplantIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7410)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_7410)'
          strokeWidth='2'
        />
        <mask
          id='mask0_466_7410'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='9'
          y='10'
          width='34'
          height='32'
        >
          <path d='M42.6668 10.1666H9.3335V41.8333H42.6668V10.1666Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_7410)'>
          <path
            d='M27.2917 33.04C25.7675 30.8421 26.0369 28.5525 26.0369 28.5525C25.4981 23.6066 30.3424 20.8586 30.3424 20.8586C22.394 22.4321 23.8842 29.561 21.9086 33.2134C21.2606 34.4226 21.4232 35.9639 22.4256 36.9872C23.6439 38.2311 25.6195 38.2311 26.8378 36.9872C27.8863 35.9168 28.0271 34.2715 27.2674 33.0424H27.2917V33.04Z'
            fill='var(--color-primary-900)'
          />
          <path
            d='M12.3168 20.2019C9.40452 23.671 10.982 29.494 16.2 29.494C21.418 29.494 22.9956 23.2993 19.9619 20.2019'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <path
            d='M20.6811 30.7329C17.7688 34.202 19.3463 40.025 24.5643 40.025C29.7823 40.025 31.3598 33.8303 28.3261 30.7329'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <path
            d='M31.9858 23.0516C29.0734 26.5207 30.651 32.3437 35.869 32.3437C41.087 32.3437 42.6645 26.149 39.6308 23.0516'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <path
            d='M18.8068 22.3503C17.2827 20.1524 17.5496 17.8628 17.5496 17.8628C17.0108 12.9145 21.8575 10.1665 21.8575 10.1665C13.9092 11.74 15.3969 18.8689 13.4213 22.5213C12.7733 23.7305 12.9359 25.2717 13.9383 26.2951C15.1566 27.539 17.1322 27.539 18.3505 26.2951C19.399 25.2247 19.5398 23.5793 18.7801 22.3503H18.8044H18.8068Z'
            fill='var(--color-primary-900)'
          />
          <path
            d='M38.5158 25.1132C36.9917 22.9153 37.2586 20.6257 37.2586 20.6257C36.7198 15.6799 41.5641 12.9319 41.5641 12.9319C33.6157 14.5053 35.1059 21.6342 33.1303 25.2867C32.4823 26.4959 32.6449 28.0371 33.6473 29.0605C34.8656 30.3044 36.8412 30.3044 38.0595 29.0605C39.108 27.99 39.2487 26.3447 38.4891 25.1157H38.5134L38.5158 25.1132Z'
            fill='var(--color-primary-900)'
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_7410'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_7410'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 피부과 버튼 SVG 아이콘 (비활성 상태)
export function DermatologyIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_5337)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <path
          d='M19.3714 8.29492C19.3714 8.29492 14.2321 11.3977 15.357 18.0687C15.357 18.0687 16.1604 20.0855 14.7142 21.9472L11.9823 24.8948C11.9823 24.8948 11.0181 25.6705 12.4644 26.7565L14.0714 27.6873C14.0714 27.6873 13.5893 28.9284 14.3928 30.1695C14.3928 30.1695 13.2279 30.9066 14.5535 32.1863C16.1813 33.7578 14.0714 37.1508 17.6067 37.7713C21.1421 38.3919 27.5699 36.9956 30.7809 32.4966'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M25.96 36.6825C25.96 36.6825 26.6117 37.1364 27.7871 40.8712'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M34.0128 21.789C34.0128 21.789 36.9708 19.9906 38.0302 22.7199C38.9944 25.2021 37.3874 26.4432 37.066 27.9946C36.7447 29.546 35.6198 30.632 33.6914 30.4768'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M35.7801 24.1161C35.7801 24.1161 34.0124 23.9609 33.3696 26.4431'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M18.25 24.6219C18.6642 24.6219 19 24.2916 19 23.8841C19 23.4767 18.6642 23.1464 18.25 23.1464C17.8358 23.1464 17.5 23.4767 17.5 23.8841C17.5 24.2916 17.8358 24.6219 18.25 24.6219Z'
          fill='var(--color-primary-900)'
        />
        <path
          d='M21.876 32.6217C22.2902 32.6217 22.626 32.2914 22.626 31.884C22.626 31.4765 22.2902 31.1462 21.876 31.1462C21.4618 31.1462 21.126 31.4765 21.126 31.884C21.126 32.2914 21.4618 32.6217 21.876 32.6217Z'
          fill='var(--color-primary-900)'
        />
        <path
          d='M26.1973 29.0014C26.1973 28.5959 25.8635 28.2637 25.4473 28.2637C25.031 28.2637 24.6973 28.592 24.6973 29.0014C24.6973 29.4108 25.031 29.7392 25.4473 29.7392C25.8635 29.7392 26.1973 29.4108 26.1973 29.0014Z'
          fill='var(--color-primary-900)'
        />
        <path
          d='M28.6519 22.8971C29.0661 22.8971 29.4019 22.5668 29.4019 22.1594C29.4019 21.7519 29.0661 21.4216 28.6519 21.4216C28.2376 21.4216 27.9019 21.7519 27.9019 22.1594C27.9019 22.5668 28.2376 22.8971 28.6519 22.8971Z'
          fill='var(--color-primary-900)'
        />
        <path
          d='M24.6787 24.8979C25.0929 24.8979 25.4287 24.5676 25.4287 24.1601C25.4287 23.7527 25.0929 23.4224 24.6787 23.4224C24.2645 23.4224 23.9287 23.7527 23.9287 24.1601C23.9287 24.5676 24.2645 24.8979 24.6787 24.8979Z'
          fill='var(--color-primary-900)'
        />
        <path
          d='M20.7145 28.7991C21.3062 28.7991 21.7859 28.3273 21.7859 27.7452C21.7859 27.1631 21.3062 26.6913 20.7145 26.6913C20.1228 26.6913 19.6431 27.1631 19.6431 27.7452C19.6431 28.3273 20.1228 28.7991 20.7145 28.7991Z'
          fill='var(--color-primary-900)'
        />
      </g>
      <defs>
        <clipPath id='clip0_466_5337'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 피부과 버튼 SVG 아이콘 (활성 상태)
export function DermatologyIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7437)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_7437)'
          strokeWidth='2'
        />
        <path
          d='M20.3714 9.29492C20.3714 9.29492 15.2321 12.3977 16.357 19.0687C16.357 19.0687 17.1604 21.0855 15.7142 22.9472L12.9823 25.8948C12.9823 25.8948 12.0181 26.6705 13.4644 27.7565L15.0714 28.6873C15.0714 28.6873 14.5893 29.9284 15.3928 31.1695C15.3928 31.1695 14.2279 31.9066 15.5535 33.1863C17.1813 34.7578 15.0714 38.1508 18.6067 38.7713C22.1421 39.3919 28.5699 37.9956 31.7809 33.4966'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M26.96 37.6825C26.96 37.6825 27.6117 38.1364 28.7871 41.8712'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M35.0128 22.789C35.0128 22.789 37.9708 20.9906 39.0302 23.7199C39.9944 26.2021 38.3874 27.4432 38.066 28.9946C37.7447 30.546 36.6198 31.632 34.6914 31.4768'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M36.7801 25.1161C36.7801 25.1161 35.0124 24.9609 34.3696 27.4431'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M19.25 25.6219C19.6642 25.6219 20 25.2916 20 24.8841C20 24.4767 19.6642 24.1464 19.25 24.1464C18.8358 24.1464 18.5 24.4767 18.5 24.8841C18.5 25.2916 18.8358 25.6219 19.25 25.6219Z'
          fill='var(--color-primary-900)'
        />
        <path
          d='M22.876 33.6217C23.2902 33.6217 23.626 33.2914 23.626 32.884C23.626 32.4765 23.2902 32.1462 22.876 32.1462C22.4618 32.1462 22.126 32.4765 22.126 32.884C22.126 33.2914 22.4618 33.6217 22.876 33.6217Z'
          fill='var(--color-primary-900)'
        />
        <path
          d='M27.1973 30.0014C27.1973 29.5959 26.8635 29.2637 26.4473 29.2637C26.031 29.2637 25.6973 29.592 25.6973 30.0014C25.6973 30.4108 26.031 30.7392 26.4473 30.7392C26.8635 30.7392 27.1973 30.4108 27.1973 30.0014Z'
          fill='var(--color-primary-900)'
        />
        <path
          d='M29.6519 23.8971C30.0661 23.8971 30.4019 23.5668 30.4019 23.1594C30.4019 22.7519 30.0661 22.4216 29.6519 22.4216C29.2376 22.4216 28.9019 22.7519 28.9019 23.1594C28.9019 23.5668 29.2376 23.8971 29.6519 23.8971Z'
          fill='var(--color-primary-900)'
        />
        <path
          d='M25.6787 25.8979C26.0929 25.8979 26.4287 25.5676 26.4287 25.1601C26.4287 24.7527 26.0929 24.4224 25.6787 24.4224C25.2645 24.4224 24.9287 24.7527 24.9287 25.1601C24.9287 25.5676 25.2645 25.8979 25.6787 25.8979Z'
          fill='var(--color-primary-900)'
        />
        <path
          d='M21.7145 29.7991C22.3062 29.7991 22.7859 29.3273 22.7859 28.7452C22.7859 28.1631 22.3062 27.6913 21.7145 27.6913C21.1228 27.6913 20.6431 28.1631 20.6431 28.7452C20.6431 29.3273 21.1228 29.7991 21.7145 29.7991Z'
          fill='var(--color-primary-900)'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_7437'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_7437'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 치과 버튼 SVG 아이콘 (비활성 상태)
export function DentalIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_5329)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <path
          d='M31.5163 17.1345C29.3369 15.5298 26.787 15.9133 25.0676 16.6037C24.3822 16.8768 23.6197 16.8768 22.9375 16.6037C21.2211 15.9164 18.6682 15.5329 16.4887 17.1345C13.3739 19.4264 14.405 24.7927 15.2385 26.2439C16.072 27.6921 17.1123 33.0921 17.8408 37.7496C17.9334 38.3479 18.1094 38.8817 18.3409 39.3634C19.0479 40.83 21.2798 40.2931 21.2798 38.667V33.2792C21.2798 31.7912 22.4528 30.5148 23.9501 30.4872C25.475 30.4596 26.7222 31.6807 26.7222 33.1903V38.667C26.7222 40.2931 28.9541 40.83 29.661 39.3634C29.8926 38.8817 30.0685 38.3479 30.1611 37.7496C30.8897 33.0921 31.93 27.6921 32.7635 26.2439C33.597 24.7957 34.6281 19.4295 31.5133 17.1345H31.5163Z'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M21.667 20.4167H25.0003'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M15.9961 14.2259C14.0976 13.5632 13.5573 13.0262 12.8874 11.1362C12.2206 13.0232 11.6804 13.5601 9.77881 14.2259C11.6773 14.8886 12.2176 15.4255 12.8874 17.3155C13.5542 15.4286 14.0945 14.8917 15.9961 14.2259Z'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M40.2179 25.0907C38.8812 24.6244 38.5015 24.247 38.0323 22.9185C37.5631 24.247 37.1834 24.6244 35.8467 25.0907C37.1834 25.5571 37.5631 25.9345 38.0323 27.263C38.5015 25.9345 38.8812 25.5571 40.2179 25.0907Z'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M39.6757 14.0452C37.0517 13.1278 36.3046 12.3853 35.3847 9.7804C34.4617 12.3883 33.7146 13.1308 31.0938 14.0452C33.7176 14.9625 34.4648 15.705 35.3847 18.3099C36.3077 15.702 37.0548 14.9595 39.6757 14.0452Z'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_466_5329'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 치과 버튼 SVG 아이콘 (활성 상태)
export function DentalIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7490)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_7490)'
          strokeWidth='2'
        />
        <path
          d='M32.5163 18.1345C30.3369 16.5298 27.787 16.9133 26.0676 17.6037C25.3822 17.8768 24.6197 17.8768 23.9375 17.6037C22.2211 16.9164 19.6682 16.5329 17.4887 18.1345C14.3739 20.4264 15.405 25.7927 16.2385 27.2439C17.072 28.6921 18.1123 34.0921 18.8408 38.7496C18.9334 39.3479 19.1094 39.8817 19.3409 40.3634C20.0479 41.83 22.2798 41.2931 22.2798 39.667V34.2792C22.2798 32.7912 23.4528 31.5148 24.9501 31.4872C26.475 31.4596 27.7222 32.6807 27.7222 34.1903V39.667C27.7222 41.2931 29.9541 41.83 30.661 40.3634C30.8926 39.8817 31.0685 39.3479 31.1611 38.7496C31.8897 34.0921 32.93 28.6921 33.7635 27.2439C34.597 25.7957 35.6281 20.4295 32.5133 18.1345H32.5163Z'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M22.667 21.4167H26.0003'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.9961 15.2259C15.0976 14.5632 14.5573 14.0262 13.8874 12.1362C13.2206 14.0232 12.6804 14.5601 10.7788 15.2259C12.6773 15.8886 13.2176 16.4255 13.8874 18.3155C14.5542 16.4286 15.0945 15.8917 16.9961 15.2259Z'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M41.2179 26.0907C39.8812 25.6244 39.5015 25.247 39.0323 23.9185C38.5631 25.247 38.1834 25.6244 36.8467 26.0907C38.1834 26.5571 38.5631 26.9345 39.0323 28.263C39.5015 26.9345 39.8812 26.5571 41.2179 26.0907Z'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M40.6757 15.0452C38.0517 14.1278 37.3046 13.3853 36.3847 10.7804C35.4617 13.3883 34.7146 14.1308 32.0938 15.0452C34.7176 15.9625 35.4648 16.705 36.3847 19.3099C37.3077 16.702 38.0548 15.9595 40.6757 15.0452Z'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_7490'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_7490'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 기타 버튼 SVG 아이콘 (비활성 상태)
export function OtherIconInactive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_5434)'>
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          fill='white'
        />
        <path
          d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16L0.504883 15.5996C0.713873 7.35729 7.35729 0.713873 15.5996 0.504883L16 0.5Z'
          stroke='#F8ADFF'
        />
        <path
          d='M34.5847 21.5562C36.505 19.1459 36.9706 15.9615 35.9705 13.1778C32.8766 12.0742 29.2839 12.7578 26.8044 15.2257C25.0549 16.9689 24.2035 19.2694 24.2394 21.5535'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M27.7715 21.3529L32.1714 16.9688'
          stroke='var(--color-primary-900)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M36.6567 25.4625H13.3431C12.2604 25.4625 11.3843 24.5896 11.3843 23.5107C11.3843 22.4318 12.2604 21.5588 13.3431 21.5588H36.654C37.7367 21.5588 38.6128 22.4318 38.6128 23.5107C38.6128 24.5896 37.7367 25.4625 36.654 25.4625H36.6567Z'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M36.9793 26.0801V31.8533C36.9793 35.5895 33.9376 38.6202 30.188 38.6202H19.8123C16.0626 38.6202 13.021 35.5895 13.021 31.8533V26.0801'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M14.9023 15.9449L18.5914 14.7837'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M14.5087 16.0683L14.9054 15.9448L16.6824 21.5588H23.1376L20.7737 14.1L21.1705 13.9765C21.8703 13.7569 22.2615 13.0102 22.0383 12.3129C21.8152 11.6156 21.0685 11.2258 20.3687 11.4482L13.7069 13.5428C13.0071 13.7624 12.6187 14.5091 12.8391 15.2064C13.0595 15.9036 13.8089 16.2935 14.5087 16.0711V16.0683Z'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M27.6701 30.9894H25.8435V29.1666H24.1601V30.9894H22.3335V32.664H24.1601V34.4841H25.8435V32.664H27.6701V30.9894Z'
          fill='#404040'
        />
      </g>
      <defs>
        <clipPath id='clip0_466_5434'>
          <rect width='50' height='50' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 기타 버튼 SVG 아이콘 (활성 상태)
export function OtherIconActive() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      className='h-[50px] w-[50px]'
    >
      <g clipPath='url(#clip0_466_7476)'>
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          fill='#FEEFFF'
        />
        <path
          d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
          stroke='url(#paint0_linear_466_7476)'
          strokeWidth='2'
        />
        <mask
          id='mask0_466_7476'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='11'
          y='11'
          width='30'
          height='30'
        >
          <path d='M41 11H11V41H41V11Z' fill='white' />
        </mask>
        <g mask='url(#mask0_466_7476)'>
          <path
            d='M35.5847 22.5562C37.505 20.1459 37.9706 16.9615 36.9705 14.1778C33.8766 13.0742 30.2839 13.7578 27.8044 16.2257C26.0549 17.9689 25.2035 20.2694 25.2394 22.5535'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M28.7715 22.3528L33.1714 17.9688'
            stroke='var(--color-primary-900)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M37.6567 26.4625H14.3431C13.2604 26.4625 12.3843 25.5896 12.3843 24.5107C12.3843 23.4318 13.2604 22.5588 14.3431 22.5588H37.654C38.7367 22.5588 39.6128 23.4318 39.6128 24.5107C39.6128 25.5896 38.7367 26.4625 37.654 26.4625H37.6567Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M37.9793 27.0801V32.8533C37.9793 36.5895 34.9376 39.6202 31.188 39.6202H20.8123C17.0626 39.6202 14.021 36.5895 14.021 32.8533V27.0801'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M15.9023 16.9449L19.5914 15.7837'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M15.5087 17.0683L15.9054 16.9448L17.6824 22.5588H24.1376L21.7737 15.1L22.1705 14.9765C22.8703 14.7569 23.2615 14.0102 23.0383 13.3129C22.8152 12.6156 22.0685 12.2258 21.3687 12.4482L14.7069 14.5428C14.0071 14.7624 13.6187 15.5091 13.8391 16.2064C14.0595 16.9036 14.8089 17.2935 15.5087 17.0711V17.0683Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M28.6701 31.9894H26.8435V30.1666H25.1601V31.9894H23.3335V33.664H25.1601V35.4841H26.8435V33.664H28.6701V31.9894Z'
            fill='#404040'
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_466_7476'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <clipPath id='clip0_466_7476'>
          <rect width='52' height='52' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

// 전체 버튼 SVG 아이콘 (활성 상태)
export function AllIconActive() {
  return (
    <svg
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='h-[50px] w-[50px]'
    >
      <path
        d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
        fill='#FEEFFF'
      />
      <path
        d='M1 17C1 8.16344 8.16344 1 17 1H35C43.8366 1 51 8.16344 51 17V35C51 43.8366 43.8366 51 35 51H17C8.16344 51 1 43.8366 1 35V17Z'
        stroke='url(#paint0_linear_1073_11346)'
        strokeWidth='2'
      />
      <path
        d='M22.4129 13.8691H15.2947C14.5085 13.8691 13.8711 14.5065 13.8711 15.2928V22.411C13.8711 23.1972 14.5085 23.8346 15.2947 23.8346H22.4129C23.1992 23.8346 23.8365 23.1972 23.8365 22.411V15.2928C23.8365 14.5065 23.1992 13.8691 22.4129 13.8691Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M22.4129 28.2637H15.2947C14.5085 28.2637 13.8711 28.901 13.8711 29.6873V36.8055C13.8711 37.5918 14.5085 38.2291 15.2947 38.2291H22.4129C23.1992 38.2291 23.8365 37.5918 23.8365 36.8055V29.6873C23.8365 28.901 23.1992 28.2637 22.4129 28.2637Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M36.8074 13.869H29.6893C28.903 13.869 28.2656 14.5064 28.2656 15.2927V22.4108C28.2656 23.1971 28.903 23.8345 29.6893 23.8345H36.8074C37.5937 23.8345 38.2311 23.1971 38.2311 22.4108V15.2927C38.2311 14.5064 37.5937 13.869 36.8074 13.869Z'
        stroke='var(--color-primary-900)'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M36.8074 28.2637H29.6893C28.903 28.2637 28.2656 28.901 28.2656 29.6873V36.8055C28.2656 37.5918 28.903 38.2291 29.6893 38.2291H36.8074C37.5937 38.2291 38.2311 37.5918 38.2311 36.8055V29.6873C38.2311 28.901 37.5937 28.2637 36.8074 28.2637Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1073_11346'
          x1='1'
          y1='26'
          x2='51'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 전체 버튼 SVG 아이콘 (비활성 상태)
export function AllIconInactive() {
  return (
    <svg
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='h-[50px] w-[50px]'
    >
      <path
        d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16C0.5 7.43959 7.43959 0.5 16 0.5Z'
        fill='white'
      />
      <path
        d='M16 0.5H34C42.5604 0.5 49.5 7.43959 49.5 16V34C49.5 42.5604 42.5604 49.5 34 49.5H16C7.43959 49.5 0.5 42.5604 0.5 34V16C0.5 7.43959 7.43959 0.5 16 0.5Z'
        stroke='#F8ADFF'
      />
      <path
        d='M21.4129 12.8691H14.2947C13.5085 12.8691 12.8711 13.5065 12.8711 14.2928V21.411C12.8711 22.1972 13.5085 22.8346 14.2947 22.8346H21.4129C22.1992 22.8346 22.8365 22.1972 22.8365 21.411V14.2928C22.8365 13.5065 22.1992 12.8691 21.4129 12.8691Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M21.4129 27.2637H14.2947C13.5085 27.2637 12.8711 27.901 12.8711 28.6873V35.8055C12.8711 36.5918 13.5085 37.2291 14.2947 37.2291H21.4129C22.1992 37.2291 22.8365 36.5918 22.8365 35.8055V28.6873C22.8365 27.901 22.1992 27.2637 21.4129 27.2637Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M35.8074 12.869H28.6893C27.903 12.869 27.2656 13.5064 27.2656 14.2927V21.4108C27.2656 22.1971 27.903 22.8345 28.6893 22.8345H35.8074C36.5937 22.8345 37.2311 22.1971 37.2311 21.4108V14.2927C37.2311 13.5064 36.5937 12.869 35.8074 12.869Z'
        stroke='var(--color-primary-900)'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M35.8074 27.2637H28.6893C27.903 27.2637 27.2656 27.901 27.2656 28.6873V35.8055C27.2656 36.5918 27.903 37.2291 28.6893 37.2291H35.8074C36.5937 37.2291 37.2311 36.5918 37.2311 35.8055V28.6873C37.2311 27.901 36.5937 27.2637 35.8074 27.2637Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
    </svg>
  );
}
