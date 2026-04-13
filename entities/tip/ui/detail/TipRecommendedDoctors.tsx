import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type HospitalDoctor } from 'entities/hospital/api/entities/types';
import { DoctorCardV2 } from '@/widgets/hospital-detail-doctors/ui/DoctorCardV2';

interface TipRecommendedDoctorsProps {
  doctors: HospitalDoctor[];
  lang: Locale;
  dict: Dictionary;
}

export function TipRecommendedDoctors({ doctors, lang, dict }: TipRecommendedDoctorsProps) {
  if (doctors.length === 0) return null;

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-xl font-bold text-neutral-700'>
        {dict.tips?.recommendedDoctors ?? 'Recommended Doctors'}
      </h2>
      <div className='flex flex-col gap-4'>
        {doctors.map((doctor) => (
          <DoctorCardV2 key={doctor.id} doctor={doctor} lang={lang} dict={dict} />
        ))}
      </div>
    </section>
  );
}
