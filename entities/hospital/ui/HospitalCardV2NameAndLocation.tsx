import { type Dictionary } from 'shared/model/types';

interface HospitalCardV2NameAndLocationProps {
  hospitalName: string;
  location: string | null;
  dict: Dictionary;
}

export function HospitalCardV2NameAndLocation({
  hospitalName,
  location,
  dict,
}: HospitalCardV2NameAndLocationProps) {
  return (
    <div className='flex w-full shrink-0 flex-col items-start gap-0.5'>
      <p className='relative line-clamp-2 w-full shrink-0 text-sm leading-5 font-semibold text-neutral-700'>
        {hospitalName}
      </p>
      {location && (
        <div className='flex w-full min-w-0 shrink-0 items-center gap-1'>
          <p className='relative shrink-0 text-xs leading-4 font-medium text-neutral-400'>
            {dict.hospital.region}
          </p>
          <div className='relative flex h-[10px] w-0 shrink-0 items-center justify-center'>
            <div className='flex-none rotate-90'>
              <div className='relative h-0 w-[10px]'>
                <svg
                  width='10'
                  height='1'
                  viewBox='0 0 10 1'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute inset-0'
                >
                  <line y1='0.5' x2='10' y2='0.5' stroke='#A3A3A3' />
                </svg>
              </div>
            </div>
          </div>
          <div className='relative flex min-w-0 flex-1 items-center py-0 pr-0'>
            <p className='relative shrink-0 truncate text-xs leading-4 font-medium text-neutral-400'>
              {location}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
