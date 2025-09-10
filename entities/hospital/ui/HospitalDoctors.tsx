import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type HospitalDoctor } from '../api/entities/types';

interface HospitalDoctorsProps {
  doctors: HospitalDoctor[];
  lang: Locale;
  dict: Record<string, any>;
}

export function HospitalDoctors({ doctors, lang, dict }: HospitalDoctorsProps) {
  if (!doctors || doctors.length === 0) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900'>
        {dict.hospitals?.doctors?.title || '소속의료진'}
      </h3>

      <div className='grid gap-4 sm:grid-cols-2'>
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} lang={lang} dict={dict} />
        ))}
      </div>
    </div>
  );
}

interface DoctorCardProps {
  doctor: HospitalDoctor;
  lang: Locale;
  dict: Record<string, any>;
}

function DoctorCard({ doctor, lang, dict }: DoctorCardProps) {
  const doctorName = extractLocalizedText(doctor.name, lang) || '의사명 없음';
  const doctorPosition = extractLocalizedText(doctor.position, lang) || '';
  const hospitalName = extractLocalizedText(doctor.hospital.name, lang) || '병원명 없음';

  return (
    <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md'>
      {/* 의사 기본 정보 */}
      <div className='mb-3'>
        <h4 className='font-medium text-gray-900'>{doctorName}</h4>
        {doctorPosition && <p className='text-sm text-gray-600'>{doctorPosition}</p>}
        <p className='text-sm text-gray-500'>{hospitalName}</p>
      </div>

      {/* 시술부위 태그 */}
      {doctor.medicalSpecialties && doctor.medicalSpecialties.length > 0 && (
        <div className='space-y-2'>
          <p className='text-xs font-medium text-gray-700'>
            {dict.hospitals?.doctors?.specialties || '시술부위'}
          </p>
          <div className='flex flex-wrap gap-1'>
            {doctor.medicalSpecialties.map((specialty) => {
              const specialtyName =
                extractLocalizedText(specialty.name, lang) || specialty.specialtyType;
              return (
                <span
                  key={specialty.id}
                  className='inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700'
                >
                  {specialtyName}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* 의사 소개 */}
      {doctor.description && (
        <div className='mt-3 border-t border-gray-100 pt-3'>
          <p className='line-clamp-2 text-sm text-gray-600'>{doctor.description}</p>
        </div>
      )}
    </div>
  );
}
