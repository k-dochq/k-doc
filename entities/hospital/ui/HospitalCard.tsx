import { type BestHospital } from 'shared/model/types/common';
import { HospitalThumbnail } from './HospitalThumbnail';
import { HospitalInfo } from './HospitalInfo';

interface HospitalCardProps {
  hospital: BestHospital;
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <div className='flex gap-4'>
      <HospitalThumbnail imageUrl={hospital.thumbnailImageUrl} />
      <HospitalInfo
        name={hospital.name}
        address={hospital.address}
        prices={hospital.prices}
        rating={hospital.rating}
        reviewCount={hospital.reviewCount}
        discountRate={hospital.discountRate}
      />
    </div>
  );
}
