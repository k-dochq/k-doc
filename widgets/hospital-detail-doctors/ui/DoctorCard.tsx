import Image from 'next/image';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type HospitalDoctor } from 'entities/hospital/api/entities/types';
import { MedicalSpecialtyTags } from 'shared/ui/medical-specialty-tags';

interface DoctorCardProps {
  doctor: HospitalDoctor;
  lang: Locale;
}

/**
 * 개별 의료진 카드 컴포넌트
 */
export function DoctorCard({ doctor, lang }: DoctorCardProps) {
  const doctorName = extractLocalizedText(doctor.name, lang) || '이름 없음';
  const position = extractLocalizedText(doctor.position, lang) || '';
  const hospitalName = extractLocalizedText(doctor.hospital.name, lang) || '';

  return (
    <div className='flex h-full items-center gap-3 rounded-lg'>
      {/* 프로필 이미지 */}
      <div className='relative h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-xl'>
        <Image
          src='/images/shared/default_image_square.png'
          alt={`${doctorName} 의료진 프로필`}
          fill
          className='object-cover'
          sizes='48px'
        />
      </div>

      {/* 의료진 정보 */}
      <div className='mb-auto flex h-full w-full flex-col'>
        {/* 이름과 직책 */}
        <div className='flex items-center'>
          <h3 className='truncate text-base font-semibold text-white'>
            {doctorName} {position}
          </h3>
        </div>

        {/* 병원명 */}
        {hospitalName && (
          <p className='mt-0.5 truncate text-xs font-medium text-white/80'>{hospitalName}</p>
        )}

        {/* 진료부위 태그 */}
        <div className='mt-2'>
          <MedicalSpecialtyTags specialties={doctor.medicalSpecialties || []} lang={lang} />
        </div>
      </div>
    </div>
  );
}
