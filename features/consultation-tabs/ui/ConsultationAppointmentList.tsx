'use client';

import type { Locale } from 'shared/config';

interface ConsultationAppointmentListProps {
  lang: Locale;
  dict: {
    loading: string;
    error: string;
    retry: string;
    empty: {
      title: string;
      description: string;
    };
  };
}

export function ConsultationAppointmentList({ lang, dict }: ConsultationAppointmentListProps) {
  // 임시로 빈 상태를 표시
  const isEmpty = true;

  if (isEmpty) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-center'>
        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100'>
          <svg
            className='h-8 w-8 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6'
            />
          </svg>
        </div>
        <h3 className='mb-2 text-lg font-medium text-gray-900'>{dict.empty.title}</h3>
        <p className='text-gray-500'>{dict.empty.description}</p>
      </div>
    );
  }

  // 실제 데이터가 있을 때의 UI (추후 구현)
  return <div className='space-y-4'>{/* 예약신청 목록이 여기에 표시될 예정 */}</div>;
}
