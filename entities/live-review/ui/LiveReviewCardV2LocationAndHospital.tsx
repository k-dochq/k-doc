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
    <div className='flex w-full min-w-0 shrink-0 items-center overflow-hidden'>
      <p className='min-w-0 flex-1 truncate text-xs leading-4 font-medium text-neutral-400'>
        {dict.hospital.region} | {location} · {hospitalName}
      </p>
    </div>
  );
}
