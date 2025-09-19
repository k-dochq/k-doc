import { type NavigationItem } from './types';

// 홈 아이콘
function HomeIcon({ className, active = false }: { className?: string; active?: boolean }) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M21.5 21.5V10.1L12 2.5L2.5 10.1V21.5H8.675V13.9H15.325V21.5H21.5Z'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
    </svg>
  );
}

// 병원 아이콘
function HospitalIcon({ className, active = false }: { className?: string; active?: boolean }) {
  if (active) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='25'
        height='24'
        viewBox='0 0 25 24'
        fill='none'
        className={className}
      >
        <path
          d='M16.75 5.5H20.75L22.75 10.5H2.75L4.75 5.5H8.75'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M4.75 10.5H20.75V21.5H4.75V10.5Z'
          fill='#DA47EF'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.75 2.5H8.75V10.5H16.75V2.5Z'
          fill='#DA47EF'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.75 14.5H8.75V21.5H12.75V14.5Z'
          fill='#DA47EF'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.75 14.5H12.75V21.5H16.75V14.5Z'
          fill='#DA47EF'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.25 6.5H14.25'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M18.75 21.5H6.75'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.75 8V5'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      className={className}
    >
      <path
        d='M16.75 5.5H20.75L22.75 10.5H2.75L4.75 5.5H8.75'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.75 10.5H20.75V21.5H4.75V10.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.75 2.5H8.75V10.5H16.75V2.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.75 14.5H8.75V21.5H12.75V14.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.75 14.5H12.75V21.5H16.75V14.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.25 6.5H14.25'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.75 21.5H6.75'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.75 8V5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

// 시술후기 아이콘
function ReviewIcon({ className, active = false }: { className?: string; active?: boolean }) {
  if (active) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='25'
        height='24'
        viewBox='0 0 25 24'
        fill='none'
        className={className}
      >
        <path
          d='M19.5 2H5.5C4.94771 2 4.5 2.44771 4.5 3V21C4.5 21.5523 4.94771 22 5.5 22H19.5C20.0523 22 20.5 21.5523 20.5 21V3C20.5 2.44771 20.0523 2 19.5 2Z'
          fill='#DA47EF'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M9 16H16H9Z' fill='white' />
        <path
          d='M9 16H16'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M9 19H12.5H9Z' fill='white' />
        <path
          d='M9 19H12.5'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.6 5L13.8087 7.64739L16.7 7.9788L14.5557 9.94644L15.134 12.7987L12.6 11.3673L10.066 12.7987L10.6443 9.94644L8.5 7.9788L11.3913 7.64739L12.6 5Z'
          fill='white'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      className={className}
    >
      <path
        d='M19.5 2H5.5C4.94771 2 4.5 2.44771 4.5 3V21C4.5 21.5523 4.94771 22 5.5 22H19.5C20.0523 22 20.5 21.5523 20.5 21V3C20.5 2.44771 20.0523 2 19.5 2Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9 16H16'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9 19H12.5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.6 5L13.8087 7.64739L16.7 7.9788L14.5557 9.94644L15.134 12.7987L12.6 11.3673L10.066 12.7987L10.6443 9.94644L8.5 7.9788L11.3913 7.64739L12.6 5Z'
        fill='white'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

// 찜 아이콘
function FavoriteIcon({ className, active = false }: { className?: string; active?: boolean }) {
  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M7.52778 3.5C4.61333 3.5 2.25 6.02588 2.25 9.14076C2.25 15.375 12.25 21.5 12.25 21.5C12.25 21.5 22.25 15.375 22.25 9.14076C22.25 5.28153 19.8867 3.5 16.9722 3.5C14.9056 3.5 13.1167 4.76965 12.25 6.61824C11.3833 4.76965 9.59444 3.5 7.52778 3.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

// 상담 아이콘
function ConsultationIcon({ className, active = false }: { className?: string; active?: boolean }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M22 4.5H2V19.5H5.5V22L10.5 19.5H22V4.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.5 9V9.5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.5 9V9.5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.5 13.5C15.5 13.5 14.5 15.5 12 15.5C9.5 15.5 8.5 13.5 8.5 13.5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    href: '/main',
    icon: HomeIcon,
    label: {
      ko: '홈',
      en: 'Home',
      th: 'หน้าแรก',
    },
  },
  {
    id: 'hospitals',
    href: '/hospitals',
    icon: HospitalIcon,
    label: {
      ko: '병원',
      en: 'Hospitals',
      th: 'โรงพยาบาล',
    },
  },
  {
    id: 'reviews',
    href: '/reviews',
    icon: ReviewIcon,
    label: {
      ko: '시술후기',
      en: 'Reviews',
      th: 'รีวิว',
    },
  },
  {
    id: 'favorites',
    href: '/favorites',
    icon: FavoriteIcon,
    label: {
      ko: '찜',
      en: 'Favorites',
      th: 'รายการโปรด',
    },
  },
  {
    id: 'consultation',
    href: '/consultation',
    icon: ConsultationIcon,
    label: {
      ko: '상담',
      en: 'Consultation',
      th: 'ปรึกษา',
    },
  },
];
