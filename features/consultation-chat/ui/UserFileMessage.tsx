'use client';

import { MessageTime } from 'shared/ui/message-bubble';
import { type Dictionary } from 'shared/model/types';
import { type FileData } from 'shared/lib/file-parser';
import { FileMessage } from './FileMessage';

interface UserFileMessageProps {
  files: FileData[];
  formattedTime: string;
  dict: Dictionary;
}

export function UserFileMessage({ files, formattedTime, dict }: UserFileMessageProps) {
  return (
    <div className='relative flex w-full shrink-0 content-stretch items-end justify-end gap-2'>
      <MessageTime time={formattedTime} />
      <div className='relative flex shrink-0 content-stretch items-end justify-end'>
        <FileMessage files={files} dict={dict} align='end' />
      </div>
    </div>
  );
}
