'use client';

import { useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useChatRooms } from 'lib/queries/consultation-chat-rooms';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { ChatRoomCard } from './ChatRoomCard';
import { ChatRoomSkeleton } from './ChatRoomSkeleton';
import { ChatRoomErrorState } from './ChatRoomErrorState';
import { ChatRoomEmptyState } from './ChatRoomEmptyState';

interface ConsultationChatTabProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationChatTab({ lang, dict }: ConsultationChatTabProps) {
  const { data: chatRooms, isLoading, error } = useChatRooms();

  useEffect(() => {
    if (chatRooms) {
      console.log('📱 Chat Rooms Data:', chatRooms);
      console.log('📊 Total chat rooms:', chatRooms.length);

      chatRooms.forEach((room, index) => {
        console.log(`🏥 Chat Room ${index + 1}:`, {
          hospitalId: room.hospitalId,
          hospitalName: getLocalizedTextByLocale(room.hospitalName, lang),
          districtName: room.districtName
            ? getLocalizedTextByLocale(room.districtName, lang)
            : undefined,
          thumbnailUrl: room.hospitalThumbnailUrl,
          lastMessage: room.lastMessageContent,
          lastMessageDate: room.lastMessageDate,
          senderType: room.lastMessageSenderType,
        });
      });
    }
  }, [chatRooms]);

  useEffect(() => {
    if (error) {
      console.error('❌ Error fetching chat rooms:', error);
    }
  }, [error]);

  useEffect(() => {
    if (isLoading) {
      console.log('⏳ Loading chat rooms...');
    }
  }, [isLoading]);

  const handleChatRoomClick = (hospitalId: string) => {
    console.log('🏥 Chat room clicked:', hospitalId);
    // TODO: 채팅방으로 이동하는 로직 구현
  };

  const handleRetry = () => {
    // TanStack Query의 refetch 기능 사용
    window.location.reload();
  };

  if (isLoading) {
    return <ChatRoomSkeleton count={3} />;
  }

  if (error) {
    return <ChatRoomErrorState onRetry={handleRetry} />;
  }

  if (!chatRooms || chatRooms.length === 0) {
    return <ChatRoomEmptyState />;
  }

  return (
    <div className='p-5'>
      {chatRooms.map((chatRoom) => (
        <ChatRoomCard
          key={chatRoom.hospitalId}
          chatRoom={chatRoom}
          lang={lang}
          onClick={handleChatRoomClick}
        />
      ))}
    </div>
  );
}
