'use client';

import { MessageTime } from 'shared/ui/message-bubble';
import { type Dictionary } from 'shared/model/types';
import { PictureMessage } from './PictureMessage';

interface UserPictureMessageProps {
  pictures: Array<{ url: string }>;
  formattedTime: string;
  dict: Dictionary;
}

export function UserPictureMessage({ pictures, formattedTime, dict }: UserPictureMessageProps) {
  return (
    <div className='relative flex w-full shrink-0 content-stretch items-end justify-end gap-2'>
      <MessageTime time={formattedTime} />
      <div className='relative flex shrink-0 content-stretch items-end justify-end'>
        <PictureMessage pictures={pictures} dict={dict} align='end' />
      </div>
    </div>
  );
}
