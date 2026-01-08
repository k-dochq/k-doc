'use client';

import { MessageTime } from 'shared/ui/message-bubble';
import { HospitalHeader } from 'entities/hospital/ui/HospitalHeader';
import { type Dictionary } from 'shared/model/types';
import { PictureMessage } from './PictureMessage';

interface HospitalPictureMessageProps {
  pictures: Array<{ url: string }>;
  formattedTime: string;
  hospitalName: string;
  hospitalImageUrl?: string;
  showHeader?: boolean;
  dict: Dictionary;
}

export function HospitalPictureMessage({
  pictures,
  formattedTime,
  hospitalName,
  hospitalImageUrl,
  showHeader = true,
  dict,
}: HospitalPictureMessageProps) {
  return (
    <div className='relative flex w-full shrink-0 flex-col content-stretch items-start justify-start gap-1'>
      {showHeader && <HospitalHeader hospitalName={hospitalName} imageUrl={hospitalImageUrl} />}
      <div className='relative box-border flex w-full shrink-0 content-stretch items-end justify-start gap-2 py-0 pr-0 pl-[38px]'>
        <div className='relative flex min-w-0 shrink-0 content-stretch items-start justify-start'>
          <PictureMessage pictures={pictures} dict={dict} align='start' />
        </div>
        <MessageTime time={formattedTime} />
      </div>
    </div>
  );
}
