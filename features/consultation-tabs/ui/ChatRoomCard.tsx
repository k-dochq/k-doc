'use client';

import { type Locale } from 'shared/config';
import { type ChatRoom } from '@/app/api/consultation/chat-rooms/route';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { ChatRoomThumbnail } from './ChatRoomThumbnail';
import { ChatRoomInfo } from './ChatRoomInfo';

interface ChatRoomCardProps {
  chatRoom: ChatRoom;
  lang: Locale;
  onClick?: (hospitalId: string) => void;
}

export function ChatRoomCard({ chatRoom, lang, onClick }: ChatRoomCardProps) {
  const hospitalName = getLocalizedTextByLocale(chatRoom.hospitalName, lang);

  return (
    <div className='flex cursor-pointer gap-3' onClick={() => onClick?.(chatRoom.hospitalId)}>
      <ChatRoomThumbnail thumbnailUrl={chatRoom.hospitalThumbnailUrl} hospitalName={hospitalName} />
      <ChatRoomInfo chatRoom={chatRoom} lang={lang} />
    </div>
  );
}
