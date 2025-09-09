import Image from 'next/image';
import { Hospital as HospitalIcon } from 'lucide-react';

interface HospitalMainImageProps {
  imageUrl?: string | null;
  hospitalName: string;
}

export function HospitalMainImage({ imageUrl, hospitalName }: HospitalMainImageProps) {
  return (
    <div className='relative h-64 bg-gray-200 md:h-80'>
      {imageUrl ? (
        <Image src={imageUrl} alt={hospitalName} fill className='object-cover' priority />
      ) : (
        <div className='flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
          <div className='text-center'>
            <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
                <HospitalIcon className='h-6 w-6 text-blue-600' />
              </div>
            </div>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-gray-700'>{hospitalName}</p>
              <p className='text-xs text-gray-500'>대표 이미지 준비 중</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
