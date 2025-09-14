import { type Hospital } from '../api/entities/types';

interface HospitalDetailPriceProps {
  hospital: Hospital;
}

export function HospitalDetailPrice({ hospital }: HospitalDetailPriceProps) {
  if (!hospital.prices?.minPrice) {
    return null;
  }

  return (
    <div className='flex items-center gap-1'>
      <span className='text-base font-semibold'>
        $ {hospital.prices.minPrice.toLocaleString()}~
      </span>
      {hospital.discountRate && (
        <div
          className='flex items-center justify-center rounded-[4px] px-1 py-0.5 text-xs font-semibold'
          style={{
            backgroundImage: 'linear-gradient(90deg, rgb(255, 87, 41) 0%, rgb(255, 43, 159) 100%)',
          }}
        >
          {hospital.discountRate}% OFF
        </div>
      )}
    </div>
  );
}
