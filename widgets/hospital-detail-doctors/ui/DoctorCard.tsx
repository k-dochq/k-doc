'use client';

import Image from 'next/image';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type Dictionary } from 'shared/model/types';
import { type HospitalDoctor } from 'entities/hospital/api/entities/types';
import { MedicalSpecialtyTags } from 'shared/ui/medical-specialty-tags';
import { LocaleLink } from 'shared/ui/locale-link';
import { HeartIcon, HeartOutlineIcon } from 'shared/ui/icons';
import { LoadingIcon } from 'shared/ui/loading-icon';
import { useDoctorLike } from 'features/doctor-like/model/useDoctorLike';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';

interface DoctorCardProps {
  doctor: HospitalDoctor;
  lang: Locale;
  dict: Dictionary;
  variant?: 'light' | 'dark';
  showMoreButton?: boolean;
  showLikeButton?: boolean;
  showBackground?: boolean;
}

/**
 * 개별 의료진 카드 컴포넌트
 */
export function DoctorCard({
  doctor,
  lang,
  dict,
  variant = 'light',
  showMoreButton = true,
  showLikeButton = true,
  showBackground = true,
}: DoctorCardProps) {
  const { isAuthenticated } = useAuth();

  const doctorName = extractLocalizedText(doctor.name, lang) || '이름 없음';
  const position = extractLocalizedText(doctor.position, lang) || '';
  const hospitalName = extractLocalizedText(doctor.hospital.name, lang) || '';

  // 의사 이미지 중 첫 번째 이미지를 프로필 이미지로 사용
  const profileImage =
    doctor.doctorImages && doctor.doctorImages.length > 0 ? doctor.doctorImages[0] : null;

  // 의사 좋아요 훅
  const { isLiked, likeCount, isToggling, error, toggleLike } = useDoctorLike({
    doctorId: doctor.id,
    enabled: showLikeButton,
  });

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isToggling) return;

    // 로그인 상태 확인
    if (!isAuthenticated) {
      openModal({
        content: (
          <LoginRequiredModal lang={lang} dict={dict} redirectPath={window.location.pathname} />
        ),
      });
      return;
    }

    // 에러가 401이면 로그인 모달 표시
    if (error?.status === 401) {
      openModal({
        content: (
          <LoginRequiredModal lang={lang} dict={dict} redirectPath={window.location.pathname} />
        ),
      });
      return;
    }

    toggleLike();
  };

  const backgroundClasses = showBackground
    ? 'rounded-xl border border-white bg-white/50 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px]'
    : '';

  const paddingClasses = showBackground ? 'p-3' : '';

  return (
    <LocaleLink href={`/doctor/${doctor.id}`} className='block'>
      <div
        className={`relative z-10 flex items-stretch gap-3 transition-opacity active:opacity-80 ${backgroundClasses} ${paddingClasses} ${showBackground ? 'h-[124px]' : ''}`}
      >
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
        <div className='flex flex-1 w-full min-w-0 flex-col justify-between'>
          {/* 상단 정보 섹션 */}
          <div className='flex min-w-0 flex-col'>
            {/* 이름과 직책 */}
            <div className='min-w-0'>
              <h3 className='line-clamp-2 text-sm leading-tight font-semibold'>
                {doctorName}
                {position && (
                  <>
                    <span className='mx-1'>·</span>
                    {position}
                  </>
                )}
              </h3>
            </div>

            {/* 병원명 */}
            {hospitalName && (
              <p className='mt-1 min-w-0 truncate text-xs font-medium text-gray-600'>
                {hospitalName}
              </p>
            )}

            {/* 진료부위 태그 */}
            <div className='mt-1 min-w-0'>
              <MedicalSpecialtyTags
                specialties={doctor.medicalSpecialties || []}
                lang={lang}
                maxDisplay={2}
              />
            </div>
          </div>

          {/* 하단 액션 섹션 */}
          <div className='flex items-center justify-between'>
            {/* 더보기 버튼 */}
            {showMoreButton && (
              <div className='text-primary flex items-center text-xs font-medium transition-colors'>
                <span>{dict.review?.showMore || '더보기'}</span>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6 12L10 8L6 4'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            )}

            {/* 좋아요 버튼 */}
            {showLikeButton && (
              <div className='flex items-center gap-1'>
                <button
                  onClick={handleLikeToggle}
                  disabled={isToggling}
                  className={`flex items-center justify-center transition-opacity ${
                    isToggling ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80'
                  }`}
                  aria-label={
                    isLiked
                      ? dict.review?.like?.liked || '좋아요 취소'
                      : dict.review?.like?.like || '좋아요'
                  }
                >
                  {isToggling ? (
                    <LoadingIcon size={20} className='text-purple-600' />
                  ) : isLiked ? (
                    <HeartIcon className='h-6 w-6 text-purple-600' />
                  ) : (
                    <HeartOutlineIcon className='h-6 w-6 text-purple-600' />
                  )}
                </button>
                {likeCount > 0 && (
                  <span
                    className={`text-xs font-medium text-gray-600 ${isToggling ? 'opacity-70' : ''}`}
                  >
                    {likeCount}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </LocaleLink>
  );
}
