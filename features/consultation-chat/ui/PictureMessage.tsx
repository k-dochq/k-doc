'use client';

import { MessageImage } from 'shared/ui/message-image';
import { type Dictionary } from 'shared/model/types';

interface PictureMessageProps {
  pictures: Array<{ url: string }>;
  dict?: Dictionary;
  align?: 'start' | 'end';
}

export function PictureMessage({ pictures, dict, align = 'end' }: PictureMessageProps) {
  return (
    <div className={`flex flex-col gap-2 ${align === 'end' ? 'items-end' : 'items-start'}`}>
      {pictures.map((picture, index) => (
        <MessageImage key={`picture-${index}`} url={picture.url} dict={dict} />
      ))}
    </div>
  );
}
