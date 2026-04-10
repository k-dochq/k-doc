import { type Locale } from 'shared/config';
import { type Dictionary, type HospitalCardData } from 'shared/model/types';
import { DoctorAffiliatedHospitalCardV2 } from '@/widgets/doctor-affiliated-hospital/ui/DoctorAffiliatedHospitalCardV2';
import { LocaleLink } from 'shared/ui/locale-link';

interface TipRecommendedHospitalsProps {
  hospitals: HospitalCardData[];
  lang: Locale;
  dict: Dictionary;
}

export function TipRecommendedHospitals({
  hospitals,
  lang,
  dict,
}: TipRecommendedHospitalsProps) {
  if (hospitals.length === 0) return null;

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-xl font-bold text-neutral-700'>
        {dict.tips?.recommendedHospitals ?? 'Recommended Hospitals'}
      </h2>
      <div className='flex flex-col gap-4'>
        {hospitals.map((hospital) => (
          <LocaleLink key={hospital.id} href={`/hospital/${hospital.id}`} locale={lang} className='block'>
            <DoctorAffiliatedHospitalCardV2 hospital={hospital} lang={lang} dict={dict} />
          </LocaleLink>
        ))}
      </div>
    </section>
  );
}
