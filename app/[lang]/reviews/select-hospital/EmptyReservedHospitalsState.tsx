import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { Calendar } from 'lucide-react';
import { LocaleLink } from 'shared/ui/locale-link';

interface EmptyReservedHospitalsStateProps {
  lang: Locale;
  dict: Dictionary;
}

export function EmptyReservedHospitalsState({
  lang: _lang,
  dict,
}: EmptyReservedHospitalsStateProps) {
  return (
    <div className='flex min-h-[500px] flex-col items-center justify-center px-5 py-16'>
      <Calendar size={40} className='text-[#EC6BFF]' />

      <h3 className='mt-6 text-lg font-semibold text-[#EC6BFF]'>
        {dict.reviewWrite?.selectHospital?.empty?.title || 'No Reservation History'}
      </h3>

      <p className='mt-2 text-center text-sm text-[#EC6BFF]'>
        {dict.reviewWrite?.selectHospital?.empty?.description ||
          'You need to book a hospital first.'}
        <br />
        {dict.reviewWrite?.selectHospital?.empty?.subdescription ||
          'Find and book your desired hospital.'}
      </p>

      <LocaleLink
        href='/hospitals'
        className='mt-6 rounded-lg bg-[#DA47EF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C73AE0]'
      >
        {dict.reviewWrite?.selectHospital?.empty?.browseButton || 'Browse Hospitals'}
      </LocaleLink>
    </div>
  );
}
