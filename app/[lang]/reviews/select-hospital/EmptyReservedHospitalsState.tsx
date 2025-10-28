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
    <div className='flex min-h-[400px] flex-col items-center justify-center px-5 py-12'>
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-100'>
        <Calendar size={40} className='text-gray-400' />
      </div>

      <h3 className='mt-6 text-lg font-semibold text-gray-900'>
        {dict.reviewWrite?.selectHospital?.empty?.title || 'No Reservation History'}
      </h3>

      <p className='mt-2 text-center text-sm text-gray-600'>
        {dict.reviewWrite?.selectHospital?.empty?.description ||
          'You need to book a hospital first.'}
        <br />
        {dict.reviewWrite?.selectHospital?.empty?.subdescription ||
          'Find and book your desired hospital.'}
      </p>

      <LocaleLink
        href='/hospitals'
        className='mt-6 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800'
      >
        {dict.reviewWrite?.selectHospital?.empty?.browseButton || 'Browse Hospitals'}
      </LocaleLink>
    </div>
  );
}
