'use client';

import { type ChatRoom } from '@/app/api/consultation/chat-rooms/route';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { type Locale } from 'shared/config';
import { ChatRoomHeader } from './ChatRoomHeader';
import { ChatRoomTitle } from './ChatRoomTitle';
import { ChatRoomMessage } from './ChatRoomMessage';

interface ChatRoomInfoProps {
  chatRoom: ChatRoom;
  lang: Locale;
}

export function ChatRoomInfo({ chatRoom, lang }: ChatRoomInfoProps) {
  const hospitalName = getLocalizedTextByLocale(chatRoom.hospitalName, lang);
  const districtName = chatRoom.districtName
    ? getLocalizedTextByLocale(chatRoom.districtName, lang)
    : '';

  return (
    <div className='flex min-w-0 flex-1 flex-col justify-center'>
      <ChatRoomHeader
        districtName={districtName}
        lastMessageDate={chatRoom.lastMessageDate}
        lang={lang}
      />
      <div className='h-[2px]' />
      <ChatRoomTitle hospitalName={hospitalName} />
      <div className='h-2' />
      <ChatRoomMessage
        lastMessageContent={chatRoom.lastMessageContent}
        unreadCount={chatRoom.unreadCount}
      />
    </div>
  );
}
