'use client';

interface ChatRoomTitleProps {
  hospitalName: string;
}

export function ChatRoomTitle({ hospitalName }: ChatRoomTitleProps) {
  return <h3 className='text-base leading-tight font-semibold text-neutral-900'>{hospitalName}</h3>;
}
