import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';

interface HospitalCardLocationProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalCardLocation({ hospital, lang }: HospitalCardLocationProps) {
  const hospitalAddress = extractLocalizedText(hospital.address, lang);

  if (!hospitalAddress) return null;

  return (
    <div className='flex items-center gap-1'>
      <span className='text-xs font-medium text-neutral-500'>지역</span>
      <div className='flex h-0 w-2.5 items-center justify-center'>
        <div className='h-0 w-2.5 rotate-90'>
          <div className='h-0 w-2.5'>
            <div className='absolute inset-0 top-[-1px]'>
              <svg className='h-full w-full' viewBox='0 0 10 0' fill='none'>
                <path d='M0 0L10 0' stroke='#737373' strokeWidth='1' />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <span className='text-xs font-medium text-neutral-500'>{hospitalAddress}</span>
    </div>
  );
}
