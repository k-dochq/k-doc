import { KdocMsgAvatar } from './icons/KdocChatIcons';
import { formatTime } from '../lib/chat-time-utils';

interface KdocAdminMessageBubbleProps {
  content: string;
  createdAt: string | Date;
}

interface KdocUserMessageBubbleProps {
  content: string;
  createdAt: string | Date;
}

export function KdocAdminMessageBubble({ content, createdAt }: KdocAdminMessageBubbleProps) {
  return (
    <div className='mb-4 flex flex-col gap-1'>
      <div className='flex items-center gap-2'>
        <KdocMsgAvatar />
        <span className='text-sm font-semibold text-[#404040]'>K-DOC</span>
      </div>
      <div className='flex items-end gap-2 pl-[38px]'>
        <div className='rounded-xl bg-[#f5f5f5] px-3 py-2'>
          <p className='whitespace-pre-line text-sm text-[#404040]'>{content}</p>
        </div>
        <span className='shrink-0 text-xs text-[#737373]'>{formatTime(createdAt)}</span>
      </div>
    </div>
  );
}

export function KdocUserMessageBubble({ content, createdAt }: KdocUserMessageBubbleProps) {
  return (
    <div className='mb-4 flex justify-end'>
      <div className='flex items-end gap-2'>
        <span className='shrink-0 text-xs text-[#737373]'>{formatTime(createdAt)}</span>
        <div
          className='rounded-xl px-3 py-2'
          style={{ background: 'linear-gradient(to bottom, #8b45f6, #6544fa)' }}
        >
          <p className='whitespace-pre-line text-sm text-[#fafafa]'>{content}</p>
        </div>
      </div>
    </div>
  );
}
