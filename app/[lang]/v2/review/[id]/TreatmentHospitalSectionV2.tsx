import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type HospitalCardData } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { DoctorAffiliatedHospitalCardV2 } from 'widgets/doctor-affiliated-hospital/ui/DoctorAffiliatedHospitalCardV2';

interface TreatmentHospitalSectionV2Props {
  hospital: HospitalCardData;
  lang: Locale;
  dict: Dictionary;
}

export function TreatmentHospitalSectionV2({
  hospital,
  lang,
  dict,
}: TreatmentHospitalSectionV2Props) {
  return (
    <div className='px-5 py-6'>
      <h3 className='text-[18px] leading-[28px] font-semibold text-neutral-700'>
        {dict.reviewDetail?.hospital || '시술 병원'}
      </h3>
      <div className='mt-3'>
        <LocaleLink href={`/hospital/${hospital.id}`} className='block'>
          <DoctorAffiliatedHospitalCardV2 hospital={hospital} lang={lang} dict={dict} />
        </LocaleLink>
      </div>
    </div>
  );
}
