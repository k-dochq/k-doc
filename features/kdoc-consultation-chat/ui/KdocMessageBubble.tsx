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

function AdminTail() {
  return (
    <svg
      width='16'
      height='20'
      viewBox='0 0 16.4172 20.3225'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        flexShrink: 0,
        overflow: 'visible',
        display: 'block',
        transform: 'scaleY(-1)',
        marginRight: '-11px',
        alignSelf: 'flex-start',
      }}
    >
      <path
        d='M0.112426 20.1846C5.31243 20.9846 10.4458 18.1212 12.1124 16.2879C10.3946 12.1914 21.0003 2.24186 14.0003 2.24148C12.3817 2.24148 10.9993 -1.9986 5.11242 1.1846C5.09121 2.47144 5.11242 6.92582 5.11242 7.6842C5.11242 18.1842 -0.887574 19.5813 0.112426 20.1846Z'
        fill='#f5f5f5'
      />
    </svg>
  );
}

function UserTail() {
  return (
    <svg
      width='16'
      height='20'
      viewBox='0 0 16.4172 20.3225'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        flexShrink: 0,
        overflow: 'visible',
        display: 'block',
        marginLeft: '-0.5px',
        alignSelf: 'flex-end',
      }}
    >
      <path
        d='M16.3048 20.1846C11.1048 20.9846 5.97148 18.1212 4.30482 16.2879C6.02269 12.1914 -4.5831 2.24186 2.4169 2.24148C4.03551 2.24148 5.41797 -1.9986 11.3048 1.1846C11.326 2.47144 11.3048 6.92582 11.3048 7.6842C11.3048 18.1842 17.3048 19.5813 16.3048 20.1846Z'
        fill='#6544fa'
      />
    </svg>
  );
}

export function KdocAdminMessageBubble({ content, createdAt }: KdocAdminMessageBubbleProps) {
  return (
    <div className='mb-4 flex flex-col gap-1'>
      <div className='flex items-center gap-2'>
        <KdocMsgAvatar />
        <span className='text-sm font-semibold text-[#404040]'>K-DOC</span>
      </div>
      <div className='flex items-end gap-2 pl-[38px]'>
        <div className='flex max-w-[75%] items-start'>
          <AdminTail />
          <div className='relative z-10 rounded-xl bg-[#f5f5f5] px-3 py-2'>
            <p className='whitespace-pre-line text-sm text-[#404040] [overflow-wrap:anywhere]'>{content}</p>
          </div>
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
        <div className='flex max-w-[75%] items-end'>
          <div
            className='rounded-xl px-3 py-2'
            style={{ background: 'linear-gradient(to bottom, #8b45f6, #6544fa)' }}
          >
            <p className='whitespace-pre-line text-sm text-[#fafafa] [overflow-wrap:anywhere]'>{content}</p>
          </div>
          <UserTail />
        </div>
      </div>
    </div>
  );
}
