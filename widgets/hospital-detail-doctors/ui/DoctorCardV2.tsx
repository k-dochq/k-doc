'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type Dictionary } from 'shared/model/types';
import { type HospitalDoctor } from 'entities/hospital/api/entities/types';
import { MedicalSpecialtyTagsV2 } from 'shared/ui/medical-specialty-tags/MedicalSpecialtyTagsV2';
import { LocaleLink } from 'shared/ui/locale-link';
import { HeartFilledV2 } from 'shared/ui/icons/HeartFilledV2';
import { HeartOutlineV2 } from 'shared/ui/icons/HeartOutlineV2';
import { useDoctorLike } from 'features/doctor-like/model/useDoctorLike';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';
import { ArrowRightIcon } from 'shared/ui/arrow-right-icon';

interface DoctorCardV2Props {
  doctor: HospitalDoctor;
  lang: Locale;
  dict: Dictionary;
}

export function DoctorCardV2({ doctor, lang, dict }: DoctorCardV2Props) {
  const doctorName = extractLocalizedText(doctor.name, lang) || '';
  const position = extractLocalizedText(doctor.position, lang) || '';
  const hospitalName = extractLocalizedText(doctor.hospital?.name, lang) || '';
  const profileImage =
    doctor.doctorImages && doctor.doctorImages.length > 0 ? doctor.doctorImages[0] : null;

  const { isAuthenticated } = useAuth();
  const { isLiked, likeCount, isToggling, error, toggleLike } = useDoctorLike({
    doctorId: doctor.id,
  });

  const tagSpecialties = useMemo(
    () => doctor.medicalSpecialties || [],
    [doctor.medicalSpecialties],
  );

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isToggling) return;

    if (!isAuthenticated || error?.status === 401) {
      openModal({
        content: (
          <LoginRequiredModal lang={lang} dict={dict} redirectPath={window.location.pathname} />
        ),
      });
      return;
    }

    toggleLike();
  };

  return (
    <LocaleLink href={`/doctor/${doctor.id}`} locale={lang} className='block'>
      <div className='relative flex items-start gap-3 rounded-xl bg-white p-3 shadow-[1px_2px_4px_0_rgba(0,0,0,0.4)]'>
        {/* 프로필 이미지 */}
        <div className='relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-full bg-[#cde3ff]'>
          <Image
            src={profileImage?.imageUrl || '/images/shared/default_image_square.png'}
            alt={profileImage?.alt || `${doctorName || 'doctor'} profile`}
            fill
            className='object-cover'
            sizes='100px'
          />
        </div>

        {/* 내용 */}
        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          <div className='flex min-w-0 flex-col gap-1'>
            <div className='flex min-w-0 items-center gap-1 text-[16px] leading-6 font-semibold text-neutral-700'>
              <p className='truncate'>{doctorName}</p>
              {position && <p className='truncate text-neutral-700'>{position}</p>}
            </div>
            {hospitalName && (
              <p className='truncate text-[12px] leading-4 text-neutral-400'>{hospitalName}</p>
            )}
            {tagSpecialties.length > 0 && (
              <div className='min-w-0'>
                <MedicalSpecialtyTagsV2 specialties={tagSpecialties} lang={lang} maxDisplay={2} />
              </div>
            )}
          </div>

          <div className='flex items-center gap-1 text-[12px] leading-4 text-neutral-500'>
            <span>{(dict as any)?.common?.more || '더보기'}</span>
            <ArrowRightIcon size={12} className='text-neutral-500' />
          </div>
        </div>

        {/* 좋아요 */}
        <button
          onClick={handleLikeToggle}
          className='absolute right-3 bottom-3 flex h-6 w-6 items-center justify-center'
        >
          {isLiked ? (
            <HeartFilledV2 width={20} height={20} />
          ) : (
            <HeartOutlineV2 width={20} height={20} />
          )}
        </button>
      </div>
    </LocaleLink>
  );
}
