import Image from 'next/image';
import { DEFAULT_IMAGES } from 'shared/config/images';

interface HospitalMainImageProps {
  imageUrl?: string | null;
  hospitalName: string;
}

export function HospitalMainImage({ imageUrl, hospitalName }: HospitalMainImageProps) {
  return (
    <div className='relative h-64 bg-gray-200 md:h-80'>
      <Image
        src={imageUrl || DEFAULT_IMAGES.HOSPITAL_DEFAULT}
        alt={hospitalName}
        fill
        className='object-cover'
        priority
      />
    </div>
  );
}
