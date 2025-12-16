'use client';

import { useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useChatRooms } from 'lib/queries/consultation-chat-rooms';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { ChatRoomCardV2 } from './ChatRoomCardV2';
import { ChatRoomSkeletonV2 } from './ChatRoomSkeletonV2';
import { ChatRoomErrorState } from './ChatRoomErrorState';
import { ChatRoomEmptyStateV2 } from './ChatRoomEmptyStateV2';

interface ConsultationChatTabV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationChatTabV2({ lang, dict }: ConsultationChatTabV2Props) {
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
          logoUrl: room.hospitalLogoUrl,
          lastMessage: room.lastMessageContent,
          lastMessageDate: room.lastMessageDate,
          senderType: room.lastMessageSenderType,
        });
      });
    }
  }, [chatRooms, lang]);

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

  const handleRetry = () => {
    // TanStack Query의 refetch 기능 사용
    window.location.reload();
  };

  if (isLoading) {
    return <ChatRoomSkeletonV2 count={3} />;
  }

  if (error) {
    return <ChatRoomErrorState onRetry={handleRetry} />;
  }

  if (!chatRooms || chatRooms.length === 0) {
    return <ChatRoomEmptyStateV2 lang={lang} dict={dict} />;
  }

  return (
    <div className='flex flex-col gap-0 px-5'>
      {chatRooms.map((chatRoom) => (
        <ChatRoomCardV2 key={chatRoom.hospitalId} chatRoom={chatRoom} lang={lang} dict={dict} />
      ))}
    </div>
  );
}
