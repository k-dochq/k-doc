import { type Dictionary } from 'shared/model/types';
import Image from 'next/image';

interface AboutSeoulOfficeProps {
  dict: Dictionary;
}

export function AboutSeoulOffice({ dict }: AboutSeoulOfficeProps) {
  return (
    <div className='mt-12'>
      <h2 className='text-primary text-2xl font-bold'>{dict.about.seoulOffice.title}</h2>
      <div className='mt-2'>
        <p className='text-sm leading-5 font-normal text-[#525252]'>
          {dict.about.seoulOffice.description}
        </p>
      </div>
      <div className='mt-6'>
        <Image
          src='/images/building.png'
          alt={dict.about.seoulOffice.title}
          width={335}
          height={446}
          className='w-full object-contain rounded-xl'
          priority
        />
      </div>
    </div>
  );
}
