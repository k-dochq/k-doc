'use client';

import { HospitalMessageBubble, MessageTime } from 'shared/ui/message-bubble';
import { HospitalHeader } from 'entities/hospital/ui/HospitalHeader';
import { EditorContentRenderer } from './EditorContentRenderer';

interface HospitalEditorMessageProps {
  editorContent: string;
  formattedTime: string;
  hospitalName: string;
  hospitalImageUrl?: string;
  showHeader?: boolean;
}

export function HospitalEditorMessage({
  editorContent,
  formattedTime,
  hospitalName,
  hospitalImageUrl,
  showHeader = true,
}: HospitalEditorMessageProps) {
  return (
    <div className='relative flex w-full shrink-0 flex-col content-stretch items-start justify-start gap-1'>
      {showHeader && <HospitalHeader hospitalName={hospitalName} imageUrl={hospitalImageUrl} />}
      <div className='relative box-border flex w-full shrink-0 content-stretch items-end justify-start gap-2 py-0 pr-0 pl-[38px]'>
        <div className='relative flex min-w-0 shrink-0 content-stretch items-start justify-start'>
          <HospitalMessageBubble className='self-stretch'>
            <div className="relative font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[20px] break-words text-neutral-900 not-italic">
              <EditorContentRenderer htmlContent={editorContent} />
            </div>
          </HospitalMessageBubble>
        </div>
        <MessageTime time={formattedTime} />
      </div>
    </div>
  );
}
