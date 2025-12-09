'use client';

import { type Hospital } from 'entities/hospital/api/entities/types';

interface HospitalDetailBadgeV2Props {
  hospital: Hospital;
}

export function HospitalDetailBadgeV2({ hospital }: HospitalDetailBadgeV2Props) {
  // 뱃지 로직: badge 배열의 첫 번째 요소 확인
  const firstBadge = hospital.badge?.[0];

  // HOT 또는 BEST만 표시
  if (firstBadge !== 'HOT' && firstBadge !== 'BEST') {
    return null;
  }

  return (
    <div className='absolute -top-[5px] right-[18px] z-20 overflow-clip'>
      {firstBadge === 'HOT' && (
        <svg
          width='58'
          height='32'
          viewBox='0 0 58 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M54.6939 0C56.5225 0 58.0011 2.24286 58.0011 5H39.6582L41.0368 0H54.6939Z'
            fill='url(#paint0_linear_382_26575)'
          />
          <path
            style={{ mixBlendMode: 'multiply' }}
            d='M37.998 5C37.998 2.24138 42.4719 0 47.998 0C53.5242 0 57.998 2.24138 57.998 5H37.998Z'
            fill='url(#paint1_radial_382_26575)'
          />
          <path
            d='M0.0703125 23.5503V5.04446C0.0703125 2.2628 2.75783 0 5.02101 0H54.0703C51.8071 0 49.9771 2.2628 49.9771 5.04446V23.5503L25.0237 32L0.0703125 23.5503Z'
            fill='url(#paint2_linear_382_26575)'
          />
          <g filter='url(#filter0_d_382_26575)'>
            <path
              d='M8.17773 21V8.27344H10.4629V13.6699H16.3867V8.27344H18.6895V21H16.3867V15.5859H10.4629V21H8.17773ZM32.4004 14.6367C32.4004 18.75 29.9043 21.1758 26.5645 21.1758C23.2246 21.1758 20.7285 18.7324 20.7285 14.6367C20.7285 10.5234 23.2246 8.09766 26.5645 8.09766C29.9043 8.09766 32.4004 10.5234 32.4004 14.6367ZM30.0977 14.6367C30.0977 11.7363 28.6387 10.1543 26.5645 10.1543C24.4902 10.1543 23.0312 11.7363 23.0312 14.6367C23.0312 17.5371 24.4902 19.1191 26.5645 19.1191C28.6387 19.1191 30.0977 17.5371 30.0977 14.6367ZM33.3145 10.1895V8.27344H43.457V10.1895H39.5371V21H37.252V10.1895H33.3145Z'
              fill='white'
            />
          </g>
          <defs>
            <filter
              id='filter0_d_382_26575'
              x='5.17773'
              y='5.09766'
              width='41.2793'
              height='19.0781'
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
              <feBlend
                mode='normal'
                in2='BackgroundImageFix'
                result='effect1_dropShadow_382_26575'
              />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow_382_26575'
                result='shape'
              />
            </filter>
            <linearGradient
              id='paint0_linear_382_26575'
              x1='49.6223'
              y1='0'
              x2='58.6223'
              y2='0'
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='0.245192' stopColor='#09807E' />
              <stop offset='1' stopColor='#35FFFC' />
            </linearGradient>
            <radialGradient
              id='paint1_radial_382_26575'
              cx='0'
              cy='0'
              r='1'
              gradientUnits='userSpaceOnUse'
              gradientTransform='translate(47.4306 4.43764) rotate(90) scale(4.57931 9.72959)'
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
              id='paint2_linear_382_26575'
              x1='27.0611'
              y1='0'
              x2='27.0611'
              y2='32.6957'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#0DADAA' />
              <stop offset='0.130017' stopColor='#0FDCD9' />
              <stop offset='0.199599' stopColor='#0FE5E1' />
              <stop offset='1' stopColor='#0FE5E1' />
            </linearGradient>
          </defs>
        </svg>
      )}
      {firstBadge === 'BEST' && (
        <svg
          width='58'
          height='32'
          viewBox='0 0 58 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M54.6959 0C56.5244 0 58.003 2.24286 58.003 5H39.6602L41.0387 0H54.6959Z'
            fill='url(#paint0_linear_382_26810)'
          />
          <path
            style={{ mixBlendMode: 'multiply' }}
            d='M38 5C38 2.24138 42.4738 0 48 0C53.5262 0 58 2.24138 58 5H38Z'
            fill='url(#paint1_radial_382_26810)'
          />
          <path
            d='M0.0722656 23.5503V5.04446C0.0722656 2.2628 2.75979 0 5.02296 0H54.0723C51.8091 0 49.9791 2.2628 49.9791 5.04446V23.5503L25.0257 32L0.0722656 23.5503Z'
            fill='url(#paint2_linear_382_26810)'
          />
          <g filter='url(#filter0_d_382_26810)'>
            <path
              d='M5.17773 21V8.27344H10.0469C12.8066 8.27344 14.1777 9.67969 14.1777 11.5781C14.1777 13.125 13.1934 13.9863 11.9453 14.2852V14.4082C13.2988 14.4785 14.6699 15.6035 14.6699 17.5371C14.6699 19.5234 13.2461 21 10.3281 21H5.17773ZM9.97656 19.084C11.6465 19.084 12.3496 18.3633 12.3496 17.3613C12.3496 16.2188 11.4531 15.3398 10.0293 15.3398H7.46289V19.084H9.97656ZM9.76562 13.6875C10.9785 13.6875 11.8926 12.9844 11.8926 11.8594C11.8926 10.875 11.1895 10.1719 9.81836 10.1719H7.46289V13.6875H9.76562ZM15.9932 21V8.27344H24.2725V10.1895H18.2784V13.6699H23.833V15.5859H18.2784V19.0664H24.3077V21H15.9932ZM32.8555 11.7715C32.7501 10.6816 31.8184 10.0488 30.4473 10.0488C29.0059 10.0488 28.127 10.752 28.127 11.7012C28.127 12.7734 29.252 13.2129 30.3067 13.459L31.502 13.7754C33.4005 14.2148 35.2286 15.2168 35.2286 17.4316C35.2286 19.6641 33.4708 21.1934 30.4122 21.1934C27.4415 21.1934 25.5782 19.7695 25.4727 17.2559H27.7227C27.8282 18.5918 28.9532 19.2422 30.3946 19.2422C31.9063 19.2422 32.9434 18.5039 32.9434 17.4141C32.9434 16.4121 32.0118 15.9902 30.6407 15.6387L29.1993 15.2695C27.1075 14.7246 25.8067 13.6699 25.8067 11.8418C25.8067 9.5918 27.8106 8.09766 30.4825 8.09766C33.1895 8.09766 35.0177 9.62695 35.0528 11.7715H32.8555ZM36.0245 10.1895V8.27344H46.1671V10.1895H42.2472V21H39.962V10.1895H36.0245Z'
              fill='white'
            />
          </g>
          <defs>
            <filter
              id='filter0_d_382_26810'
              x='2.17773'
              y='5.09766'
              width='46.9902'
              height='19.0957'
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
              <feBlend
                mode='normal'
                in2='BackgroundImageFix'
                result='effect1_dropShadow_382_26810'
              />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow_382_26810'
                result='shape'
              />
            </filter>
            <linearGradient
              id='paint0_linear_382_26810'
              x1='49.6243'
              y1='0'
              x2='58.6243'
              y2='0'
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='0.245192' stopColor='#09807E' />
              <stop offset='1' stopColor='#35FFFC' />
            </linearGradient>
            <radialGradient
              id='paint1_radial_382_26810'
              cx='0'
              cy='0'
              r='1'
              gradientUnits='userSpaceOnUse'
              gradientTransform='translate(47.4325 4.43764) rotate(90) scale(4.57931 9.72959)'
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
              id='paint2_linear_382_26810'
              x1='27.0631'
              y1='0'
              x2='27.0631'
              y2='32.6957'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#0DADAA' />
              <stop offset='0.130017' stopColor='#0FDCD9' />
              <stop offset='0.199599' stopColor='#0FE5E1' />
              <stop offset='1' stopColor='#0FE5E1' />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
}
