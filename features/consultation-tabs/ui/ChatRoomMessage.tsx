'use client';

interface ChatRoomMessageProps {
  lastMessageContent?: string;
  unreadCount?: number;
}

export function ChatRoomMessage({ lastMessageContent, unreadCount }: ChatRoomMessageProps) {
  return (
    <div className='flex items-center'>
      <p className='min-w-0 flex-1 truncate text-sm text-neutral-500'>
        {lastMessageContent || '아직 메시지가 없습니다.'}
      </p>
    </div>
  );
}
