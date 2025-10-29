'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ChatRoom } from '@/app/api/consultation/chat-rooms/route';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { ChatRoomThumbnail } from './ChatRoomThumbnail';
import { ChatRoomInfo } from './ChatRoomInfo';

interface ChatRoomCardProps {
  chatRoom: ChatRoom;
  lang: Locale;
  dict: Dictionary;
}

export function ChatRoomCard({ chatRoom, lang, dict }: ChatRoomCardProps) {
  const hospitalName = getLocalizedTextByLocale(chatRoom.hospitalName, lang);
  const href = `/${lang}/chat/${chatRoom.hospitalId}`;

  return (
    <a href={href} className='rounded-xl bg-white/50 p-3'>
      <div className='flex cursor-pointer gap-3'>
        <ChatRoomThumbnail
          thumbnailUrl={chatRoom.hospitalThumbnailUrl}
          hospitalName={hospitalName}
        />
        <ChatRoomInfo chatRoom={chatRoom} lang={lang} dict={dict} />
      </div>
    </a>
  );
}
