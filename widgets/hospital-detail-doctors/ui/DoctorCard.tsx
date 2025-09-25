'use client';

import Image from 'next/image';
import { useState } from 'react';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type Dictionary } from 'shared/model/types';
import { type HospitalDoctor } from 'entities/hospital/api/entities/types';
import { MedicalSpecialtyTags } from 'shared/ui/medical-specialty-tags';
import { LocaleLink } from 'shared/ui/locale-link';
import { HeartIcon, HeartOutlineIcon } from 'shared/ui/icons';

interface DoctorCardProps {
  doctor: HospitalDoctor;
  lang: Locale;
  dict: Dictionary;
  variant?: 'light' | 'dark';
}

/**
 * 개별 의료진 카드 컴포넌트
 */
export function DoctorCard({ doctor, lang, dict, variant = 'light' }: DoctorCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const doctorName = extractLocalizedText(doctor.name, lang) || '이름 없음';
  const position = extractLocalizedText(doctor.position, lang) || '';
  const hospitalName = extractLocalizedText(doctor.hospital.name, lang) || '';

  // 의사 이미지 중 첫 번째 이미지를 프로필 이미지로 사용
  const profileImage =
    doctor.doctorImages && doctor.doctorImages.length > 0 ? doctor.doctorImages[0] : null;

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className='relative z-10 flex h-full items-center gap-3 rounded-lg border border-white bg-white/50 p-3 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px] transition-opacity active:opacity-80'>
      {/* 프로필 이미지 */}
      <div className='relative h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-xl'>
        <Image
          src={profileImage?.imageUrl || '/images/shared/default_image_square.png'}
          alt={profileImage?.alt || `${doctorName} 의료진 프로필`}
          fill
          className='object-cover'
          sizes='100px'
        />
      </div>

      {/* 의료진 정보 */}
      <div className='flex h-full w-full min-w-0 flex-col justify-between'>
        <div className='flex min-w-0 flex-col'>
          {/* 이름과 직책 */}
          <div className='flex min-w-0 items-center'>
            <h3 className='min-w-0 truncate text-base font-semibold'>{doctorName}</h3>
            {position && (
              <>
                <span className='mx-1 text-base font-semibold'>·</span>
                <span className='min-w-0 truncate text-base font-semibold'>{position}</span>
              </>
            )}
          </div>

          {/* 병원명 */}
          {hospitalName && (
            <p className='mt-0.5 min-w-0 truncate text-xs font-medium text-gray-600'>
              {hospitalName}
            </p>
          )}

          {/* 진료부위 태그 */}
          <div className='mt-2 min-w-0'>
            <MedicalSpecialtyTags
              specialties={doctor.medicalSpecialties || []}
              lang={lang}
              maxDisplay={2}
            />
          </div>
        </div>

        {/* 하단 액션 섹션 */}
        <div className='mt-3 flex items-center justify-between'>
          {/* 더보기 버튼 */}
          <LocaleLink
            href={`/doctor/${doctor.id}`}
            className='text-primary flex items-center gap-1 text-xs font-medium transition-colors'
          >
            <span>{dict.review?.showMore || '더보기'}</span>
            <span className='text-xs'>&gt;</span>
          </LocaleLink>

          {/* 좋아요 버튼 */}
          <button
            onClick={handleLikeToggle}
            className='flex items-center justify-center'
            aria-label={
              isLiked
                ? dict.review?.like?.liked || '좋아요 취소'
                : dict.review?.like?.like || '좋아요'
            }
          >
            {isLiked ? (
              <HeartIcon className='h-6 w-6 text-purple-600' />
            ) : (
              <HeartOutlineIcon className='h-6 w-6 text-purple-600' />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
