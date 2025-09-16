'use client';

import { DEFAULT_IMAGES } from 'shared/config/images';

interface HospitalAvatarProps {
  imageUrl?: string;
  hospitalName: string;
  size?: 'sm' | 'md';
}

export function HospitalAvatar({ imageUrl, hospitalName, size = 'sm' }: HospitalAvatarProps) {
  const sizeClasses = {
    sm: 'size-[30px]',
    md: 'size-[40px]',
  };

  return (
    <div
      className={`relative shrink-0 overflow-clip rounded-[8px] bg-neutral-300 ${sizeClasses[size]}`}
    >
      <div
        className='absolute top-0 bottom-0 left-1/2 aspect-[4096/4096] translate-x-[-50%] bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url('${imageUrl || DEFAULT_IMAGES.HOSPITAL_DEFAULT}')`,
        }}
      />
    </div>
  );
}
