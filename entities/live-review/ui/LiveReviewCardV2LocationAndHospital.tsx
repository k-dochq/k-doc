import { type Dictionary } from 'shared/model/types';

interface LiveReviewCardV2LocationAndHospitalProps {
  location: string;
  hospitalName: string;
  dict: Dictionary;
}

export function LiveReviewCardV2LocationAndHospital({
  location,
  hospitalName,
  dict,
}: LiveReviewCardV2LocationAndHospitalProps) {
  return (
    <div className='flex w-full shrink-0 items-center gap-1'>
      <div className='flex shrink-0 items-center gap-1'>
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
        <div className='relative flex shrink-0 items-center py-0 pr-0 pl-0.5'>
          <p className='relative shrink-0 text-xs leading-4 font-medium text-neutral-400'>
            {location}
          </p>
        </div>
      </div>
      <div className='relative size-[2px] shrink-0'>
        <svg width='2' height='2' viewBox='0 0 2 2' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='1' cy='1' r='1' fill='#A3A3A3' />
        </svg>
      </div>
      <p className='relative shrink-0 text-xs leading-4 font-medium text-neutral-400'>
        {hospitalName}
      </p>
    </div>
  );
}
