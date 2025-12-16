'use client';

import { DEFAULT_IMAGES } from 'shared/config/images';

interface HospitalAvatarProps {
  imageUrl?: string;
  hospitalName: string;
  size?: 'sm' | 'md';
}

export function HospitalAvatar({ imageUrl, hospitalName }: HospitalAvatarProps) {
  return (
    <div className='relative size-[32px] shrink-0 overflow-clip rounded-full bg-neutral-300'>
      <div
        className='absolute top-0 bottom-0 left-1/2 aspect-[4096/4096] translate-x-[-50%] bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url('${imageUrl || DEFAULT_IMAGES.HOSPITAL_DEFAULT}')`,
        }}
      />
    </div>
  );
}
