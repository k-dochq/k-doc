'use client';

import { MessageCircle, Clock } from 'lucide-react';
import type { Locale } from 'shared/config';
import { LocaleLink } from 'shared/ui/locale-link';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { useConsultationHospitals } from '../model/useConsultationHospitals';

interface ConsultationChatListProps {
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

export function ConsultationChatList({ lang, dict }: ConsultationChatListProps) {
  const { data: hospitals, isLoading, error } = useConsultationHospitals();

  // 로딩 상태
  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent'></div>
          <p className='text-gray-600'>{dict.loading}</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-center'>
        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
          <svg
            className='h-8 w-8 text-red-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <h3 className='mb-2 text-lg font-medium text-gray-900'>{dict.error}</h3>
        <p className='mb-4 text-gray-500'>{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className='rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
        >
          {dict.retry}
        </button>
      </div>
    );
  }

  // 빈 상태
  if (!hospitals || hospitals.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-center'>
        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100'>
          <MessageCircle className='h-8 w-8 text-gray-400' />
        </div>
        <h3 className='mb-2 text-lg font-medium text-gray-900'>{dict.empty.title}</h3>
        <p className='text-gray-500'>{dict.empty.description}</p>
      </div>
    );
  }

  // 상담중인 병원 목록
  return (
    <div className='space-y-3'>
      {hospitals.map((hospital) => {
        const hospitalName = extractLocalizedText(hospital.name, lang) || '병원';
        const hospitalAddress = extractLocalizedText(hospital.address, lang);

        return (
          <LocaleLink
            key={hospital.id}
            href={`/consultation/chat?hospitalId=${hospital.id}`}
            locale={lang}
            className='block'
          >
            <div className='flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50'>
              {/* 병원 프로필 이미지 */}
              <div className='flex-shrink-0'>
                {hospital.profileImageUrl ? (
                  <img
                    src={hospital.profileImageUrl}
                    alt={hospitalName}
                    className='h-12 w-12 rounded-full object-cover'
                  />
                ) : (
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
                    <MessageCircle className='h-6 w-6 text-blue-600' />
                  </div>
                )}
              </div>

              {/* 병원 정보 */}
              <div className='min-w-0 flex-1'>
                <div className='flex items-center justify-between'>
                  <h3 className='truncate text-sm font-medium text-gray-900'>{hospitalName}</h3>
                  <div className='ml-2 flex items-center text-xs text-gray-500'>
                    <Clock className='mr-1 h-3 w-3' />
                    {new Date(hospital.lastMessageAt).toLocaleDateString('ko-KR', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>

                {hospitalAddress && (
                  <p className='mt-1 truncate text-xs text-gray-500'>{hospitalAddress}</p>
                )}

                <div className='mt-2 flex items-center'>
                  <div className='flex items-center text-xs text-blue-600'>
                    <MessageCircle className='mr-1 h-3 w-3' />
                    <span>상담 진행중</span>
                  </div>
                </div>
              </div>

              {/* 화살표 아이콘 */}
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </div>
            </div>
          </LocaleLink>
        );
      })}
    </div>
  );
}
