'use client';

import { useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useChatRooms } from 'lib/queries/consultation-chat-rooms';
import { getLocalizedTextByLocale } from 'shared/model/types/common';

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

  return <div></div>;
}
