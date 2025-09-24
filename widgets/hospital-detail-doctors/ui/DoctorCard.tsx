import Image from 'next/image';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type HospitalDoctor } from 'entities/hospital/api/entities/types';
import { MedicalSpecialtyTags } from 'shared/ui/medical-specialty-tags';
import { LocaleLink } from 'shared/ui/locale-link';

interface DoctorCardProps {
  doctor: HospitalDoctor;
  lang: Locale;
  variant?: 'light' | 'dark';
}

/**
 * 개별 의료진 카드 컴포넌트
 */
export function DoctorCard({ doctor, lang, variant = 'light' }: DoctorCardProps) {
  const doctorName = extractLocalizedText(doctor.name, lang) || '이름 없음';
  const position = extractLocalizedText(doctor.position, lang) || '';
  const hospitalName = extractLocalizedText(doctor.hospital.name, lang) || '';

  // 의사 이미지 중 첫 번째 이미지를 프로필 이미지로 사용
  const profileImage =
    doctor.doctorImages && doctor.doctorImages.length > 0 ? doctor.doctorImages[0] : null;

  return (
    <LocaleLink href={`/doctor/${doctor.id}`} className='block'>
      <div className='relative z-10 flex h-full items-center gap-3 rounded-lg border border-white bg-white/50 p-4 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px] transition-opacity'>
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
        <div className='mb-auto flex h-full w-full flex-col'>
          {/* 이름과 직책 */}
          <div className='flex items-center'>
            <h3
              className={`truncate text-base font-semibold ${
                variant === 'dark' ? 'text-neutral-900' : 'text-white'
              }`}
            >
              {doctorName} {position}
            </h3>
          </div>

          {/* 병원명 */}
          {hospitalName && (
            <p
              className={`mt-0.5 truncate text-xs font-medium ${
                variant === 'dark' ? 'text-neutral-600' : 'text-white/80'
              }`}
            >
              {hospitalName}
            </p>
          )}

          {/* 진료부위 태그 */}
          <div className='mt-2'>
            <MedicalSpecialtyTags specialties={doctor.medicalSpecialties || []} lang={lang} />
          </div>
        </div>
      </div>
    </LocaleLink>
  );
}
