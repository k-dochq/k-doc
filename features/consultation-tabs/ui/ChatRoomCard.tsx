'use client';

import { type Locale } from 'shared/config';
import { type ChatRoom } from '@/app/api/consultation/chat-rooms/route';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { LocaleLink } from 'shared/ui/locale-link';
import { ChatRoomThumbnail } from './ChatRoomThumbnail';
import { ChatRoomInfo } from './ChatRoomInfo';

interface ChatRoomCardProps {
  chatRoom: ChatRoom;
  lang: Locale;
}

export function ChatRoomCard({ chatRoom, lang }: ChatRoomCardProps) {
  const hospitalName = getLocalizedTextByLocale(chatRoom.hospitalName, lang);

  return (
    <LocaleLink href={`/chat/${chatRoom.hospitalId}`} className='rounded-xl bg-white/50 p-3'>
      <div className='flex cursor-pointer gap-3'>
        <ChatRoomThumbnail
          thumbnailUrl={chatRoom.hospitalThumbnailUrl}
          hospitalName={hospitalName}
        />
        <ChatRoomInfo chatRoom={chatRoom} lang={lang} />
      </div>
    </LocaleLink>
  );
}
