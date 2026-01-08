'use client';

import { UserMessageBubble, MessageTime } from 'shared/ui/message-bubble';
import { EditorContentRenderer } from './EditorContentRenderer';

interface UserEditorMessageProps {
  editorContent: string;
  formattedTime: string;
}

export function UserEditorMessage({ editorContent, formattedTime }: UserEditorMessageProps) {
  return (
    <div className='relative flex w-full shrink-0 content-stretch items-end justify-end gap-2'>
      <MessageTime time={formattedTime} />
      <div className='relative flex shrink-0 content-stretch items-end justify-end'>
        <div className='flex flex-row items-end self-stretch'>
          <UserMessageBubble className='h-full items-end justify-start'>
            <div
              className="relative min-w-0 font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[20px] break-words text-neutral-50 not-italic"
              style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
            >
              <EditorContentRenderer htmlContent={editorContent} />
            </div>
          </UserMessageBubble>
        </div>
      </div>
    </div>
  );
}
